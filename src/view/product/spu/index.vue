<template>
    <div>
        <!-- 三级分类 -->
        <Category :scene=scene></Category>
    </div>
    <div v-show="scene === '0'">
        <el-card style="margin-top: 20px; ">
            <!-- SPU 相关操作按钮 -->
            <el-button type="primary" class="add-btn" @click="addSPU">添加SPU</el-button>
            <!-- 表格组件 -->
            <el-table :data="tableData" style="width: 100%" border>
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="spuName" label="SPU名称" width="180"></el-table-column>
                <el-table-column prop="description" label="spu描述"></el-table-column>
                <el-table-column label="操作" width="450">
                    <template #default="scope">
                        <el-button type="primary" class="add2-btn" @click="addSKU(scope.row)">添加SKU</el-button>
                        <el-button type="primary" class="edit-btn" @click="editSPU(scope.row)">编辑</el-button>
                        <el-button type="primary" class="detail-btn" @click="detailSPU(scope.row)">详情</el-button>
                        <el-button type="primary" class="delete-btn" @click="deleteSPU(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="total" v-model:page-size="pageSize"
                :page-sizes="[3, 5, 7, 9]" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        </el-card>
    </div>

    <!-- spu 相关 -->
    <div v-show="scene === '1'">
        <SpuForm @goBack="changeScene" ref="spuFormRef"></SpuForm>
    </div>
    <!-- sku 相关 -->
    <div v-show="scene === '2'">
        <SkuForm></SkuForm>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch, nextTick } from 'vue'
import SpuForm from '@/view/product/spu/SpuForm.vue'
import SkuForm from '@/view/product/spu/SkuForm.vue'
import Category from '@/components/Category.vue'
import { reqSpuList } from '@/api/product/spu'
import { useCategoryStore } from '@/store/modules/category'

const scene = ref('0')  // 场景值，0：SPU，1：SKU    并且是字符串
// 场景切换
const changeScene = (newScene: string) => {
    scene.value = newScene
}

const categoryStore = useCategoryStore() // 三级分类store

// 表格数据
const tableData = ref([])

// 分页参数
const total = ref(0)  // 总条数
const pageSize = ref(3)  // 每页条数
const currentPage = ref(1)  // 当前页码

// 监听三级分类变化
watch(
    () => categoryStore.category3Id,
    () => {
        if (!categoryStore.category3Id) {  // 三级分类为空时，不调用接口
            return
        }
        getSpuList()
    }
)
// 获取SPU列表
const getSpuList = async () => {
    const res = await reqSpuList(currentPage.value, pageSize.value, categoryStore.category3Id)
    if (res.code === 200) {
        console.log(res.data)
        tableData.value = res.data.records
        total.value = res.data.total
    }
}

// 组件挂载时获取SPU列表
onMounted(() => {
    getSpuList()
})

// 添加SPU
const addSPU = () => {
    // 清空表单数据
    scene.value = '1'
    if (spuFormRef.value) {   // 调用获取SPU表单数据方法
        spuFormRef.value.initaddSpu(categoryStore.category3Id)
    }
}
// 分页大小改变时触发
const handleSizeChange = (val: number) => {
    pageSize.value = val
    getSpuList()
}
// 分页页码改变时触发
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    getSpuList()
}

// 添加SKU
const addSKU = (spu: any) => {
    // 清空表单数据
    scene.value = '2'
}
// 编辑SPU
const spuFormRef = ref<any>(null)
const editSPU = async (spu: any) => {
    console.log('编辑SPU', spu)
    // 切换场景为1，获取SPU参数
    changeScene('1')
    await nextTick() // 等待场景切换完成
    // 调用获取SPU参数方法
    if (spuFormRef.value) {
        spuFormRef.value.getSpuParams(spu)
    }
}
// 详情SPU
const detailSPU = (spu: any) => {
    console.log('详情SPU', spu)
}
// 删除SPU
const deleteSPU = (spu: any) => {
    console.log('删除SPU', spu)
}
</script>

<style scoped lang="scss">
.add-btn {
    background-color: #409eff;
    color: #fff;
    width: 100px;
    margin-bottom: 20px;
}

.el-pagination {
    margin-top: 20px;
}

.add2-btn {
    background-color: #409eff;
    color: #fff;
    width: 80px;

}

.edit-btn {
    background-color: #e6a23c;
    color: #fff;
    width: 80px;

}

.detail-btn {
    background-color: #8f9399;
    color: #fff;
    width: 80px;

}

.delete-btn {
    background-color: #f56c6c;
    color: #fff;
    width: 80px;

}
</style>