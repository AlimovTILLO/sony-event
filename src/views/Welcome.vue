<template>
    <div class="container !h-screen">
        <div class="flex flex-col h-full justify-between items-center py-10 sm:pt-[60px] sm:pb-[100px] sm:px-15">
            <div class="flex flex-col gap-[100px] items-center">
                <div class="w-[283px] h-[380px]">
                    <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
                </div>
                <div class="w-full">
                    <h1 class="text-2xl sm:text-6xl font-bold">Welcome to the Wishing Tree at Sony Kando Trip 2024!</h1>
                    <p class="text-md sm:text-4xl opacity-80">Tap below to capture a quick, inspirational audio message and
                        share your
                        voice with everyone.</p>
                </div>
            </div>
            <RouterLink class="w-full mt-10  sm:mt-20" to="/start"> <Button v-bind="$attrs">Tap to start</Button>
            </RouterLink>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Button from '../components/UI/Button.vue';
export default defineComponent({
    name: "Welcome",
    components: {
        Button
    },
    methods: {
        nextPage() {

        }
    }
})
</script>
