<template>
    <Category :scene="scene"></Category>
    <!-- 属性管理 -->
    <div v-show="scene === '0'">
        <el-card>
            <el-button type="primary" style="margin-bottom: 10px;" icon="Plus" class="add-btn"
                @click="handleAdd">添加属性</el-button>
            <el-table border style="width: 100%" :data="attrList">
                <el-table-column type="index" label="序号" width="180"></el-table-column>
                <el-table-column label="属性名称" width="200" prop="attrName">

                </el-table-column>
                <el-table-column label="属性值名称">
                    <template #default="scope">
                        <el-tag v-for="item in scope.row.attrValueList" :key="item.attrValueId" style="margin: 5px;">
                            {{ item.valueName }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button type="primary" size="small" icon="Edit" class="edit-btn">编辑</el-button>
                        <el-button type="danger" size="small" icon="Delete" class="delete-btn">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
    </div>
    <div v-show="scene === '1'">
        <el-card>
            <el-form>
                <el-form-item label="属性名称" prop="attrName" style="width: 400px;">
                    <el-input placeholder="请输入属性名称" v-model="attrValueList.attrName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="confirm-btn" @click="handleAddAttrValue">添加属性值</el-button>
                    <el-button type="danger" class="reset-btn">重置</el-button>
                </el-form-item>
            </el-form>
            <!-- 表单 -->
            <el-table border style="margin-bottom: 20px;" :data="attrValueList.valueNameList">
                <el-table-column label="序号" type="index" width="180"></el-table-column>
                <el-table-column label="属性值" prop="valueName">
                    <template #default="scope">
                        <el-input placeholder="请输入属性值" v-model="scope.row.valueName">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="操作"></el-table-column>
            </el-table>
            <el-button type="primary" class="confirm-btn" @click="Save">保存</el-button>
            <el-button type="danger" class="reset-btn" @click="Cancel">取消</el-button>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus'
//     导入分类category组件
import Category from '@/components/Category.vue'
import { ref, reactive, onMounted, watch } from 'vue'
import { useCategoryStore } from '@/store/modules/category'
import { reqAttrList, reqSaveAttrInfo } from '@/api/product/attr'
import type { AttrObj } from '@/api/product/attr/type'
const categoryStore = useCategoryStore()



// 监听三级分类变化
watch(() => categoryStore.category3Id, () => {
    getAttrList()
})
onMounted(() => {
    getAttrList()
})

// 定义List表格数据
let attrList = ref<AttrObj[]>([])
// 调用属性列表接口
const getAttrList = async () => {
    const res = await reqAttrList(Number(categoryStore.category1Id), Number(categoryStore.category2Id), Number(categoryStore.category3Id))
    console.log("属性列表", res)
    attrList.value = res.data || []
}

// 点击添加属性
const scene = ref('0')
const handleAdd = () => {
    scene.value = '1'
}



// 添加属性后的东西

// 添加属性值
const attrValueList = reactive({
    attrName: '',
    valueNameList: [{}],
    categoryId: '',
    categoryLevel: 3
})

// 处理添加属性值
const handleAddAttrValue = () => {
    attrValueList.valueNameList.push({
        valueName: ''
    })
}
const Save = async () => {
    attrValueList.categoryId = categoryStore.category3Id
    const res = await reqSaveAttrInfo(attrValueList)
    if (res.code === 200) {
        ElMessage.success('添加属性值成功')
        scene.value = '0'
        getAttrList()
    }
}
// 取消添加属性值
const Cancel = () => {
    scene.value = '0'
}
</script>

<style scoped>
.el-card {
    margin-top: 20px;

    .add-btn {
        width: 100px;
        background-color: #9fbddb;
        color: #fff;
    }

    .el-table {
        margin-top: 20px;

    }
}

.edit-btn {
    width: 80px;
    background-color: #9fbddb;
    color: #fff;
}

.delete-btn {
    width: 80px;
    background-color: #e56c6c;
    color: #fff;
}

.confirm-btn {
    width: 80px;
    background-color: #9fbddb;
    color: #fff;
}

.reset-btn {
    width: 80px;
    background-color: #e56c6c;
    color: #fff;
}
</style>