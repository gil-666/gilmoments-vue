<script setup>
</script>

<template>
    <div class="comment-container">
        <i><slot name="icon"></slot></i>
        <div class="comment-info">
            <p class="comment-user"><slot name="user"></slot></p>
            <p class="comment-timestamp"><slot name="timestamp"></slot></p>
        </div>
        
        <p class="comment-text"><slot name="content"></slot></p>
        
    </div>
</template>

<style lang="css" scoped>
.comment-container{
    /* font-size: 16px; */
    text-align: start;
    padding-bottom: 15px;
    /* display: flex; */
    padding: 10px;
  border: 1px 0px 0px 0px;
  border-width: 1px;
  border-left: 0px;
  border-color: rgb(32, 32, 32);
  border-right: 0px;
  border-style: solid;
  width: auto;
  word-break: break-all;
}
.comment-info{
    display: flex;
    justify-content: space-between;
    width: 100%; 
}

.comment-timestamp{
    text-align: end;   
    user-select: none;
}
.comment-user{
    /* padding-left: 10px; */
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