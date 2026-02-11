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
                
           </div>
        </div>
</template>
   
               
<script setup lang='ts'>

</script>
    
<style scoped lang="scss">
    .diagram-container{
        width: 100%;
        height: 300px;
        
        margin-bottom: 20px;
        position: relative;
        .diagram-header{
                width:150px;
                height: 50px;
                
                line-height: 50px;
                font-size: 16px;
                
                color: white;
                display: flex;
                flex-direction: column;
                .diagram-header-title{
                        width:150px;
                        height:15px;
                        margin-top: -10px;
                }
                .diagram-header-picture{
                        width: 60px;
                        height: 10px;
                        margin-top: 25px;
                       
                }
        }
    }

    .diagram-header-picture img{
        width: 60px;
        height: 10px;
    }
    .diagram-content{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 270px;
        background: url('../images/dataScreen-main-lb.png') no-repeat center center;
        background-size: cover;
        display: flex;
        flex-direction: column;  // 垂直方向布局

        color: #fff;
        font-size: 16px;
       
        
        
        
        
    }
</style>