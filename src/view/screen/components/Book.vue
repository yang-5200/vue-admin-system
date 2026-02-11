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
        legend: {
            top: 'center',
            left: '10',
            orient: 'vertical',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip: {
            trigger: 'item'
        },
        toolbox: {
            show: true,
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        series: [
            {
                name: '游客来源',
                type: 'pie',
                radius: [20, 50],
                center: ['59%', '50%'],
                itemStyle: {
                    borderRadius: 8
                },

                data: [
                    { value: 400, name: '智慧文旅平台' },
                    { value: 380, name: '飞猪' },
                    { value: 320, name: '平台2 ' },
                    { value: 300, name: ' 平台3' },
                    { value: 280, name: '平台4' },

                ]
            }
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