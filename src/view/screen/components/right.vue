<template>
        <div class="right">
            <HotTourist></HotTourist>
            <AnnualVisitor></AnnualVisitor>
            <Book></Book>
        </div>
</template>
    
<script setup lang='ts'>
    import HotTourist from './HotTourist.vue';
    import AnnualVisitor from './AnnualVisitor.vue';
    import Book from './Book.vue';

</script>
    
<style scoped lang="scss">
    .right{
        width:20%;
        height: 100%;
        background-color: #430606;
        padding: 20px;
        box-sizing: border-box;
    }
</style>