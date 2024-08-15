<template>
    <div class="container">
        <div class="flex flex-col  justify-between items-center py-20 px-15">
            <div class="flex flex-col gap-[60px] items-center">
                <div class="w-[134px] h-[180px]">
                    <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
                </div>
                <div class="w-full flex flex-col gap-10">
                    <h1 class="text-5xl font-bold">Get Started</h1>
                    <p class="text-2xl opacity-80">Take a moment to think about what you would like to say. Whether it’s
                        a wish for the world, an inspirational thought, life lesson, quote or a kind word, your message
                        is important.</p>
                    <p class="text-2xl opacity-80">You’re probably already a pro at this, here are a few tips to keep in
                        mind. When you’re ready, hit the button below.</p>
                    <div class="flex flex-col gap-[30px]">
                        <div class="flex gap-[30px]">
                            <Button class="bg-secondary border-secondary max-w-[64px] px-6">1</Button>
                            <p class="text-2xl text-start">Be Yourself: Speak naturally, we want to hear a positive message
                                from you!</p>
                        </div>
                        <div class="flex gap-[30px]">
                            <Button class="bg-secondary border-secondary max-w-[64px] px-6">2</Button>
                            <p class="text-2xl text-start">Maintain a consistent distance between you and the microphone
                                while speaking clearly.</p>
                        </div>
                        <div class="flex gap-[30px]">
                            <Button class="bg-secondary border-secondary max-w-[64px] px-6">3</Button>
                            <p class="text-2xl text-start">Keep it short - You have up to 30 seconds to record.</p>
                        </div>
                    </div>
                </div>
            </div>
            <RouterLink class="w-full mt-[222px]" to="/info"> <Button v-bind="$attrs">Ready to Record</Button></RouterLink>
        </div>
    </div>
</template>
 
<script>
import { defineComponent } from 'vue';

import Button from '../components/UI/Button.vue';
export default defineComponent({
    name: "GetStarted",
    components: {
        Button
    },
    methods: {
        nextPage() {

        }
    }
})
</script>

