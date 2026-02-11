<template>
    <el-card>
        <el-form :inline="true" class="category-form">
            <el-form-item label="一级分类">
                <el-select :disabled="props.scene === '0' ? false : true" placeholder="请选择"
                    v-model="categoryStore.category1Id" @change="handleChange1">
                    <el-option v-for="(item, index) in categoryStore.category1List" :key="item.id" :label="item.name"
                        :value="item.id">
                    </el-option>

                </el-select>
            </el-form-item>

            <el-form-item label="二级分类">
                <el-select :disabled="props.scene === '0' ? false : true" placeholder="请选择"
                    v-model="categoryStore.category2Id" @change="handleChange2">
                    <el-option v-for="(item, index) in categoryStore.category2List" :key="item.id" :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="三级分类">
                <el-select :disabled="props.scene === '0' ? false : true" placeholder="请选择"
                    v-model="categoryStore.category3Id">
                    <el-option v-for="(item, index) in categoryStore.category3List" :key="item.id" :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue'
import { useCategoryStore } from '@/store/modules/category'

const categoryStore = useCategoryStore()

// 接收场景参数
const props = defineProps({
    scene: {
        type: String,
        default: '0'
    }
})

// 处理一级分类变化
const handleChange1 = (val: number) => {
    // 一级分类变化时，二级分类和三级分类清空
    categoryStore.category2Id = ''
    categoryStore.category3Id = ''
    categoryStore.category3List = []
    // 调用二级分类接口
    categoryStore.getCategory2(val)
}

// 处理二级分类变化
const handleChange2 = (val: number) => {
    // 二级分类变化时，三级分类清空
    categoryStore.category3Id = ''
    categoryStore.category3List = []
    // 调用三级分类接口
    categoryStore.getCategory3(val)
}

// 调用一级分类接口
onMounted(() => {
    categoryStore.getCategory1()
})

// 监听一级分类变化
watch(() => categoryStore.category1Id, () => {
    if (categoryStore.category1Id) {
        categoryStore.getCategory2(categoryStore.category1Id)
    }
})

// 监听二级分类变化
watch(() => categoryStore.category2Id, () => {
    if (categoryStore.category2Id) {
        categoryStore.getCategory3(categoryStore.category2Id)
    }
})



</script>

<style scoped>
.category-form {
    .el-form-item {
        width: 30%;
    }
}
</style>
