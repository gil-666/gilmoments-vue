import axios from 'axios';
import { RouterView } from 'vue-router/dist/vue-router.cjs';
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchPosts = async (setPosts) => {
    try {
        const response = await axios.get(`${apiUrl}/api/posts`);
        setPosts(response.data); // Use the setter to update posts
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error; // Propagate the error
    }
};

export const fetchPostByID = async (postId) => {
    try {
        const response = await axios.get(`${apiUrl}/api/posts/${postId}`); // Ensure you use the correct endpoint
        return response.data; // Return the post data
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error; // Propagate the error
    }
};