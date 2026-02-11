<template>
        <div class="diagram-container">
           <div class="diagram-header">
                <div class="diagram-header-title">
                    实时游客统计
                </div>
                <div class="diagram-header-picture">
                   <img src="../images/dataScreen-title.png" alt="title" width="100px" height="30px">
                </div>
           </div>
           <div class="diagram-content">
                <div class="diagram-content-number">
                    <span>可预约人数：{{reserveNum}}</span>
                </div>
                <div class="diagram-content-desc">
                    <span v-for="(item,index) in bookedNum" :key="index">{{item}}</span>
                </div>
                <div class="diagram-content-char">
                        <div class="water-ball" ref="waterBallRef"></div>
                </div>
           </div>
        </div>
</template>
<script setup lang='ts'>

import { ref, onMounted } from 'vue';
// 可预约人数
const reserveNum = ref(999999);
// 已预约人数
const bookedNum = ref("123456789人");

// 引入echarts
import * as echarts from 'echarts';
import 'echarts-liquidfill'
// 获取节点
const waterBallRef = ref();

onMounted(() => {
    // 获取水球图表实例
    let waterBallChart = echarts.init(waterBallRef.value);
    // 配置水球图表
    waterBallChart.setOption({
        // 水球图标题
        title: {
            text: '预测量'
        },
        // x\y轴
        xAxis: {
            show: false
        },
        yAxis: {
            show: false
        },
        series: [{
            type: 'liquidFill',
            data: [0.6, 0.4, 0.3],
            waveAnimation: true,
            color: ['rgb(28, 170, 193)'],
            itemStyle: {
                opacity: 0.6,
                shadowBlur: 0
            },
            emphasis: {
                itemStyle: {
                    opacity: 0.9
                }
            },
            // 水球图文字
            label: {
                show: false,

            },
            // 水球图边框
            outline: {
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'none',
                    borderColor: '#00eaff',
                    borderWidth: 5,
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 234, 255, 0.5)'
                }
            },
            radius: '95%',

        }],

    });
});

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
    flex-direction: column; // 垂直方向布局

    color: #fff;
    font-size: 16px;

    .diagram-content-number {
        margin-top: 20px;
        margin-left: 250px;
        font-size: 12px;
    }

    .diagram-content-desc {
        margin: 15px auto;
        width: 95%;

        font-size: 24px;
        display: flex;
        flex-direction: row; // 水平方向布局

        span {
            flex: 1;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: url('../images/total.png') no-repeat center center;
            background-size: cover;
        }
    }

    .diagram-content-char {
        margin: 17px auto;
        width: 80%;
        height: 200px;



    }

    .water-ball {
        width: 100%;
        height: 100%;

    }

}
</style>