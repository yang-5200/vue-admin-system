<template>
    <el-card style="margin-top: 20px ;">
        <el-dialog v-model="dialogVisible">
            <el-image :src="dialogImageUrl" style="width: 100%;" />
        </el-dialog>
        <el-button type="primary" size="default" @click="handleAddSku">添加SKU</el-button>
        <div style="margin: 20px 0;">
            <el-table :data="tableData" style="width:90%; margin: 0 auto;" border>
                <el-table-column label="序号" type="index" width="80"></el-table-column>
                <el-table-column label="名称" prop="skuName" width="120"></el-table-column>
                <el-table-column label="描述" prop="skuDesc" width="200"></el-table-column>
                <el-table-column label="默认图片" width="120">
                    <template #default="scope" align="center">
                        <el-image :src="scope.row.skuDefaultImg" fit="fill"
                            :preview-src-list="[scope.row.skuDefaultImage]" />
                    </template>
                </el-table-column>
                <el-table-column label="重量" prop="weight" width="80"></el-table-column>
                <el-table-column label="价格" prop="price" width="80"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="success" size="default" v-if="scope.row.isSale === 0"
                            @click="handleOnSale(scope.row)">上架</el-button>
                        <el-button type="warning" size="default" v-else
                            @click="handleCancelSale(scope.row)">下架</el-button>
                        <el-button type="primary" size="default" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="info" size="default" @click="handleView(scope.row)">查看</el-button>
                        <el-button type="danger" size="default" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <!-- 
        size: 分页组件的尺寸
         -->
        <div class="paging">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                :size="size" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </el-card>

    <!-- 添加SKU弹窗 -->
    <el-dialog title="添加SKU" v-model="addSkuDialog" width="50%">
        <el-form :model="Dialogform" :rules="rules" ref="formRef" label-width="120px">
            <!-- 名称 -->
            <el-form-item label="名称" prop="skuName">
                <el-input v-model="Dialogform.skuName" placeholder="请输入SKU名称" />
            </el-form-item>
            <!-- 描述 -->
            <el-form-item label="描述" prop="skuDesc">
                <el-input v-model="Dialogform.skuDesc" placeholder="请输入SKU描述" />
            </el-form-item>
            <!-- 默认图片 -->
            <el-form-item label="默认图片" prop="skuDefaultImg">
                <el-upload class="avatar-uploader" action="api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" v-model:file-list="Dialogform.skuDefaultImg">
                </el-upload>
            </el-form-item>
            <!-- 重量 -->
            <el-form-item label="重量" prop="weight">
                <el-input v-model="Dialogform.weight" placeholder="请输入SKU重量" />
            </el-form-item>
            <!-- 价格 -->
            <el-form-item label="价格" prop="price">
                <el-input v-model="Dialogform.price" placeholder="请输入SKU价格" />
            </el-form-item>
        </el-form>

        <!-- 确认按钮 -->
        <template #footer>
            <el-button type="danger" @click="addSkuDialog = false">取消</el-button>
            <el-button type="primary" @click="handleAddSkuConfirm">确认</el-button>
        </template>
    </el-dialog>

</template>

<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue'
import { getListApi, onSaleApi, cancelSaleApi, saveSkuInfoApi, getSkuInfoApi, deleteSkuApi } from '@/api/product/sku'
import type { SkuInfo } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'

// 表格数据
const tableData = ref<SkuInfo[]>([])

// 分页相关
const currentPage = ref(1)   // 当前页码
const pageSize = ref(3)         // 每页显示条数
const size = ref('small')      // 分页组件的尺寸
const background = ref(true)   // 是否显示背景
const total = ref(0)           // 总条数

// 分页相关方法
const handleSizeChange = (val: number) => {
    pageSize.value = val
    getList()
}
const handleCurrentChange = (val: number) => {
    currentPage.value = val
}
// 获取分页数据
const getList = async () => {
    const res = await getListApi(currentPage.value, pageSize.value)
    if (res.code === 200) {
        console.log(res)
        tableData.value = res.data.records
        total.value = res.data.total
    }
}

// 组件挂载时获取分页数据
onMounted(() => {
    getList()
})

const addSkuDialog = ref(false)
// // 图片上传列表
// const spuImageList = ref<any[]>([])
// 表单数据
const Dialogform = reactive({
    skuName: '',
    skuDesc: '',
    skuDefaultImg: '',
    weight: "0",
    price: "0",
    // 必填字段（根据类型定义）
    category3Id: "0",
    spuId: 0,
    tmId: "0",
    id: 0,
    isSale: 0, // 是否上架 - 数字类型
    // 数组字段
    skuImageList: [], // SKU图片列表
    skuAttrValueList: [], // SKU属性值列表
    skuSaleAttrValueList: [] // SKU销售属性值列表
})
// 表单校验规则
const rules = ref({
    skuName: [{ required: true, message: '请输入SKU名称', trigger: 'blur' }],
    skuDesc: [{ required: true, message: '请输入SKU描述', trigger: 'blur' }],
    skuDefaultImg: [{ required: true, message: '请输入SKU默认图片', trigger: 'blur' }],
    weight: [{ required: true, message: '请输入SKU重量', trigger: 'blur' }],
    price: [{ required: true, message: '请输入SKU价格', trigger: 'blur' }],
})
// 打开添加SKU弹窗
const handleAddSku = () => {
    addSkuDialog.value = true
}
// 图片预览对话框
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
// 图片预览处理
const handlePictureCardPreview = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

// 确认添加SKU
const formRef = ref<any>()
const handleAddSkuConfirm = async () => {
    console.log('添加SKU')
    // 校验表单
    const valid = await formRef.value.validate()
    if (!valid) {
        return
    }
    // 提交表单数据
    const res: any = await saveSkuInfoApi(Dialogform)
    if (res.code === 200) {
        ElMessage.success('添加成功')
        getList()
        addSkuDialog.value = false
    }
}



// 按钮点击事件处理函数
const handleOnSale = async (row: any) => {
    console.log('上架操作:', row)
    const res: any = await onSaleApi(row.id)
    if (res.code === 200) {
        ElMessage.success('上架成功')
        getList()
    }
}

const handleCancelSale = async (row: any) => {
    console.log('下架操作:', row)
    const res: any = await cancelSaleApi(row.id)
    if (res.code === 200) {
        ElMessage.success('下架成功')
        getList()
    }
}

const handleEdit = async (row: any) => {
    console.log('编辑操作:', row)
    const res: any = await getSkuInfoApi(row.id)
    if (res.code === 200) {
        console.log(res)
    }
}

const handleView = (row: any) => {
    console.log('查看操作:', row)
}

const handleDelete = async (row: any) => {
    console.log('删除操作:', row)
    const res: any = await deleteSkuApi(row.id)
    if (res.code === 200) {
        ElMessage.success('删除成功')
        getList()
    }
}

</script>

<style scoped lang='scss'></style>