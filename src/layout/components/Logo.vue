<template>
    <div class="layout_logo">
        <img src="../../assets/images/logo.png" alt="">

        <p>旅游平台</p>
    </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.layout_logo {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center; // 垂直居中

    // justify-content: center;// 水平居中
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-left: 10px;
    }

    p {
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        margin-left: 10px;
    }
}
</style>