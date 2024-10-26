<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import IconCommunity from './icons/IconCommunity.vue';
import IconHeart from './icons/IconHeart.vue';
import CommentsPanel from './CommentsPanel.vue';
import axios from 'axios';
import { defineProps } from 'vue';
const apiUrl = import.meta.env.VITE_API_URL;
const props = defineProps(['post', 'inDetailMode']);//post passed from Home
const isHeartFilled = ref(false);
const likeCounter = ref(props.post.likes);
const counterClass = ref('');
const likeRegistered = ref(true);

const inDetailMode = props.inDetailMode ?? false;
const fetchLikes = async () => {
  try {
    const response = await axios.get(`${apiUrl}:5000/api/posts/${props.post._id}/likes`);
    likeCounter.value = response.data.likes;// Assume the response contains updated likes
  } catch (error) {
    console.error('Error fetching likes:', error);
  }
};


const toggleHeart = async () => { //when like is clicked
  isHeartFilled.value = !isHeartFilled.value;
  likeRegistered.value = false;//when like is cliked loading shows
  try {
    const url = `${apiUrl}:5000/api/posts/${props.post._id}/likes`;
    if (isHeartFilled.value) {
      await axios.post(url);// send request
      // likeCounter.value++;
    } else {
      // likeCounter.value--;
      await axios.delete(url);
    }

  } catch (error) {
    console.error('Error updating likes:', error);
  }finally{
    await fetchLikes(); //fetch likes to confirm like register, wait for it to finish to avoid glitch
    likeRegistered.value = true;//when add/delete like is registered, loading stops
    triggerAnimation();
  }
};

const triggerAnimation = () => {
  counterClass.value = 'animate';
  setTimeout(() => {
    counterClass.value = '';
  }, 500);
};

watch(likeCounter, () => {
  triggerAnimation();
});


let intervalId; //FETCH LIKES EVERY 1 SECOND
onMounted(() => {
  fetchLikes();
  intervalId = setInterval(fetchLikes, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const formatLikes = (likes) => {
  if (likes < 1000) return likes.toString();
  if (likes < 1000000) return Math.floor(likes / 100) / 10 + 'K'; // Round down to one decimal place
  return Math.floor(likes / 100000) / 10 + 'M'; // Round down to one decimal place
};


</script>
<template>
  <div class="container">
    <div class="name">
      <h3>
        <slot name="name"></slot>
      </h3>
      <p class="timestamp">
        <slot name="timestamp"></slot>
      </p>
    </div>
    <div class="details">
      <slot name="content"></slot>
    </div>
    <div class="buttons" style="display: flex;">
      <i v-if=!inDetailMode>
        <router-link :to="{ path: `/post/${post._id}` }" class="comment-link">
          <IconCommunity />
        </router-link>
      </i>
      <i class="like" @click="toggleHeart">
        <IconHeart :class="{ filled: isHeartFilled }" />
      </i>
      <span class="counter" :class="counterClass" v-if="likeRegistered">{{ formatLikes(likeCounter) }}
      <span class="counter-full">{{ likeCounter }}</span></span>
      <div class="loading-container">
            <v-progress-circular indeterminate v-if="!likeRegistered"
                style="position: relative; bottom: 2.5px;text-align: center; width: 20px; padding-bottom: 6px; margin-left: 2px;"></v-progress-circular>
        </div>
    </div>
  </div>
  <br>
</template>

<style scoped>

.name {
  text-align: start;
  user-select: none;
  
}

.comment-link {
  border: unset;
  color: unset;
  padding: unset;
}

.details a {
    color: blue; /* Default link color */
    text-decoration: none; /* Remove underline */
}

.comment-link:hover {
  box-shadow: none;
  background-color: unset;
  padding: unset;
}

.details {
  text-align: start;

}

.counter-full {
  position: absolute; /* Position it absolutely */
  bottom: 110%; /* Place it above the counter */
  left: 50%; /* Center it horizontally */
  transform: translateX(-50%); /* Adjust to center */
  opacity: 0; /* Start hidden */
  transition: opacity 0.3s ease; /* Smooth transition */
  background: rgba(90, 90, 90, 0.743); /* Optional background */
  color: white; /* Text color */
  padding: 3px 8px; /* Optional padding */
  border-radius: 4px; /* Optional rounded corners */
  user-select: none;
}

.counter:hover .counter-full {
  opacity: 1; /* Show on hover */
}

.timestamp {
  font-size: 0.9rem;
  color: gray;
  user-select: none;
}

@media (prefers-color-scheme: light) {
  .timestamp{
    color: hsla(160, 100%, 37%, 1);
  }
}

.container {
  padding: 10px;
  border: 1px 0px 0px 0px;
  border-width: 1px;
  border-left: 0px;
  border-color: rgb(32, 32, 32);
  border-right: 0px;
  border-style: solid;
}

.buttons {
  display: flex;
  margin-top: 1rem;
  text-align: center;
  user-select: none;
}

i {
  place-items: center;
  place-content: center;
  align-self: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
  user-select: none;

}

.like:active {
  color: rgb(219, 50, 50);
  transform: scale(0.8);
}

h3 {
  text-transform: capitalize;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

.counter {
  display: inline-block;
  /* Ensure the counter can scale */
  position: relative;
  transition: transform 1s;
  user-select: none;
}

.counter.animate {
  animation: scaleUp 0.2s forwards;
  /* Trigger the animation */
}

@keyframes scaleUp {
  0% {
    transform: translateY(0) scale(1);
    /* Start at normal size */
  }

  50% {
    transform: translateY(-20px) scale(1.2);
    /* Move up and scale */
  }

  100% {
    transform: translateY(0) scale(1);
    /* Return to original position */
  }
}

.filled {
  color: rgb(219, 50, 50);
  /* Change this to your desired filled color */
}
</style>
