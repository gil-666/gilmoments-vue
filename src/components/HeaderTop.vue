<script setup>
import { defineProps } from 'vue';
import Icon from './icons/IconDocumentation.vue'
import HeaderLink from './HeaderLink.vue';

const props = defineProps({
    showReturn: {
        type: Boolean,
        default: false,
    },
});
</script>
<template>
    <header>
        <div class="logo-link">
            <a class="header-logo" href="/">

                <h1>
                    gilmoments
                    <Icon aria-label="Documentation Icon" />
                </h1>
                <span :class="['return-label', { 'no-hover': showReturn }]">regresar a inicio</span>
            </a>
        </div>

        <HeaderLink href="http://udg.mx">
            <template #button>UDG</template>
        </HeaderLink>
        <HeaderLink href="/contact">
            <template #button>Contacto</template>
        </HeaderLink>
        <HeaderLink href="https://github.com/gil-666/GilMessenger">
            <template #button>GilMessenger</template>
        </HeaderLink>
        <!-- <HeaderLink>
            <template #button>Alerta</template>
        </HeaderLink> -->
    </header>
</template>

<style lang="css" scoped>
.logo-link {
    color: #ff11a4;
    transition: 0.5s;
    cursor: default;
    line-height: 25px;
    padding: 10px;
    padding-top: 1px;
    border-radius: 10px;
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