<script setup>
import { defineProps,ref } from 'vue';
import Icon from './icons/IconDocumentation.vue'
import HeaderLink from './HeaderLink.vue';

const props = defineProps({
    showReturn: {
        type: Boolean,
        default: false,
    },
    usersOnline: {
        type: Number,
        default: 0,
    },
});
</script>
<template>
    <header>
        <div class="logo-link">
            <a class="header-logo" href="/">
                <p style="text-align: end; margin-bottom: -7px;">beta</p>
                <h1>
                    gilmoments
                    <Icon aria-label="Documentation Icon" />
                </h1>
                <span :class="['return-label', { 'no-hover': showReturn }]">regresar a inicio</span>
            </a>
        </div>

        <HeaderLink href="https://github.com/gil-666/gilmoments-vue">
            <template #button>source</template>
        </HeaderLink>
        <HeaderLink href="/contact">
            <template #button>contacto</template>
        </HeaderLink>
        <HeaderLink href="https://github.com/gil-666/GilMessenger">
            <template #button>gilmessenger</template>
        </HeaderLink>
        <!-- <HeaderLink>
            <template #button>Alerta</template>
        </HeaderLink> -->
       
        
    </header>
    <p class="user-counter" v-show="usersOnline" :class="{ 'fade-in': usersOnline }">
            {{ usersOnline }} usuario{{ usersOnline !== 1 ? 's' : '' }} en linea{{ usersOnline !== 1 ? '' : ' (tú)' }}
        </p>
</template>

<style lang="css" scoped>
.user-counter {
    padding: 10px;
    padding-top: 10px;
    font-size: 16px;
    height: 20px; /* Set a fixed height to avoid layout shift */
    transition: opacity 0.8s ease-in; 
    opacity: 0; /* Initially hidden */
    padding-bottom: 35px;
}

/* Fade-in effect */
.user-counter.fade-in {
    opacity: 1; /* Show when the class is added */
}
.logo-link {
    color: #ff11a4;
    transition: 0.5s;
    cursor: default;
    line-height: 25px;
    padding: 10px;
    padding-top: 1px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
}
@media (prefers-color-scheme: light){
    .user-counter{
        color: rgb(0, 104, 69);
    }

}


.return-label {
    transition: 0.5s;
    opacity: 0%;
}

.header-logo:hover {
    border: none;
    box-shadow: none;
}


.no-hover{
    opacity: 100%;

}

@media (hover: hover) {
    .logo-link:hover {
        background-color: hsla(160, 100%, 37%, 0.2);
        color: hsla(160, 100%, 37%, 1);
    }

    .logo-link:hover .return-label {
        opacity: 100%;

    }




}
</style>