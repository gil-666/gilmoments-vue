<template>
    <a class="top-link" :href><slot name="button"></slot></a>
</template>

<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        href:{
            type: String,
            requiered: true
        }
    })
</script>
<style lang="css" scoped>
.top-link{
    display: inline-flex;
}
</style>