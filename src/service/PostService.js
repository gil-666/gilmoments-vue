import axios from 'axios';
import { RouterView } from 'vue-router/dist/vue-router.cjs';
const apiUrl = import.meta.env.VITE_API_URL;
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); //for debugging slow networks

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

export const postComment = async (formData) =>{
    try {
        // Send the post data to the server
        const response = await axios.post(`${apiUrl}/api/comments`, {
            post_id: formData.post_id,
            user_id: formData.user_id,
            text: formData.text,
        });
        console.log('Post created:', response.data); // Log the response
    } catch (error) {
        console.error('Error creating post:', error); // Log any errors
    } 
}