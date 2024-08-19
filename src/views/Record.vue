<template>
  <div class="container h-screen">
    <div class="flex w-full flex-col gap-[60px]  h-full  items-center sm:pt-[60px] sm:pb-[100px]">
      <div class="flex flex-col gap-5 sm:gap-[40px] items-center">
        <div class="w-[134px] h-[180px]">
          <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
        </div>
        <h1 class="text-2xl sm:text-5xl sm:mt-5 font-bold">Record Here</h1>
        <p class="text-md sm:text-2xl  opacity-80">Press the button below to start recording. Afterwards, you will have the
          opportunity to review your recording. If you’re happy with your message, you can save, or feel free to try
          again.</p>
      </div>
      <Recorder class="" :time=".5" backendEndpoint="https://dev-api.bpcreates.com/api/process_activation"
        @start="startRecording" @stop="stopRecording" />
    </div>
  </div>
</template>
  
<script>
import Recorder from '../components/Recorder.vue';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';

export default {
  name: 'Record',
  components: {
    Recorder,
  },
  data() {
    return {
      isRecording: false, // состояние для отслеживания записи
    };
  },
  methods: {
    startRecording() {
      this.isRecording = true; // запуск анимации при нажатии
    },
    stopRecording() {
      this.isRecording = false; // остановка анимации после записи
    },
  }
}
</script>
  
  