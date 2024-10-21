<script setup>
import { ref,computed } from 'vue'
import { useRoute } from 'vue-router';
import HeaderTop from './components/HeaderTop.vue'
import Home from './views/Home.vue';
import FloatingButton from './components/NewPost.vue';
const route = useRoute();
const enableReturn = computed(() => {
  return route.name !== 'Home';
});

</script>

<template>
  <HeaderTop :showReturn="enableReturn"/>
  <div class="content">
    <router-view />

  </div>


</template>

<style scoped>
button {
  font-weight: bold;
}

ul {
  text-align: center;
}

#titulo {
  color: #FFFF;
}

</style>