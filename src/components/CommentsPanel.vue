<script setup>
import { defineProps, ref, watch, onMounted} from 'vue';
import { useRoute } from 'vue-router';
const props = defineProps(['post']);
const route = useRoute();
import Comment from './Comment.vue';
import { fetchPostComments } from '@/service/CommentServer';
const comments = ref(null);
const CommentsOpen = ref(false);

onMounted(async () => {
    const postId = route.params.id; // Get the post ID from route parameters
    try {
        comments.value = await fetchPostComments(postId); // Fetch the post
    } catch (error) {
        console.error('Error fetching post:', error);
        router.push('/404');
    }
});
</script>

<template >
    <div class="container" v-if="props?.post">
        <h3 style="padding-left: 5px; text-align: start;">comentarios</h3>
        <hr class="solid">
        <br>
        <Comment v-for="comment in comments">
            <template #user>{{ comment.user_id.name }}</template>
            <template #content>{{comment.text}}</template>
        </Comment>
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
hr.solid {
    margin-top: 8px;

  border: 1px 0px 0px 0px;
  border-width: 0.5px;
  border-left: 0px;
  border-color: rgb(32, 32, 32);
  border-right: 0px;
  border-style: solid;
}
</style>