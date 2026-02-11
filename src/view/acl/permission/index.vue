<template>
    <el-table :data="permissionList" border style="width: 100% ; margin-top: 20px" row-key="id"
        :tree-props="{ children: 'children' }">
        <el-table-column label="权限名称" prop="name" />
        <el-table-column label="权限值" prop="code" />
        <el-table-column label="修改时间" prop="updateTime" />
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" size="default" @click="handleAddChild(scope.row)">新增子菜单</el-button>
                <el-button type="primary" size="default" @click="handleEdit(scope.row)"
                    :disabled="scope.row.level == 1 ? true : false">编辑</el-button>
                <el-button type="danger" size="default" :disabled="scope.row.level == 1 ? true : false">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 新增子菜单 和 编辑  的弹框 -->
    <el-dialog :title="form.id ? '编辑子菜单' : '新增子菜单'" v-model="dialogVisible" width="30%">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="权限名称">
                <el-input v-model="form.name" placeholder="请输入权限名称" />
            </el-form-item>
            <el-form-item label="权限值">
                <el-input v-model="form.code" placeholder="请输入权限值" />
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { getPermissionListAPI, addPermissionAPI, updatePermissionAPI } from '@/api/acl/permission'
import { ElMessage } from 'element-plus'

//2. 新增子菜单 业务逻辑
const dialogVisible = ref<boolean>(false)
const formRef = ref<any>(null)  // 新增 formRef 引用
const form = ref<any>({
    name: '',
    code: ''
})
//2.1 新增子菜单 点击事件
const handleAddChild = (row: any) => {
    // 初始化表单数据
    form.value = {
        name: '',
        code: ''
    }
    form.value.level = row.level + 1  // 子菜单层级为父菜单层级 + 1
    form.value.pid = row.id    // 子菜单的 pid 为父菜单的 id
    // form.value.type = row.type
    dialogVisible.value = true
}
//2.2.2 编辑 点击事件
const handleEdit = (row: any) => {
    // 初始化表单数据
    form.value = {
        name: row.name,
        id: row.id
    }
    // 编辑时，权限值不能修改
    form.value.code = row.code
    // 编辑时，权限类型不能修改
    form.value.level = row.level
    form.value.pid = row.pid
    dialogVisible.value = true
}

//2.2.1 表单限制
const rules = ref<any>({
    name: [
        { required: true, message: '请输入权限名称', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入权限值', trigger: 'blur' }
    ]
})

//2.3 提交表单
const handleSubmit = async () => {
    // 统一检验
    await formRef.value.validate(async (valid: boolean) => {  // 使用 formRef 替代 ref
        if (valid) {
            // 校验通过，提交表单数据
            console.log('表单数据校验通过，提交表单数据')
            // 这里可以添加 API 调用逻辑
            if (form.value.id) {
                // 编辑子菜单
                const res = await updatePermissionAPI(form.value)
                if (res.code == 200) {
                    ElMessage.success('编辑子菜单成功')
                    dialogVisible.value = false
                    getPermissionList()
                } else {
                    ElMessage.error('编辑子菜单失败')
                }

            } else {
                const res = await addPermissionAPI(form.value)
                if (res.code == 200) {
                    ElMessage.success('新增子菜单成功')
                    dialogVisible.value = false
                    getPermissionList()
                } else {
                    ElMessage.error('新增子菜单失败')
                }
            }
        } else {
            // 校验不通过，提示用户输入正确信息
            console.log('表单数据校验不通过，提示用户输入正确信息')
            ElMessage.error('请输入正确的权限名称和权限值')
            return false
        }
    })
}


//1.获取权限列表 业务逻辑
const permissionList = ref<any[]>([])
const getPermissionList = async () => {
    const res = await getPermissionListAPI()
    console.log(res)
    permissionList.value = res.data
}
onMounted(() => {
    getPermissionList()
})
</script>

<style></style>