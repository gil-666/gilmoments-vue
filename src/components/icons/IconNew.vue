<template>
    <div class="plus-sign" @click="handleClick">
      <span>+</span>
    </div>
  </template>
  
  <script setup>
  import { defineEmits } from 'vue';
  
  const emit = defineEmits();
  
  const handleClick = () => {
    emit('click'); // Emit an event when the plus sign is clicked
  };
  </script>
  
  <style scoped>
  .plus-sign {
    display: inline-block;
    place-content: center;
    align-self: center;
    cursor: pointer;
    font-size: 2rem; /* Adjust size as needed */
    color: #333; /* Adjust color as needed */
    transition: color 0.3s;
    transform: scale(1.1);
  }
  
  .plus-sign:hover {
    color: #ffffff; /* Change color on hover */
  }
  </style>
  