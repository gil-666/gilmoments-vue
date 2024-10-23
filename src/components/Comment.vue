<script setup>

</script>

<template>
    <div class="comment-container">
        <p class="comment-user"><slot name="user"></slot></p>
        <p class="comment-text"><slot name="content"></slot></p>
    </div>
</template>

<style lang="css" scoped>
.comment-container{
    text-align: start;
    padding-bottom: 20px;
}
.comment-user{
    padding-left: 10px;
    font-style: italic;
    color: white;
}
.comment-text{
    padding-left: 12px;
}

.comment-container:active{
    background-color: rgb(43, 43, 43);
    border-radius: 10px;
}
</style>