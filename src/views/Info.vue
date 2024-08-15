<template>
    <div class="container">
        <div class="flex flex-col justify-between gap-[60px] items-center py-20 pt-10 px-15">
            <div class="flex flex-col items-center  gap-[60px]">
                <div class="w-[134px] h-[180px]">
                    <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
                </div>
                <h1 class="text-5xl font-bold">Your Information</h1>
            </div>
            <div class="w-full px-[60px]">
                <h1 class="text-5xl font-bold">Welcome to the Wishing Tree at Sony Kando Trip 2024!</h1>
                <p class="text-2xl opacity-80">Tap below to capture a quick, inspirational audio message and share your
                    voice with everyone.</p>
            </div>
            <RouterLink class="w-full" to="/start"> <Button v-bind="$attrs">Tap to start</Button></RouterLink>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Button from '../components/UI/Button.vue';
export default defineComponent({
    name: "Info",
    components: {
        Button
    },
    methods: {
        nextPage() {

        }
    }
})
</script>
