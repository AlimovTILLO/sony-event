<template>
    <div class="container">
        <div class="flex w-full flex-col justify-between  gap-[100px] items-center py-20 pt-10">
            <div class="flex flex-col items-center  gap-[60px]">
                <div class="w-[134px] h-[180px]">
                    <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
                </div>
                <h1 class="text-5xl font-bold">Your Information</h1>
            </div>
            <div class="w-full mt-10">
                <div class="form-group flex gap-10">
                    <div class="input-wrapper flex-1 items-start flex flex-col">
                        <label class="opacity-60 mb-3" for="first-name">First name</label>
                        <Input type="email" id="email" v-model="email" placeholder="First name" />
                    </div>
                    <div class="input-wrapper flex-1 items-start flex flex-col">
                        <label class="opacity-60 mb-3" for="last-name">Last name</label>
                        <Input type="text" id="last-name" v-model="email" placeholder="Last name" />
                    </div>
                </div>
                <div class="input-wrapper w-full mt-10 items-start flex-[1_1_0] flex flex-col">
                    <label class="opacity-60 mb-3" for="email">Email</label>
                    <Input type="email" id="email" v-model="email" placeholder="your@email.com" />
                </div>
            </div>
            <RouterLink class="w-full mt-20" to="/record"> <Button v-bind="$attrs">Next</Button></RouterLink>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Button from '../components/UI/Button.vue';
import Input from '../components/UI/Input.vue';
export default defineComponent({
    name: "Info",
    components: {
        Button,
        Input
    },
    methods: {
        nextPage() {

        }
    }
})
</script>
