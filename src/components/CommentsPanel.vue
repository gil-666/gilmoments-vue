<script setup>

import { defineProps, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Comment from './Comment.vue';
import { fetchPostComments } from '@/service/CommentService';
import IconSend from './icons/IconSend.vue';
import { delay, postComment } from '@/service/PostService';
import { fetchOnlineUsers, formatDate } from '@/service/AppService';

const props = defineProps(['post']);
const route = useRoute();
const comments = ref(null);
const comment = ref(''); // typed in text area
const CommentsOpen = ref(false);
const btnLoadingState = ref(false);
const postId = ref('');

onMounted(async () => {
    postId.value = route.params.id; // Get the post ID from route parameters
    try {
        comments.value = await fetchPostComments(postId.value); // Fetch the post
    } catch (error) {
        console.error('Error fetching post:', error);
    }
});

const submitComment = async () => {
    if (comment.value.trim() === '') {
        alert("escribe algo!");
        return;
    }
    btnLoadingState.value = true;
    try {
        await postComment({ post_id: postId.value, user_id: "671703048af61f15cf83dc80", text: comment.value });
        console.log('Submitted comment:', comment.value);
        comment.value = '';
    } catch (error) {
        alert(error)
    } finally {
        comments.value = await fetchPostComments(postId.value);
        btnLoadingState.value = false;
    }

};
</script>

<template>
    <div class="container" v-if="props?.post">
        <div class="comments-title">
            <!-- <span><IconCommunity style="padding-top: 3px;"></IconCommunity></span> -->
            <h3 style="padding-left: 5px; color: white; text-align: start;">comentarios</h3>
        </div>

        <hr class="solid">
        <div class="new-comment">
            <v-form validateOn="lazy">
                <v-textarea v-model="comment" required auto-grow :rows="3" counter persistent-counter maxlength="200"
                    :max-rows="4" label="comentario nuevo" no-resize placeholder="escribe un comentario..."
                    name="comment-field" id="comment-field">
                    <template v-slot:counter="{ value, max }">
                        <span class="custom-counter">{{ value }} / {{ max }}</span>
                    </template>
                </v-textarea>
                <v-btn @click="submitComment()" :loading="btnLoadingState" small class="new-comment-btn"
                    style="text-transform: none; box-shadow: none; color: white;" color="rgb(44, 44, 44)">
                    <IconSend v-if="!btnLoadingState"></IconSend>
                </v-btn>
            </v-form>
        </div>

        <br>
        <div class="comment-section">
            <Comment v-for="comment in comments">
                <template #icon>
                    <IconCommunity style="padding-top: 3px"></IconCommunity>
                </template>
                <template #user>{{ comment.user_id.name }}</template>
                <template #content>{{ comment.text }}</template>
                <template #timestamp>{{ formatDate(comment.createdAt) }}</template>
            </Comment>
        </div>

    </div>

</template>

<style lang="css" scoped>
.new-comment {
    display: block;
    position: relative;
    z-index: 1;

}


.new-comment-btn {
    background: none;
    width: 100px;
    /* Default size */
    height: 100px;
    /* Default height */

}

.comments-title {
    display: flex;
    user-select: none;
}

.custom-counter {
    color: white;
}

#comment-field {}

#comment-field::placeholder {
    text-indent: 10px;
    display: flex;
    place-items: center;
}

#comment-field::placeholder:hover {
    text-indent: 10px;
    display: none;
}

#comment-field:focus {
    background-color: rgb(44, 44, 44);
}

#comment-field:hover {
    background-color: black;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    /* Semi-transparent background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    /* Ensure it's above other content */
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

@media (max-width: 1024px) {
    .new-comment {
        display: block;
        position: relative;
        z-index: 1;
    }

    .new-comment-btn {
        margin-top: 10px;
        width: 100% !important;
        height: 50px !important;
        padding-top: 10px;
        text-align: center;
        padding: 10px !important;
    }
}
</style>