<script setup>
import { ref, onMounted } from 'vue';
import Post from '../components/Post.vue';
import { fetchPosts } from '@/service/PostService';
import NewPost from '@/components/NewPost.vue';
import { fetchOnlineUsers } from '@/service/AppService';
const posts = ref([]);

const setPosts = (data) => {
    posts.value = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

onMounted(() => {
    fetchPosts(setPosts);
    
});
function formatDate(dateString) {
console.log("recieved date: ",dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleString(undefined, options);
}
</script>

<script>

</script>
<template>
  <div v-for="post in posts" :key="post._id">
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