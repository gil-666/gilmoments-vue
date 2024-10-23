import axios from 'axios';
import { RouterView } from 'vue-router/dist/vue-router.cjs';
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchPostComments = async (postId) => {
    console.log("lol");
    try {
        const response = await axios.get(`${apiUrl}/api/comments/${postId}`); // Ensure you use the correct endpoint
        return response.data; // Return the post data
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error; // Propagate the error
    }
};