<template>
    <div class="container">
        <div class="flex w-full flex-col justify-between gap-10 sm:gap-[100px] items-center py-10 sm:py-20 pt-10">
            <div class="flex flex-col items-center gap-5 sm:gap-[60px]">
                <div class="w-[134px] h-[180px]">
                    <img class="w-full" src="/png/KandoLogo.png" alt="Logo">
                </div>
                <h1 class="text-3xl sm:text-5xl font-bold">Your Information</h1>
            </div>
            <div class="w-full sm:mt-10">
                <form @submit.prevent="handleSubmit">
                    <div class="form-group flex flex-col sm:flex-row gap-8 sm:gap-10">
                        <div class="input-wrapper relative flex-1 items-start text-start flex flex-col">
                            <label class="opacity-60 mb-1 sm:mb-3" for="first-name">First name</label>
                            <input class="w-full py-2 sm:py-4 pl-2 px-5 text-gray-500 rounded-lg text-lg sm:text-2xl"
                                type="text" id="first-name" v-model="form.firstName" placeholder="First name" />
                            <span v-if="errors.firstName" class="absolute -bottom-5 text-red-500 text-sm">{{
                                errors.firstName }}</span>
                        </div>
                        <div class="input-wrapper flex-1 relative items-start flex text-start flex-col">
                            <label class="opacity-60 mb-1 sm:mb-3" for="last-name">Last name</label>
                            <input class="w-full py-2 sm:py-4 pl-2 px-5 text-gray-500 rounded-lg text-lg sm:text-2xl"
                                type="text" id="last-name" v-model="form.lastName" placeholder="Last name" />
                            <span v-if="errors.lastName" class="absolute -bottom-5 text-red-500 text-sm">{{ errors.lastName
                            }}</span>
                        </div>
                    </div>
                    <div
                        class="input-wrapper text-start relative  w-full mt-5 sm:mt-10 items-start flex-[1_1_0] flex flex-col">
                        <label class="opacity-60 mb-1 sm:mb-3" for="email">Email</label>
                        <input class="w-full py-2 sm:py-4 pl-2 px-5 text-gray-500 rounded-lg text-lg sm:text-2xl"
                            type="email" id="email" v-model="form.email" placeholder="your@email.com" />
                        <span v-if="errors.email" class="absolute -bottom-5 text-red-500 text-sm">{{ errors.email }}</span>
                    </div>
                    <Button class="mt-20 sm:mt-40" v-bind="$attrs">Next</Button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, watch } from 'vue';
import Button from '../components/UI/Button.vue';

export default defineComponent({
    name: "Info",
    components: {
        Button,
    },
    data() {
        return {
            errors: {
                firstName: '',
                lastName: '',
                email: ''
            },
            form: {
                firstName: '',
                lastName: '',
                email: ''
            }
        }
    },
    methods: {
        validateFirstName() {
            const nameRegex = /^[a-zA-Z]+$/;
            if (!nameRegex.test(this.form.firstName)) {
                this.errors.firstName = 'First name should contain only Latin letters.';
            } else {
                this.errors.firstName = '';
            }
        },
        validateLastName() {
            const nameRegex = /^[a-zA-Z]+$/;
            if (!nameRegex.test(this.form.lastName)) {
                this.errors.lastName = 'Last name should contain only Latin letters.';
            } else {
                this.errors.lastName = '';
            }
        },
        validateEmail() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.form.email)) {
                this.errors.email = 'Invalid Email Address';
            } else {
                this.errors.email = '';
            }
        },
        handleSubmit() {
            this.validateFirstName();
            this.validateLastName();
            this.validateEmail();

            if (!this.errors.firstName && !this.errors.lastName && !this.errors.email) {
                this.$router.push('/record');  // Замените '/next-route' на ваш нужный маршрут
            }
        }
    },
    watch: {
        'form.firstName': function (value) {
            this.validateFirstName();
        },
        'form.lastName': function (value) {
            this.validateLastName();
        },
        'form.email': function (value) {
            this.validateEmail();
        }
    }
});
</script>
