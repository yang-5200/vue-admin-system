<template>
    <div class="diagram-container">
        <div class="diagram-header">
            <div class="diagram-header-title">
                年龄比例
            </div>
            <div class="diagram-header-picture">
                <img src="../images/dataScreen-title.png" alt="title" width="100px" height="30px">
            </div>
        </div>
        <div class="diagram-content">
            <!-- 图形图标容器 -->
            <div class="chart" ref="chartRef">

            </div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

// 图表容器引用
const chartRef = ref()

onMounted(() => {
    // 初始化图表
    const chart = echarts.init(chartRef.value)
    // 配置图表选项
    let option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            right: 25,
            top: 30,
            orient: 'vertical',
           textStyle: {
                color: '#fff',
                fontSize: 14
           }
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                // 半径范围
                radius: ['40%', '70%'],
                // 中心位置
                center: ['35%', '50%'],
                
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    // 边框颜色
                    borderColor: '#fff',
                    borderWidth: 2
                },
                // 标签样式
                label: {
                    color: '#fff',
                    // 标签是否显示
                    show: true, 
                    position: 'inside'
                },
                
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                },
                // 标签线样式
                labelLine: {
                    show: false
                },
                color: ['#f2bf54', '#da6e16', '#167d88', '#ff6666', '#8c73c3'],
                data: [
                    { value: 1048, name: '10岁以下' },
                    { value: 735, name: '20岁以下' },
                    { value: 580, name: '30岁以下' },
                    { value: 484, name: '40岁以下' },
                    { value: 300, name: '50岁以下' }
                ],
                grid: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,

                }
            }
        ]
    };
    // 使用配置项显示图表
    chart.setOption(option)
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

.chart {
    width: 100%;
    height: 200px;
    margin-top: 50px;
   
}
</style>