<template>
    <div class="text-center w-full flex flex-col gap-4 mx-auto rounded-lg shadow-lg">
        <Loading v-if="loading" />
        <div class="bg-secondary h-[400px]  sm:h-[509px] justify-center items-center flex flex-col w-full rounded-lg pb-10">
            <div class="relative mt-7 sm:mt-[116px] flex items-center justify-center">
                <div v-if="recording && !recordedAudio" class="absolute -z-1 inset-0 flex items-center justify-center">
                    <div
                        class="absolute -z-4 h-[288px] w-[288px] rounded-full bg-gradient-to-bl bg-gradient-to-tr from-primary opacity-50 to-transparent animate-pulse">
                    </div>
                    <div
                        class=" -z-3  absolute h-[258px] w-[258px] rounded-full bg-gradient-to-bl bg-gradient-to-tr from-primary opacity-70 to-transparent animate-pulse">
                    </div>
                    <div
                        class=" -z-2 absolute  h-[228px] w-[228px] rounded-full bg-gradient-to-bl bg-gradient-to-tr from-primary opacity-80 to-transparent animate-pulse">
                    </div>
                </div>
                <icon-button v-if="recording && !recordedAudio" :class="buttonClass" :name="'mic'" @click="stopRecord" />
                <icon-button v-else-if="!recording && !recordedAudio" :class="buttonClass" :name="'mic'"
                    @click="startRecord" />
                <icon-button v-else-if="!recording && recordedAudio && pause" :class="buttonClass" :name="'play'"
                    @click="playAudio" />
                <icon-button v-else :class="buttonClass" :name="'stop'" @click="pauseAudio" />
            </div>
            <div v-if="recording" class="font-bold text-2xl  sm:text-5xl mt-14  sm:mt-[90px]">{{ (recordedTime ?? '00:00')
            }} <span class="opacity-80">/
                    00:30</span></div>
            <div v-else-if="!recording && recordedAudio" class="font-bold text-2xl sm:text-5xl mt-10 sm:mt-[90px] ">{{
                (remainingTime ??
                    recordTime) }}
            </div>
            <div :class="recording ? 'text-2xl opacity-60 mt-1 sm:mt-3' : 'text-4xl mt-10 sm:mt-[90px]'"
                class="font-medium">{{
                    instructionMessage }}</div>
            <div class="text-sm mt-1 text-red-400">{{ errorMessage }}</div>
            <figure class="hidden">
                <audio v-on:timeupdate="onTimeUpdate" v-on:ended="pauseAudio" ref="audioPlayer" controls
                    :src="recordedAudio" type="audio/mpeg" class="mx-auto">
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
                <figcaption class="text-sm mt-2">Listen to your recording before submitting.</figcaption>
            </figure>

        </div>
        <Button v-if="recordedAudio" @click="sendData" class="w-full py-4 h-auto uppercase mt-0">Submit</Button>
        <Button v-if="recordedAudio" @click="clearAudio" class="bg-secondary border-secondary">Record again</Button>
    </div>
</template>
  
<script>
import Service from "../api/Service";
import Recorder from "../lib/Recorder";
import convertTimeMMSS from "../lib/Utils";
import Button from "./UI/Button.vue";
import IconButton from "./IconButton.vue";
import Loading from "./Loading.vue";

const INSTRUCTION_MESSAGE = "Tap to record";
const INSTRUCTION_MESSAGE_STOP = "Tap to finish recording";
const ERROR_MESSAGE =
    "Failed to use microphone. Please refresh and try again and permit the use of a microphone.";
const SUCCESS_MESSAGE = "Successfully recorded message!";
const SUCCESS_MESSAGE_SUBMIT = "Successfully submitted audio message! Thank you!";
const ERROR_SUBMITTING_MESSAGE = "Error submitting audio message! Please try again later.";

