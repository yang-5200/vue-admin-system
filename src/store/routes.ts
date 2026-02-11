// 路由仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { constantRoutes } from '@/router/routes'

export const useRoutesStore = defineStore('routes', () => {
    const routes = ref(constantRoutes)
    return { routes }
})