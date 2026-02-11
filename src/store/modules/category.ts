// 定义一个分类的仓库
import { defineStore } from 'pinia'
import { reqCategory1, reqCategory2, reqCategory3 } from '@/api/product/attr'
import type { CategoryObj } from '@/api/product/attr/type'

import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
    // id 和 List
    const category1Id = ref('')
    const category1List = ref<CategoryObj[]>([])
    // 二级分类id
    const category2Id = ref('')
    // 二级分类列表
    const category2List = ref<CategoryObj[]>([])
    // 三级分类id
    const category3Id = ref('')
    // 三级分类列表
    const category3List = ref<CategoryObj[]>([])

    // 一级分类接口
    const getCategory1 = async () => {
        const res = await reqCategory1()
        if (res.code === 200) {
            category1List.value = res.data || []
        }
    }
    // 二级分类接口
    const getCategory2 = async (id: number) => {
        const res = await reqCategory2(id)
        if (res.code === 200) {
            category2List.value = res.data || []
        }
    }
    // 三级分类接口
    const getCategory3 = async (id: number) => {
        const res = await reqCategory3(id)
        if (res.code === 200) {
            category3List.value = res.data || []
        }
    }

    return {
        category1Id,
        category1List,
        category2Id,
        category2List,
        category3Id,
        category3List,
        getCategory1,
        getCategory2,
        getCategory3,
    }
})