export default {
    name: "Recorder",
    props: {
        // in minutes
        time: { type: Number, default: 1 },
        bitRate: { type: Number, default: 128 },
        sampleRate: { type: Number, default: 44100 },
        backendEndpoint: { type: String },
        buttonColor: { type: String, default: "green" },
        afterRecording: { type: Function },
        successfulUpload: { type: Function },
        failedUpload: { type: Function },
        customUpload: { type: Function, default: null }
    },
    components: {
        IconButton,
        Button,
        Loading
    },
    data() {
        return {
            recording: false,
            pause: true,
            remainingTime: 0,
            recordedAudio: null,
            recordTime: '00:00',
            recordedBlob: null,
            recorder: null,
            successMessage: null,
            loading: false,
            errorMessage: null,
            instructionMessage: INSTRUCTION_MESSAGE,
        };
    },
    computed: {
        buttonClass() {
            return "mx-auto h-[188px] w-[188px] fill-current flex items-center relative z-10 justify-center cursor-pointer bg-primary text-white rounded-50 ";
        },
        recordedTime() {
            if (this.time && this.recorder?.duration >= this.time * 60) {
                this.stopRecord();
            }
            return convertTimeMMSS(this.recorder?.duration);
        },
    },
    beforeUnmount() {
        if (this.recording) {
            this.stopRecorder();
        }
    },
    methods: {
        stopRecord() {
            this.stopRecording();
            this.recording = false;
        },
        clearAudio() {
            this.recordedAudio = null
            this.instructionMessage = INSTRUCTION_MESSAGE;
            this.recordTime = '00:00'
        },
        startRecord() {
            this.recording = true;
            this.initRecorder();
        },
        playAudio() {
            this.pause = false
            this.$refs.audioPlayer.play()
        },
        pauseAudio() {
            this.pause = true
            this.$refs.audioPlayer.pause()
        },
        initRecorder() {
            this.recorder = new Recorder({
                micFailed: this.micFailed,
                bitRate: this.bitRate,
                sampleRate: this.sampleRate,
            });
            this.recorder.start();
            this.successMessage = null;
            this.errorMessage = null;
            this.instructionMessage = INSTRUCTION_MESSAGE_STOP;
            this.service = new Service(this.backendEndpoint);
        },
        stopRecording() {
            this.remainingTime = convertTimeMMSS(this.recorder?.duration);
            this.recordTime = convertTimeMMSS(this.recorder?.duration);
            this.recorder.stop();
            const recordList = this.recorder.recordList();
            this.recordedAudio = recordList[0].url;
            this.recordedBlob = recordList[0].blob;
            if (this.recordedAudio) {
                this.successMessage = SUCCESS_MESSAGE;
                this.instructionMessage = null;
            }
            if (this.afterRecording) {
                this.afterRecording();
            }
        },
        async blobToBase64(blob) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        },
        onTimeUpdate() {
            const audioElement = this.$refs.audioPlayer;
            const remainingSeconds = audioElement.duration - audioElement.currentTime;
            this.remainingTime = convertTimeMMSS(remainingSeconds);
        },
        async sendData() {
            try {
                if (!this.recordedBlob) {
                    return;
                }
                this.loading = true
                const Base64 = await this.blobToBase64(this.recordedBlob)
                if (!Base64) {
                    this.loading = false
                    return
                }
                let result = null;
                if (this.customUpload) {
                    result = await this.customUpload(this.recordedBlob);
                } else {
                    result = await this.service.postBackend(Base64);
                }
                if (result?.success) {
                    this.errorMessage = null;
                    this.successMessage = SUCCESS_MESSAGE_SUBMIT;
                    if (this.successfulUpload) {
                        this.successfulUpload();
                    }
                    localStorage.removeItem('userInfo')
                    this.$router.push('/thank');
                } else {
                    // error uploading
                    this.successMessage = null;
                    this.errorMessage = ERROR_SUBMITTING_MESSAGE;
                    if (this.failedUpload) {
                        this.failedUpload();
                    }
                }
                this.loading = false
            } catch (e) {
                if (e.code == 400) return this.$router.push('/info');
                this.loading = false

            }


        },
        micFailed() {
            this.recording = false;
            this.instructionMessage = INSTRUCTION_MESSAGE;
            this.errorMessage = ERROR_MESSAGE;
        },
    },
};
</script>