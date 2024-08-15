<template>
    <div class="container">
      <Recorder class="mt-20" :time=".5"
        backendEndpoint="https://your-endpoint.com/.netlify/functions/audio-message" @start="startRecording"
        @stop="stopRecording" />
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
  
  