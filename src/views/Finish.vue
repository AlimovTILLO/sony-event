<template>
    <div class="container">
        <div class="flex flex-col gap-[70px] sm:gap-[100px] h-full justify-between items-center py-10 sm:py-20 px-15">
            <div class="w-[150px] h-[150px] sm:w-[208px] sm:h-[280px]">
                <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
            </div>
            <div class="w-full px-5 sm:px-[60px]">
                <h1 class="text-3xl sm:text-5xl font-bold">Thank you!</h1>
                <p class="text-lg sm:text-2xl mt-10 opacity-80">Your message is recorded and ready to be shared. Thank you for taking
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
