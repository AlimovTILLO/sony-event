<template>
    <div class="container">
        <div class="flex flex-col gap-[100px] h-full justify-between items-center py-20 px-15">
            <div class="w-[208px] h-[280px]">
                <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
            </div>
            <div class="w-full px-[60px]">
                <h1 class="text-5xl font-bold">Thank you!</h1>
                <p class="text-2xl mt-10 opacity-80">Your message is recorded and ready to be shared. Thank you for taking the
                    time to speak your mind. If you want to record another message, you’re welcome to do so. Enjoy the rest
                    of your time at Sony Kando Trip 2024</p>
            </div>
            <RouterLink class="w-full mt-20" to="/start"> <Button v-bind="$attrs">Finish</Button></RouterLink>
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
