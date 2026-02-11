<template>
    <!-- 添加外层容器作为视口 -->
    <div class="screen-wrapper">
        <div class="app-container" ref="appRef">

            <div class="top">
                <Top></Top>
            </div>
            <div class="layout">
                <Layout></Layout>
            </div>

            <!-- <div class="bottom">
                <Bottom></Bottom>
            </div> -->
            <div class="center">

            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue'

import Top from './components/top.vue'
// import Left from './components/left.vue'
// import Right from './components/right.vue'
import Bottom from './components/Bottom.vue'
import Layout from './components/layout.vue'

//1.定义根容器 和 防抖定时器
const appRef = ref()
let resizeTimer: number | null = null
// 2. 核心缩放逻辑
const calcScale = () => {
    if (!appRef.value) {  // 容器不存在时，直接返回
        return
    }
    // 1.设计稿基准尺寸
    const designWidth = 1920
    const designHeight = 1080
    // 2.获取当前可视区宽高
    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight
    // 3.计算缩放比例
    const scaleX = clientWidth / designWidth
    const scaleY = clientHeight / designHeight
    // 4.取较小值作为最终缩放比例
    const scale = Math.min(scaleX, scaleY)
    // 5.应用缩放比例（使用translate确保元素位置正确）
    appRef.value.style.transform = `translate(-50%, -50%) scale(${scale})`
}

// 3. 防抖处理
const debounceCalc = () => {
    if (resizeTimer !== null) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
        calcScale()
    }, 300)
}

//4. 挂载时执行变化
onMounted(() => {
    // 初始化时执行一次缩放
    calcScale()
    // 监听窗口变化事件
    window.addEventListener('resize', debounceCalc)
})
//5. 组件销毁时，移除事件监听，清理定时器
onUnmounted(() => {
    window.removeEventListener('resize', debounceCalc)
    clearTimeout(resizeTimer)
})
</script>

<style scoped lang="scss">
body {
    margin: 0;
    padding: 0;

    overflow: hidden; // 隐藏超出部分
}

.screen-wrapper {
    /* 视口容器，占满整个屏幕 */
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: url('../../view/screen/images/bg.png') no-repeat center center;
    background-size: cover;
}

.app-container {
    /* 设置为设计稿尺寸 */
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: center center; // 以中心为基准点缩放
    overflow: hidden; // 隐藏超出部分

    /* 确保子组件不会溢出 */
    box-sizing: border-box;
}

/* 确保所有子组件都使用正确的盒模型 */
.app-container>* {
    box-sizing: border-box;
}
</style>