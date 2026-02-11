<template>
    <div class="diagram-container">
        <div class="diagram-header">
            <div class="diagram-header-title">
                热门景区排行
            </div>
            <div class="diagram-header-picture">
                <img src="../images/dataScreen-title.png" alt="title" width="100px" height="30px">
            </div>
        </div>
        <div class="diagram-content " ref="chart">

        </div>
    </div>
</template>


<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts';

const chart = ref<HTMLDivElement>()

onMounted(() => {
    // 初始化图表
    const myChart = echarts.init(chart.value);
    // 声明颜色数组
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    //
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // legend: {},
        xAxis: {
            type: 'value',
            // inverse: true,
            boundaryGap: [0, 0.01],
            position: 'top',
            show: false,


            axisLine: {
                show: false
            },
            axisTick: {
                show: false,
                interval: 'auto'
            },
            nameTextStyle: {
                fontSize: 14,
                color: 'orange'
            }
        },
        yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
                color: 'rgb(213, 165, 101)'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: ['峨眉山', '印度尼西亚', '九寨沟', '景区1', '景区2']
        },
        {

            type: 'category',
            axisLabel: {
                color: 'rgb(213, 165, 101)'
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: ['N0.1', 'N0.2', 'N0.3', 'N0.4', 'N0.5']
        },

        ],
        series: [
            {
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: [100, 40, 9, 20, 10],
                // 修改第一组柱子的圆角
                itemStyle: {
                    borderRadius: 10,
                    // 2. 给 itemStyle  里面的color 属性设置一个 返回值函数                   
                    color: function (params: any) {
                        console.log(params);
                        return myColor[params.dataIndex];
                    }
                },
                // 柱子之间的间距
                barCategoryGap: 50,
                barWidth: 10,
                label: {
                    show: true,
                    // 图形内显示
                    position: "inside",
                    // 文字的显示格式
                    formatter: "{c}%",
                    fontSize: 14,
                    color: 'white'
                },

            },
            {
                name: "框",
                type: "bar",
                yAxisIndex: 1,
                // 框的柱子之间的间距
                barCategoryGap: 60,
                barWidth: 15,
                itemStyle: {
                    color: "none",
                    borderColor: "#00c1de",
                    borderWidth: 3,
                    borderRadius: 15
                },
                data: [100, 100, 100, 100, 100]
            }
        ],
        grid: {
            left: '5%',
            right: '5%',
            bottom: '9%',
            containLabel: true
        }

    };

    // 使用配置项和数据显示图表

    myChart.setOption(option);
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