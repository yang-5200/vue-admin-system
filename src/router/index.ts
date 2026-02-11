// 通过路由配置实现路由跳转
import { createRouter, createWebHashHistory } from 'vue-router'

// 引入路由配置
import { constantRoutes } from './routes'

// 创建路由实例
const router = createRouter({
   // 路由模式 hash
   history:createWebHashHistory(),
   // 路由配置
   routes:constantRoutes,
   //滚动行为
   scrollBehavior(){
    return {
        top:0,
        left:0
    }
   }
})

// 引入
// import { useUserStore } from "@/store/modules/user";
// import {ElMessage} from 'element-plus'
// router.beforeEach((to,from,next)=>{
    
//     // 1. 登录页直接放行
//     if(to.path === '/login'){
//         next()
//         return
//     }
//     // 2. 其他页面判断是否有token
//     const userStore = useUserStore()
//     const token = userStore.token
//     if(token){
//         // 2.1 有token，放行
//         next()
//     }else{
//         // 2.2 无token，跳转登录页
//         ElMessage({
//             type:'warning',
//             message:'请先登录',
//         })
//         next('/login')
//     }
// })





// 导出路由实例
export default router