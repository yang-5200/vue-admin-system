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
            <div ref="chartRef" style="width: 100%; height: 400px"></div>
        </div>
    </div>
</template>


<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement>()


onMounted(() => {
    const myChart = echarts.init(chartRef.value)
    myChart.setOption({
        title: {
            text: '未来30天游客预计人数',
            textStyle: {
                color: '#fff',
                fontSize: 16
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['第1天', '第2天', '第3天', '第4天', '第5天', '第6天', '第7天', '第8天', '第9天', '第10天', '第11天', '第12天', '第13天', '第14天', '第15天', '第16天', '第17天', '第18天', '第19天', '第20天', '第21天', '第22天', '第23天', '第24天', '第25天', '第26天', '第27天', '第28天', '第29天', '第30天'],
            axisLabel: {
                color: '#fff',
                fontSize: 10,
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: '人数',
            nameTextStyle: {
                color: '#fff'
            },
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        },
        series: [
            {
                name: '游客人数',
                type: 'line',
                data: [3280, 2450, 3890, 2150, 3560, 1920, 4120, 2680, 3450, 1890, 3980, 2250, 3620, 1580, 4250, 2780, 3320, 2050, 3850, 2480, 3680, 1720, 3950, 2850, 3180, 2350, 4080, 2620, 3750, 1980],
                smooth: true,
                lineStyle: {
                    color: '#00d4ff',
                    width: 3
                },
                itemStyle: {
                    color: '#00d4ff'
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(0, 212, 255, 0.3)'
                        }, {
                            offset: 1, color: 'rgba(0, 212, 255, 0.05)'
                        }]
                    }
                }
            }
        ]
    })

})


</script>

<style scoped lang="scss">
.diagram-container {
    width: 80%;
    height: 300px;
    margin: 0 auto;
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