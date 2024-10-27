import axios from 'axios';
import { RouterView } from 'vue-router/dist/vue-router.cjs';
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchOnlineUsers = async () => {
    try {

        const response = await axios.get(`${apiUrl}:5001/api/active-connections`); // Ensure you use the correct endpoint
        console.log("online user response", response.data);
        return response.data; // Return the post data
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error; // Propagate the error
    }
}

export const userCreate = async (formData, props) =>{
    try {
        // Send the post data to the server
        const response = await axios.post(`${apiUrl}:5000/api/posts`, {
            name: formData.value.name.toLowerCase(),
            text: formData.value.text,
        });
        await fetchPosts(props.setPosts);
        console.log('Post created:', response.data); // Log the response
        showForm.value = false; // Close the form after submission
        formData.value = { name: '', text: '' }; // Reset form fields
    } catch (error) {
        console.error('Error creating post:', error); // Log any errors
    } 
}

export const authLogin = async (formData) =>{
    try {
        // Send the post data to the server
        const response = await axios.post(`${apiUrl}:5000/api/login`, {
            username: formData.value.username.toLowerCase(),
            password: formData.value.password,
        });
        console.log('auth data: ', response.data); // Log the response
    } catch (error) {
        console.error('Error creating post:', error); // Log any errors
    } 
}

export function formatDate(dateString) {
    console.log("recieved date: ", dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
}
export function formatDateComment(dateString) {
    console.log("recieved date: ", dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
}