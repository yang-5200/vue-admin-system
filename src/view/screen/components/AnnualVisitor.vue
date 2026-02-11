<template>
    <div class="diagram-container">
        <div class="diagram-header">
            <div class="diagram-header-title">
                年度游客对比
            </div>
            <div class="diagram-header-picture">
                <img src="../images/dataScreen-title.png" alt="title" width="100px" height="30px">
            </div>
        </div>
        <div class="diagram-content" ref="chartRef">

        </div>
    </div>
</template>


<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()

onMounted(() => {
    const chart = echarts.init(chartRef.value)
    chart.setOption({

        xAxis: {
            type: 'category',
            axisLabel: {
                color: 'white'
            },
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        },
        yAxis: {

            show: true,
            type: 'value',
            axisLabel: {
                color: 'white'
            },
            name: '游客数量',
            // 轴名称位置
            nameLocation: 'end',
            axisLine: {
                // 轴线是否显示
                show: true,
                lineStyle: {
                    color: 'white'
                }
            },
            splitLine: {
                show: false
            }

        },
        legend: {
            top: '10%',
            right: '5%',
            data: ['2023', '2024', '2025'],

        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',

            containLabel: true
        },
        series: [{
            name: '2023',
            data: [100, 200, 300, 400, 500, 45, 454, 4, 412, 44, 77, 500],
            type: 'line',
            smooth: true,
            color: 'rgb(251, 177, 30)'
        }, {
            name: '2024',
            data: [10, 50, 500, 400, 400, 45, 45, 465, 410, 200, 77, 500],
            type: 'line',
            smooth: true,
            color: 'rgb(24, 115, 232)'
        }, {
            name: '2025',
            data: [10, 50, 100, 200, 300, 45, 454, 4, 412, 44, 77, 500],
            type: 'line',
            smooth: true,
            color: 'rgb(251, 107, 156)'
        },
        ]
    })
})
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





}
</style>