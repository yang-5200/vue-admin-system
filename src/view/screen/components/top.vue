<template>
    <div class="top">
        <div class="top-left">

        </div>
        <div class="top-center">    
                <div class="top-center-item-left" @click="goHome">
                    首页
                </div>
                <div class="top-center-item-content">
                    智慧旅游可视化大数据展示中心
                </div>
                <div class="top-center-item-right">
                    统计报告
                </div>
        </div>
        <div class="top-right">
            <div class="top-right-item">
                当前时间：{{ formatTime(currentTime) }}
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted ,onUnmounted} from 'vue'
import { useRouter } from 'vue-router'
// 路由实例
const router = useRouter()
// 首页点击事件
const goHome = () => {
        router.push({ name: 'home' })
}



// 计算当前时间
const currentTime = ref(new Date())
let timer: any = null
// 格式化时间为字符串
const formatTime = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hour = String(date.getHours()).padStart(2, '0')
        const minute = String(date.getMinutes()).padStart(2, '0')
        const second = String(date.getSeconds()).padStart(2, '0')
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
onMounted(() => {
        // 每秒钟更新一次时间
        timer = setInterval(() => {
                currentTime.value = new Date()
        }, 1000)
})
onUnmounted(() => {
        // 组件卸载时清除定时器
        clearInterval(timer)
})
</script>

<style scoped lang="scss">
.top {
    width: 80%;
    margin: 0 auto;
    height: 100px;
    color: rgb(42, 165, 199);
    display: flex;
    

    .top-left {
        flex: 1;
        height: 40px;
        background: url('../../screen/images/dataScreen-header-left-bg.png') no-repeat center center;
        background-size: cover; // 确保背景图完整显示
    }

    .top-center {
        display: flex;
        flex: 2;
        height: 100px;
        
    }
    
    .top-center-item-left,
    .top-center-item-right {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
    }
    
    .top-center-item-left {
        background: url('../../screen/images/dataScreen-header-btn-bg-l.png') no-repeat center center;
        background-size: cover; // 确保背景图完整显示
    }
    
    .top-center-item-content {
        // 使用flex自适应宽度，不再固定850px
        flex: 2;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        background: url('../../screen/images/dataScreen-header-center-bg.png') no-repeat center center;
        background-size: 100% 100%; 
        // padding: 0 20px; // 添加内边距，避免文字太靠近边缘
    }
    
    .top-center-item-right {
        background: url('../../screen/images/dataScreen-header-btn-bg-r.png') no-repeat center center;
        background-size: cover; // 确保背景图完整显示
    }

    .top-right {
        flex: 1;
        height: 40px;
        background: url('../../screen/images/dataScreen-header-right-bg.png') no-repeat center center;
        background-size: cover; // 确保背景图完整显示
        display: flex;
        align-items: center; // 垂直居中对齐
        justify-content: flex-end; // 右对齐
        padding-right: 20px; // 添加内边距
    }
}
</style>