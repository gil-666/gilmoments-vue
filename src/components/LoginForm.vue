<script setup>
import { ref } from 'vue';
const apiUrl = import.meta.env.VITE_API_URL;
import IconNew from './icons/IconNew.vue';
import axios from 'axios';
import { fetchPosts, postComment, postCreate} from '@/service/PostService';
import { authLogin } from '@/service/AppService';
const btnLoadingState = ref(false);
const formData = ref({ username: '', password: '' }); // Define form data

async function handleSubmit() {
    btnLoadingState.value = true;
    try {
        await authLogin(formData);
        formData.value = { username: '', password: '' }; // Reset form fields
    }catch(error){
        console.log("handleSubmit: ", error)
    }finally{
        btnLoadingState.value = false;
    }
    
}

const removeSpaces = () => { //no space for usernames
    formData.value.username =  formData.value.username.replace(/\s+/g, ''); // Removes all spaces
};
</script>

<template>
    <div>
        <!-- <div class="button" @click="sas">
            <IconNew />
        </div> -->
        <div class="">

            <form class="new-post" @submit.prevent="handleSubmit" @click.stop>
                <h2 id="overlay-title">iniciar sesión</h2><br>
                <div>
                    <label for="name">usuario:</label><br>
                    <v-text-field :rows="1" @input="removeSpaces" class="username" type="text" id="name" v-model="formData.username" no-resize required></v-text-field>
                </div>
                <br>
                <div>
                    <label for="text">contraseña:</label><br>
                    <v-text-field type="password" rows="1" id="text" v-model="formData.password" no-resize required></v-text-field>
                </div>
                <br>
                <v-btn :loading="btnLoadingState" class="btn-submit" type="submit">enviar</v-btn>
            </form>
            <!-- <h2 id="overlay-note">presiona afuera para salir</h2> -->
        </div>
    </div>
</template>

<style lang="css" scoped>
.btn-submit {
    text-decoration: none;
    color: hsla(160, 100%, 37%, 1);
    box-shadow: inset 0 0 0 2px hsla(0, 0%, 55%, 0.682);
    background-color: black;
    transition: 0.4s;
    font-size: 11pt;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    border-style: none;
    cursor: pointer;
    border-radius: 10px;
}

#overlay-title {
    margin-top: -120px;
    /* position: fixed; */
    text-align: center;
    align-self: center;
    align-content: center;
    margin-left: 8px;

}

#overlay-note {
    position: fixed;
    margin-bottom: -500px;
    font-size: 9pt;
    color: rgb(240, 240, 240);
}

@media (hover: hover) {
    .btn-submit:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
        color: hsla(160, 100%, 37%, 1);
        background-color: hsla(160, 100%, 56%, 0.308);
        box-shadow: inset 0 0 0 2px hsla(160, 100%, 37%, 1);

        transform: scale(1.05);
    }
}

.new-post-fld {
    background-color: hsla(0, 0%, 8%, 0.682);
    color: white;
    /* border-color: rgb(255, 255, 255);
    border-width: 0.5px;
    border-style: solid;
    border-radius: 5px; */
    /* min-height: 100px;
    height: 100px;
    min-width: 200px;
    max-width: 400px;
    max-height: 200px; */
    text-align: left;
}

#name {
    max-height: 25px;
    min-height: 25px;
}

.button {
    border: 10px;
    border-style: solid;
    border-radius: 70px;
    place-content: center;
    border-color: hsla(160, 100%, 37%, 1);
    background-color: hsla(160, 100%, 37%, 1);
    cursor: pointer;
    width: 70px;
    height: 70px;
    user-select: none;
    box-shadow: 0 0px 10px 1px hsl(0, 0%, 0%);
}

.new-post {

    /* position: fixed; */
    text-align: start;
    padding: 80px;
    z-index: 3;
    background: fixed;
    /* background-color: hsla(0, 0%, 8%, 0.911); */
    border-radius: 20px;
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

form {
    margin-top: 20px;
    /* Space between button and form */
}
</style>