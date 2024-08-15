<template>
    <input v-bind="$attrs" class="w-full py-4 px-5 rounded-lg text-2xl" />
    <slot />
</template>

<script >
export default {
    name: 'Input',
    inheritAttrs: false,

}
</script>
