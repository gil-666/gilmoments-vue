<script setup>
import { ref, onMounted } from 'vue';
import Post from '../components/Post.vue';
import { fetchPosts, delay } from '@/service/PostService';
import NewPost from '@/components/NewPost.vue';
import { fetchOnlineUsers, formatDate } from '@/service/AppService';
const posts = ref([]);
const loaded = ref(false);

const setPosts = (data) => {
    posts.value = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

onMounted(async() => {
    loaded.value = false;
    try{
      await fetchPosts(setPosts);
    }catch(error){
      console.log("error loading posts: ", error)
    }finally{
      console.log("loaded!");
      loaded.value = true;
    }
    
});

</script>

<script>

</script>
<template>
  <div class="loading-container">
    <v-progress-circular indeterminate v-if="!loaded" style="display: block; text-align: center;"></v-progress-circular>
  </div>
  
  <div v-if="loaded" v-for="post in posts" :key="post._id">
    
    <Post :post="post">
      <template #name>{{ post.user_id.name }}</template>
      <template #content>{{ post.text }}</template>
      <template #timestamp>{{ formatDate(post.createdAt) }}</template>
    </Post>
  </div>

  <div class="new-post">
    <NewPost :setPosts="setPosts"/>
  </div>
</template>

<style lang="css" scoped>
.loading-container {
    display: flex;
    justify-content: center;
    text-align: center;
}
.new-post{
  position: fixed;
  z-index: 2;
  bottom: 10%;
  right: 10%;
  place-content: center;
  place-items: center;
  text-align: center;
}
</style>