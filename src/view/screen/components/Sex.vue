<template>
    <div class="diagram-container">
        <div class="diagram-header">
            <div class="diagram-header-title">
                男女比例
            </div>
            <div class="diagram-header-picture">
                <img src="../images/dataScreen-title.png" alt="title" width="100px" height="30px">
            </div>
        </div>
        <div class="diagram-content">
            <div class="man">
               <p class="man-label">男士</p>
                <img src="../images/man.png" alt="">
            </div>
            <div class="woman">
               <p class="woman-label">女士</p>
                <img src="../images/woman.png" alt="">
            </div>
        </div>
        
        <div class="progress-container">
            <!-- 进度条上方的百分比标签 -->
            <div class="progress-labels">
                <span class="man-label">男士：{{ manpercent }}%</span>
                <span class="woman-label">女士：{{ womanpercent }}%</span>
            </div>
            <!-- 进度条 -->
            <div class="progress">
                <div class="man-progress" :style="{width: manpercent + '%'}"></div>
                <div class="woman-progress" :style="{width: womanpercent + '%'}"></div>
            </div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { ref } from 'vue'
let manpercent = ref(70)
let womanpercent = ref(30)
</script>

<style scoped lang="scss">
.diagram-container {
    width: 100%;
    height: 300px;

    margin-bottom: 20px;
    position: relative;

    .diagram-header {
        width: 150px;
        height: 50px;

        line-height: 50px;
        font-size: 16px;

        color: white;
        display: flex;
        flex-direction: column;

        .diagram-header-title {
            width: 150px;
            height: 15px;
            margin-top: -10px;
        }

        .diagram-header-picture {
            width: 60px;
            height: 10px;
            margin-top: 25px;

        }
    }
}

.diagram-header-picture img {
    width: 60px;
    height: 10px;
}

.diagram-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 270px;
    background: url('../images/dataScreen-main-lb.png') no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: row; // 水平方向布局
    justify-content: center;
    align-items: center;

    .man {
        width: 100px;
        height: 110px;
        margin-right: 20px;
        background: url('../images/man-bg.png') no-repeat center center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .woman {
        width: 100px;
        height: 110px;
        margin-left: 20px;
        background: url('../images/woman-bg.png') no-repeat top center;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 50px;
        height: 50px;
    }

    p {
        width: 50px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        margin-top: -42px;
    }




}


.progress-container {
    width: 80%;
    position: absolute;
    bottom: 70px;
    left: 10%;
}

.progress-labels {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
}

.man-label {
    color: rgb(0, 119, 255);
}

.woman-label {
    color: rgb(255, 93, 109);
}

.progress {
    height: 20px;
    border-radius: 10px;
    display: flex;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.1);
}

.man-progress {
    background-color: rgb(0, 119, 255);
    height: 100%;
    border-radius: 10px 0 0 10px;
    transition: width 0.5s ease;
}

.woman-progress {
    background-color: rgb(255, 93, 109);
    height: 100%;
    border-radius: 0 10px 10px 0;
    transition: width 0.5s ease;
}

</style>