<template>
    <el-scrollbar height="calc(100vh -40px)">
         <el-menu background-color="#1e97e3d7" text-color="#fff" active-text-color="#fff" 
  
  :default-active="activeIndex"
  :collapse="isCollapse"
  class="el-menu-vertical-demo"
  >
    <template v-for="(item,index) in menuList" :key="index">

    
        <!-- 1.没有子路由 -->
        <template v-if="!item.children" >
          <el-menu-item :index="item.path" v-if="!item.meta.hidden"  @click="goRoute">
             <template #title>
                
                 <el-icon  >
                  <component :is="item.meta.icon" />                  
                 </el-icon>
                 <span>{{ item.meta.title }}</span>
             </template>
          </el-menu-item>
        </template>
        <!-- 2.有子路由但是只有一个子路由 -->
        <template  v-if="item.children && item.children.length === 1">
          <el-menu-item :index="item.children[0]?.path" v-if="!item.children[0]?.meta.hidden" @click="goRoute">
             <template #title>
                 
                 <el-icon  >
                  <component :is="item.children[0]?.meta.icon" />                  
                 </el-icon>
                 <span>{{ item.children[0]?.meta.title }}</span>
             </template>
          </el-menu-item>
        </template>
        <!-- 3.有子路由并且有多个子路由 -->
        
          <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1" >
             <template #title>
                 
                 <el-icon  >
                  <component :is="item.meta.icon" />                  
                 </el-icon>
                 <span>{{ item.meta.title }}</span>
             </template>
             <Menu :menuList="item.children" />
          </el-sub-menu>
        

    </template>

  </el-menu>
    </el-scrollbar>
</template>

<script setup lang='ts'>

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

// 定义路由项的类型接口
export interface RouteItem {
    path: string;
    name?: string;
    meta: {
        title: string;
        hidden?: boolean; // 添加hidden属性控制菜单显示
        icon?: string; // 添加icon属性控制菜单图标

    };
    children?: RouteItem[];
}


// 接收父组件传递的菜单列表
defineProps<{
    menuList: RouteItem[];
}>()

// 定义折叠状态
const isCollapse = ref(false)


// 点击菜单进行跳转
const router = useRouter()
const goRoute = (vc: any) => {
    // console.log(item.index)
    router.push(vc.index)
}
// 定义默认激活项
const activeIndex = ref('')
// 监听路由变化事件
onMounted(() => {
    router.afterEach((to) => {
        // 当路由变化时，更新 activeIndex
        activeIndex.value = to.path
    })
})

</script>
<script lang="ts"  >
  export default {
    name: 'Menu',
  }
</script>


<style scoped>
  /** 菜单右边框 */
  .el-menu {
    border-right: none;
  }
/* 设置菜单项的基础样式 */
:deep(.el-menu-item) {
  padding-left: 20px !important;
  margin-bottom: 2px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

:deep(.el-menu-item:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.el-menu-item.is-active) {
  background-color: rgba(255, 255, 255, 0.2) !important;
}

/* 设置子菜单的样式 */
:deep(.el-sub-menu) {
  margin-bottom: 2px;
}

:deep(.el-sub-menu .el-menu-item) {
  padding-left: 40px !important; /* 二级菜单增加左边距 */
  font-size: 13px;
}

/* 设置子菜单标题的样式 */
:deep(.el-sub-menu__title) {
  padding-left: 20px !important;
  margin-bottom: 2px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

:deep(.el-sub-menu__title:hover) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* 设置图标的样式 */
:deep(.el-icon) {
  margin-right: 8px;
  font-size: 16px;
  vertical-align: middle;
}

/* 设置文字的样式 */
:deep(span) {
  vertical-align: middle;
}


</style> 