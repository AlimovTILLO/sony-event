<template>
    <div class="container ">
        <div class="flex flex-col gap-[60px] justify-between items-center py-20 px-15">
            <div class="w-[208px] h-[280px]">
                <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
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
