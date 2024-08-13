<template>
  <div class="container">
    <Recorder class="mt-20" :time=".5"
      backendEndpoint="https://your-endpoint.com/.netlify/functions/audio-message" @start="startRecording"
      @stop="stopRecording" />
  </div>
</template>

<script>
import Recorder from './components/Recorder.vue';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';

export default {
  name: 'App',
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

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
}
</style>
