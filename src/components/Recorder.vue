<template>
    <div class="text-center font-sans flex flex-col gap-4  w-[450px] mx-auto rounded-lg shadow-lg p-8">
        <h1>Logo</h1>
        <h2 class="font-bold text-2xl">Record Here</h2>
        <p>Press the button below to start recording. Afterwards, you will
            have the opportunity to review your recording. If you’re happy
            with your message, you can save, or feel free to try again.</p>
        <div class="bg-gray-500 py-5  w-full mx-auto w-full rounded-lg">
            <div class="mb-10 relative mt-5 flex items-center justify-center">
                <div v-if="recording && !recordedAudio" class="absolute -z-1 inset-0 flex items-center justify-center">
                    <div
                        class="absolute -z-4 w-[145px]  h-[145px] rounded-full bg-gradient-to-bl bg-gradient-to-tr from-red-500 to-transparent animate-pulse">
                    </div>
                    <div
                        class=" -z-3  absolute  w-[125px]  h-[125px] rounded-full bg-gradient-to-bl bg-gradient-to-tr from-red-500 to-transparent animate-pulse">
                    </div>
                    <div
                        class=" -z-2 absolute  w-[95px]  h-[95px] rounded-full bg-gradient-to-bl bg-gradient-to-tr from-red-500 to-transparent animate-pulse">
                    </div>
                </div>

                <icon-button v-if="recording && !recordedAudio" :class="buttonClass" :name="'stop'" @click="stopRecord" />
                <icon-button v-else-if="!recording && !recordedAudio" :class="buttonClass" :name="'mic'"
                    @click="startRecord" />
                <icon-button v-else-if="!recording && recordedAudio && pause" :class="buttonClass" :name="'play'"
                    @click="playAudio" />
                <icon-button v-else :class="buttonClass" :name="'stop'" @click="pauseAudio" />
            </div>
            <div v-if="recording" class="font-bold mt-2 text-2xl">{{ (recordedTime ?? '00:00') }} <span class="opacity-80">/
                    00:30</span></div>
            <div v-else-if="!recording && recordedAudio" class="font-bold text-2xl mt-2">{{ (remainingTime ?? recordTime) }}
            </div>
            <div class="text-xl font-medium">{{ instructionMessage }}</div>
            <div class="text-sm mt-1 text-red-400">{{ errorMessage }}</div>
            <figure class="mt-8 hidden">
                <audio v-on:timeupdate="onTimeUpdate" v-on:ended="pauseAudio" ref="audioPlayer" controls
                    :src="recordedAudio" type="audio/mpeg" class="mx-auto">
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
                <figcaption class="text-sm mt-2">Listen to your recording before submitting.</figcaption>
            </figure>
        </div>
        <submit-button v-if="recordedAudio" @submit="sendData" :class="buttonClass"
            class="w-full py-4 h-auto uppercase mt-0" />
        <button v-if="recordedAudio" @click="clearAudio" class="border uppercase p-3  rounded-md">Record again</button>
    </div>
</template>
  
<script>
import Service from "../api/Service";
import Recorder from "../lib/Recorder";
import convertTimeMMSS from "../lib/Utils";
import IconButton from "./IconButton.vue";
import SubmitButton from "./SubmitButton.vue";

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
        SubmitButton,
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
            errorMessage: null,
            instructionMessage: INSTRUCTION_MESSAGE,
        };
    },
    computed: {
        buttonClass() {
            return "mx-auto h-20 w-20 fill-current flex items-center relative z-10 justify-center cursor-pointer bg-red-600 text-white rounded-50 ";
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
        onTimeUpdate() {
            const audioElement = this.$refs.audioPlayer;
            const remainingSeconds = audioElement.duration - audioElement.currentTime;
            this.remainingTime = convertTimeMMSS(remainingSeconds);
        },
        async sendData() {
            if (!this.recordedBlob) {
                return;
            }

            let result = null;
            if (this.customUpload) {
                result = await this.customUpload(this.recordedBlob);
            } else {
                result = await this.service.postBackend(this.recordedBlob);
            }

            if (result) {
                this.errorMessage = null;
                this.successMessage = SUCCESS_MESSAGE_SUBMIT;
                if (this.successfulUpload) {
                    this.successfulUpload();
                }
            } else {
                // error uploading
                this.successMessage = null;
                this.errorMessage = ERROR_SUBMITTING_MESSAGE;
                if (this.failedUpload) {
                    this.failedUpload();
                }
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