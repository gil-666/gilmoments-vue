<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps(['post']);
const CommentsOpen = ref(false);
</script>

<template>
    <div class="overlay">
        <p>sas</p>

    </div>

</template>

<style lang="css" scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2; /* Ensure it's above other content */
}
</style>