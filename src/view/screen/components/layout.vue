<template>
    <div class="layout">
        <div class="left">
            <People></People>
            <Sex></Sex>
            <Age></Age>
        </div>
        <div class="center">
            <Map></Map>
            <Bottom></Bottom>
        </div>
        <div class="right">
            <HotTourist></HotTourist>
            <AnnualVisitor></AnnualVisitor>
            <Book></Book>
        </div>
    </div>
</template>

<script setup lang='ts'>
import People from './People.vue'
import Sex from './Sex.vue';
import Age from './Age.vue';
import HotTourist from './HotTourist.vue';
import AnnualVisitor from './AnnualVisitor.vue';
import Book from './Book.vue';
import Map from './Map.vue';
import Bottom from './Bottom.vue';
</script>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.left {
    width: 20%;
    height: 1000px;

}

.center {
    width: 60%;
    height: 650px;
    // background-color: pink;
}

.right {
    width: 20%;
    height: 1000px;
}
</style>