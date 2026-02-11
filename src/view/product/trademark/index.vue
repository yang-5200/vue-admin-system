<template>
    <div class="trademark">
        <el-card>
            <el-button type="primary" class="add-btn" @click="handleAdd">添加品牌</el-button>

            <el-table border style="margin-bottom: 10px;" :data="trademarkList">
                <el-table-column label="序号" prop="name" type="index" />
                <el-table-column label="品牌名称" prop="tmName" />
                <el-table-column label="品牌logo">
                    <template #default="scope">
                        <el-image :src="scope.row.logoUrl" fit="contain" style="width: 100px; height: 100px;" />
                    </template>
                </el-table-column>

                <el-table-column label="操作" prop="operation">
                    <template #default="scope">
                        <el-button type="primary" size="default" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="default" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--  分页 -->
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                layout="sizes, prev, pager, next, jumper,->,total" :total="total" :page-sizes="[3, 5, 7, 9]"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />

        </el-card>
        <el-dialog :title="isEditMode ? '编辑品牌' : '添加品牌'" v-model="dialogVisible" width="50%" style="height: 50vh;">
            <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
                <el-form-item label="品牌名称" prop="tmName">
                    <el-input v-model="form.tmName" spellcheck="false" />
                </el-form-item>
                <el-form-item label="品牌logo" prop="logoUrl" style="margin-top: 10px;">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
                <el-button @click="dialogVisible = false">取消</el-button>
            </template>
        </el-dialog>
    </div>

</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
import { reqHasTrademark, reqDeleteTrademark, reqAddTrademark, reqUpdateTrademark } from '@/api/product/trademark'
// 分页
const currentPage = ref(1)
const pageSize = ref(3)
// 总数
const total = ref(0)

const handleSizeChange = (val: number) => {
    console.log(`每页 ${val} 条`)
    // pageSize.value = val
    getTrademarkList()
}
const handleCurrentChange = (val: number) => {
    console.log(`当前页: ${val}`)
    // currentPage.value = val
    getTrademarkList()
}

//  trademark 品牌列表
const trademarkList = ref([])
// 获取品牌列表
const getTrademarkList = async () => {
    const res: any = await reqHasTrademark(currentPage.value, pageSize.value)
    if (res.code === 200) {
        trademarkList.value = res.data.records
        // total.value = res.data.total
        console.log(res.data)
        total.value = res.data.total
    }
}

onMounted(() => {
    getTrademarkList()
})

// 1.对话框是否可见
const dialogVisible = ref(false)
// 2. 是否为编辑模式
const isEditMode = ref(false)
// 表单数据
const form = ref({
    tmName: '',
    logoUrl: ''
})
// 数据的id
const rowid = ref(0)
// 表单验证规则
const rules = ref({
    tmName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
    logoUrl: [{ required: true, message: '请输入品牌logo', trigger: 'blur' }]
})
// 处理添加品牌
const handleAdd = () => {
    dialogVisible.value = true
    // 重置表单数据
    isEditMode.value = false
    form.value = {
        tmName: '',
        logoUrl: ''
    }
}
// 2.处理提交表单
const handleSubmit = async () => {
    // 表单验证
    if (!form.value.tmName.trim()) {
        ElMessage.error('请输入品牌名称')
        return
    }
    if (!form.value.logoUrl) {
        ElMessage.error('请上传品牌logo')
        return
    }

    // 提交表单
    let res: any
    if (isEditMode.value) {
        // 编辑品牌
        res = await reqUpdateTrademark({
            id: rowid.value,
            tmName: form.value.tmName,
            logoUrl: form.value.logoUrl
        })
    } else {
        // 添加品牌
        res = await reqAddTrademark({
            tmName: form.value.tmName,
            logoUrl: form.value.logoUrl
        })
    }
    if (res.code === 200) {
        ElMessage.success(isEditMode.value ? '编辑品牌成功' : '添加品牌成功')
        dialogVisible.value = false
        getTrademarkList()
    } else {
        ElMessage.error(isEditMode.value ? '编辑品牌失败' : '添加品牌失败')
    }

}

// 处理编辑品牌
const handleEdit = (row: any) => {
    dialogVisible.value = true
    // 重置表单数据
    isEditMode.value = true
    form.value = {
        tmName: row.tmName,
        logoUrl: row.logoUrl
    }
    rowid.value = row.id
}

// 删除品牌
const handleDelete = async (id: number) => {
    const res: any = await reqDeleteTrademark(id)
    if (res.code === 200) {
        ElMessage.success('删除品牌成功')
        getTrademarkList()
    } else {
        ElMessage.error('删除品牌失败')
    }
}




// 上传图片
import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

// 3.  上传图片
const beforeAvatarUpload = (file: File) => {  // 上传前的校验
    // 检查文件类型是否为图片
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
        ElMessage.error('上传图片文件')
        return false
    }
    // 检查文件大小是否超过限制（例如 2MB）
    const maxSize = 2 * 1024 * 1024
    if (file.size > maxSize) {
        ElMessage.error('上传图片文件大小不能超过 2MB')
        return false
    }
    return true
}
//4.  上传成功后的处理
const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    // 如果有服务器返回的图片URL，使用服务器返回的
    if (response && response.data) {
        form.value.logoUrl = response.data
        imageUrl.value = response.data
    } else {
        // 否则使用本地预览
        const previewUrl = URL.createObjectURL(uploadFile.raw!)
        form.value.logoUrl = previewUrl
        imageUrl.value = previewUrl
    }
    ElMessage.success('图片上传成功')
}
</script>

<style scoped lang="scss">
.trademark {
    width: 90%;
    height: 90%;
    margin: 0 auto;
    margin-top: 5px;
    overflow: hidden;



}

.el-card {
    width: 100%;
    height: 100%;

    .add-btn {
        margin-bottom: 10px;
        width: 90px;
        background-color: rgb(179, 222, 228);
    }
}






// 
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {

    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);

}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
    border: 1px dashed var(--el-border-color);
}
</style>
