<template>
  <RouterView :name="viewName" v-slot="{ Component, route }">
    <Transition :name="route.meta.transition || 'fade'" mode="out-in" @before-enter="flushWaiter"
      @before-leave="setupWaiter">
      <!-- <KeepAlive> -->
      <Suspense>
        <template #default>
          <component :is="Component" :key="route.name === 'repeat' ? route.path : route.meta.key" />
        </template>
        <template #fallback> Loading... </template>
      </Suspense>
      <!-- </KeepAlive> -->
    </Transition>
  </RouterView>
</template>

<script>
import Recorder from './components/Recorder.vue';
import 'vue-audio-tapir/dist/vue-audio-tapir.css';
import './styles/style.css'

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

