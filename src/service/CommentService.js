import axios from 'axios';
import { RouterView } from 'vue-router/dist/vue-router.cjs';
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchPostComments = async (postId) => {
    console.log("lol");
    try {
        const response = await axios.get(`${apiUrl}:5000/api/comments/${postId}`); // Ensure you use the correct endpoint
        return response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));; // order by date most recent
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error; // Propagate the error
    }
};