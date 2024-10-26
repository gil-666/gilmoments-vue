<script setup>
import { ref,computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import HeaderTop from './components/HeaderTop.vue'
import Home from './views/Home.vue';
import { fetchOnlineUsers } from './service/AppService';

var socket = ref(null);
var useronline = ref(null);
const apiUrl = import.meta.env.VITE_API_URL;

const userCountRoutine = async () => {
  const response = await fetchOnlineUsers();
  useronline.value = response.activeConnections;
  console.log("bruh", response);
};

let intervalId;
onMounted(() => {
  socket = new WebSocket(`ws://${apiUrl}:5001`);
  intervalId = setInterval(userCountRoutine,1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const route = useRoute();
const enableReturn = computed(() => {
  return route.name !== 'Home';
});



</script>

<template>
  <div class="header">
    <HeaderTop :showReturn="enableReturn" :usersOnline="useronline"/>
  </div>
  
  
  <div class="content">
    <router-view />

  </div>
</template>

<style scoped>
.title-pub{
  padding-top: 10px;
  /* padding-inline-start: 10px; */
}

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