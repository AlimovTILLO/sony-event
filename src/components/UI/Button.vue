<template>
    <button v-bind="$attrs" class="border text-2xl font-bold w-full border-primary bg-primary uppercase py-5 rounded-md">
        <slot />
    </button>
</template>

<script >
export default {
    name: 'Button',
    inheritAttrs: false,
   
}
</script>
