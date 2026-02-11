<template>
    <div class="left">
        <People></People>
        <Sex></Sex>
        <Age></Age>
    </div>
</template>

<script setup lang='ts'>
import People from './People.vue'
import Sex from './Sex.vue';
import Age from './Age.vue';
</script>

<style scoped lang="scss">
.left {
    width: 20%;
    height: 1000px;

}
</style>