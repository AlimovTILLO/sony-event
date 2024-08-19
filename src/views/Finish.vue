<template>
    <div class="container h-screen">
        <div
            class="flex flex-col gap-[70px] sm:gap-[100px] h-full justify-between items-center py-10  sm:pt-[60px] sm:pb-[100px]">
            <div class="w-[150px] h-[150px] sm:w-[208px] sm:h-[280px]">
                <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
            </div>
            <div class="w-full">
                <h1 class="text-3xl sm:text-6xl font-bold">Thank you!</h1>
                <p class="text-lg font-normal sm:text-3xl mt-10 opacity-60">Your message is recorded and ready to be shared. Thank you
                    for taking
                    the
                    time to speak your mind. If you want to record another message, you’re welcome to do so. Enjoy the rest
                    of your time at Sony Kando Trip 2024</p>
            </div>
            <RouterLink class="w-full  sm:mt-20" to="/"> <Button v-bind="$attrs">Finish</Button></RouterLink>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Button from '../components/UI/Button.vue';
export default defineComponent({
    name: "Finish",
    components: {
        Button
    },
    methods: {
        nextPage() {

        }
    }
})
</script>
