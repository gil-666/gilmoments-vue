import axios from 'axios';
import { RouterView } from 'vue-router/dist/vue-router.cjs';
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchOnlineUsers = async () => {
    try {
        
        const response = await axios.get(`${apiUrl}/api/active-connections`); // Ensure you use the correct endpoint
        console.log("online user response", response.data);
        return response.data; // Return the post data
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error; // Propagate the error
    }
}