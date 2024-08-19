<template>
    <button v-bind="$attrs" class="border  text-lg flex justify-center items-center  sm:text-4xl font-bold w-full border-primary bg-primary uppercase py-3 sm:py-6  rounded-md">
        <slot />
    </button>
</template>

<script >
export default {
    name: 'Button',
    inheritAttrs: false,
   
}
</script>
