<template>
    <div class="layout_tabbar">
        <div class="tabbar_left">
            <!--  顶部左侧静态 -->
            <el-icon style="margin-right: 10px; cursor: pointer;">
                <Expand v-if="!isShow"></Expand>
                <Fold v-else></Fold>

            </el-icon>
            <!-- 左侧面包屑 -->
            <el-breadcrumb separator=">">
                <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path">
                    {{ item.meta.title }}
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>


        <div class="tabbar_right">
            <!-- 右侧操作 -->
            <el-button type="primary" size="default" icon="Refresh" circle></el-button>
            <el-button type="primary" size="default" icon="FullScreen" circle></el-button>
            <el-button type="primary" size="default" icon="Setting" circle style="margin-right: 10px;"></el-button>
            <img :src="userStore.avatar" alt=""
                style="width: 20px; height: 20px; border-radius: 50%; margin-right: 10px;">

            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el_dropdown_link">
                    {{ userStore.name }}
                    <el-icon class="el-icon--right">
                        <ArrowDown />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>

                    </el-dropdown-menu>
                </template>
            </el-dropdown>



        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue'
import { Expand, ArrowDown, Fold } from '@element-plus/icons-vue'

import router from '@/router'
// 引入用户模块仓库
import { useUserStore } from '@/store/modules/user'
// 退出功能
const handleLogout = () => {
    // 调用用户模块仓库的退出登录方法
    useUserStore().clearUser() // 清pinia+本地
    // 跳转登录页
    router.push('/login')
}


// 顶部导航栏是否折叠状态
let isShow = ref(true)

// 切换折叠状态并发送事件


//3.头像 和 用户名
const userStore = useUserStore()
// const avatar=userStore.userInfo.avatar || '@/assets/images/logo.png'
// const username=userStore.userInfo.name || '用户'

</script>

<style scoped lang='scss'>
.layout_tabbar {
    position: fixed;
    top: 0;
    left: $layout_silder_width;
    width: calc(100% - $layout_silder_width);
    height: $layout_tabbar_height;
    background-color: $layout_tabbar_bg_color;
    display: flex;
    justify-content: space-between; // 左右间距
    // transition: left 0.3s ease-in-out, width 0.3s ease-in-out;// 顶部导航栏位置和宽度变化动画



    .tabbar_left {
        display: flex;
        align-items: center;

    }

    .tabbar_right {
        display: flex;
        align-items: center; // 垂直居中
    }

}
</style>