<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Post from '@/components/Post.vue';
import { fetchPostByID } from '@/service/PostService';
import CommentsPanel from '@/components/CommentsPanel.vue';
import router from '@/router';
const props = defineProps(['post']);
const route = useRoute();
const postID = route.params.id;
const post = ref(null);
function formatDate(dateString) {
console.log("recieved date: ",dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleString(undefined, options);
}

onMounted(async () => {
    const postId = route.params.id; // Get the post ID from route parameters
    try {
        post.value = await fetchPostByID(postId); // Fetch the post
    } catch (error) {
        console.error('Error fetching post:', error);
        router.push('/404');
    }
});
</script>

<template>
    <div class="post-detail" v-if="post">
    <Post :post="post" :in-detail-mode="true">
      <template #name>{{ post.user_id.name }}</template>
      <template #content>{{ post.text }}</template>
      <template #timestamp>{{ formatDate(post.createdAt) }}</template>
    </Post>
  </div>
  <div class="comments">
    <CommentsPanel :post="post"/>
  </div>
</template>

<style lang="css" scoped>
.comments{
  margin-top: -17px;
}
</style>