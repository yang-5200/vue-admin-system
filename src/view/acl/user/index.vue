<template>
    <div class="card-one">
        <el-card>
            <el-form :inline="true">
                <el-form-item label="用户名:" style="width: 350px;">
                    <el-input v-model="searchUser" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">查询</el-button>
                    <el-button type="info" @click="handleReset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>

    <div style="margin-top: 20px;">
        <el-card>
            <div style="margin-bottom: 20px;">
                <el-button type="primary" @click="handleAdd">添加用户</el-button>
                <el-button type="info" @click="handleBatchDelete">批量删除用户</el-button>
            </div>

            <el-table :data="tableData" style="width: 90% ; margin: 0 auto;" border ref="multipleTableRef"
                @selection-change="selectChange">
                <el-table-column type="selection" :selectable="selectable" width="55" />
                <el-table-column prop="username" label="#" width="80" type="index"></el-table-column>
                <el-table-column prop="id" label="id" width="80"></el-table-column>
                <el-table-column prop="username" label="用户名字" width="100"></el-table-column>
                <el-table-column prop="name" label="用户名称" width="100"></el-table-column>
                <el-table-column prop="roleName" label="用户角色" width="100"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
                <el-table-column prop="createTime" label="更新时间" width="150"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="primary" size="default" @click="handleAssignRole(scope.row)">分配角色</el-button>
                        <el-button type="primary" size="default" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="default" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="margin-top: 20px;">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 7, 9]" layout=" sizes, prev, pager, next, jumper,->,total" :total="total"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </el-card>

    </div>
    <!-- 添加用户和编辑用户的弹框 -->
    <el-dialog :title="addUserForm.id ? '编辑用户' : '添加用户'" v-model="addDialogVisible" width="50%">
        <el-form :model="addUserForm" :rules="addUserRules" ref="addUserFormRef" label-width="120px">
            <el-form-item label="用户姓名" prop="username">
                <el-input v-model="addUserForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
                <el-input v-model="addUserForm.name" placeholder="请输入用户昵称"></el-input>
            </el-form-item>
            <el-form-item v-if="!addUserForm.id" label="用户密码" prop="password">
                <el-input v-model="addUserForm.password" placeholder="请输入用户密码"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="info" @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleAddSubmit()">添加</el-button>
        </template>
    </el-dialog>


    <!-- 抽屉  分配角色-->
    <el-drawer title="分配角色" v-model="roleDrawerVisible" width="30%">
        <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addUserForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="列表角色">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                @change="handleCheckAllChange">全选</el-checkbox>
            <el-checkbox-group v-model="checkedList" @change="handleCheckedListChange" class="checkbox-group">
                <el-checkbox v-for="item in roleList" :value="item" :key="item">
                    {{ item.roleName }}
                </el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <template #footer>
            <el-button type="info" @click="roleDrawerVisible = false">取消</el-button>
            <el-button type="primary" @click="handleAssignRoleSubmit()">分配角色</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue'
import { getUserPageList, batchRemoveUser, updateUser, removeUser, getUserToAssignRoleList, assignRole } from '@/api/acl/user'
import { ElMessage } from 'element-plus'
import { addUser } from '@/api/acl/user'

//
const addUserForm = ref({
    name: '',
    username: '',
    password: '',
})
// const row = ref<any>(null)
const addDialogVisible = ref(false)

const addUserRules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入用户名称', trigger: 'blur' }
    ],
    roleName: [
        { required: true, message: '请选择用户角色', trigger: 'change' }
    ]
})

//
// 8.抽屉 分配角色 数据
const roleDrawerVisible = ref(false)
//8.1 多选
// 全选
const checkAll = ref(false)
// 列表角色 全选状态
const isIndeterminate = ref(false)
// 列表角色 选中状态
const checkedList = ref<any[]>([])
//列表角色
const roleList = ref<any[]>([])
// 8.1 多选 全选状态改变事件
const handleCheckAllChange = (val: boolean) => {
    checkedList.value = val ? roleList.value : []
    isIndeterminate.value = false
}
// 8.1 多选 列表角色 选中状态改变事件
const handleCheckedListChange = (val: any[]) => {
    checkAll.value = val.length === roleList.value.length
    isIndeterminate.value = val.length > 0 && val.length < roleList.value.length
}
// 8.抽屉 分配角色 点击事件
const handleAssignRole = async (row: any) => {
    console.log('分配角色', row)
    addUserForm.value = row
    roleDrawerVisible.value = true

    let result = await getUserToAssignRoleList(row.id)
    // Object.assign(drawerFormData.value, row)
    if (result.code === 200) {
        console.log("获取用户分配角色列表成功", result)
        checkedList.value = result.data.assignRoles
        roleList.value = result.data.allRolesList
    }

}
// 8.抽屉 分配角色 提交事件
const handleAssignRoleSubmit = async () => {
    console.log('分配角色提交', addUserForm.value, checkedList.value)
    let result = await assignRole({
        userId: addUserForm.value.id,
        roleIdList: checkedList.value.map((item: any) => item.id)
    })
    if (result.code === 200) {
        console.log("为用户分配角色成功", result)
        roleDrawerVisible.value = false
        getPageList()
    }
}






// 编辑用户
const handleEdit = (row: any) => {
    //先重置表单为默认数据
    addUserForm.value = {
        name: '',
        username: '',
        password: '',
    }

    Object.assign(addUserForm.value, row)
    addDialogVisible.value = true
}


// 添加用户
const handleAdd = () => {
    console.log('添加用户')
    addUserForm.value = {
        name: '',
        username: '',
        password: '',
    }
    addDialogVisible.value = true
}

const handleAddSubmit = async () => {
    if (addUserForm.value.id) {
        // 编辑用户
        const res = await updateUser(addUserForm.value)
        if (res.code === 200) {
            ElMessage.success('编辑成功')
            addDialogVisible.value = false
            getPageList()
        }
    } else {
        // 添加用户
        const res = await addUser(addUserForm.value)
        if (res.code === 200) {
            ElMessage.success('添加成功')
            addDialogVisible.value = false
            getPageList()
        }
    }
}


const searchUser = ref('')
const handleSearch = () => {
    console.log(searchUser.value)
}
const handleReset = () => {
    searchUser.value = ''
}
// 1.表格数据
const tableData = ref<any>([])
const selectable = (row: any, index: number) => {
    // 这里可以根据业务逻辑控制某些行是否可选择
    // 例如：return row.id !== 1; // 禁止选择ID为1的行
    return row.id !== 1; // 禁止选择ID为1的行

    return true; // 所有行都可以选择
}

// 3.1删除
const handleDelete = async (row: any) => {
    // 确认删除
    const confirm = window.confirm(`确定删除用户 ${row.name} 吗？`)
    if (!confirm) {
        return
    }

    // 调用删除API
    const res = await removeUser(row.id)
    if (res.code === 200) {
        ElMessage.success('删除成功')
        getPageList()
    }
}


//3.2 批量删除功能
const selectedIdList = ref<number[]>([])
const selectChange = (val: any) => {
    selectedIdList.value = val.map((item: any) => item.id)
}
const handleBatchDelete = async () => {
    if (selectedIdList.value.length === 0) {
        ElMessage.warning('请选择要删除的用户')
        return
    }
    // 确认删除
    const confirm = window.confirm(`确定删除选中的 ${selectedIdList.value.length} 个用户吗？`)
    if (!confirm) {
        return
    }
    // 调用批量删除API
    const res = await batchRemoveUser(selectedIdList.value)
    if (res.code === 200) {
        ElMessage.success('删除成功')
        getPageList()
    }
}


// 2.分页
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(3)
// 分页数据
const handleSizeChange = (size: number) => {
    pageSize.value = size
    getPageList()
}
const handleCurrentChange = (page: number) => {
    currentPage.value = page
    getPageList()
}
const getPageList = async () => {
    const res = await getUserPageList(currentPage.value, pageSize.value)
    if (res.code === 200) {
        console.log(res)
        tableData.value = res.data.records
        total.value = res.data.total
    }
}
onMounted(() => {
    getPageList()
})
</script>

<style scoped>
/* 列表角色 多选框 */

.checkbox-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 15px;
    padding: 10px;
    background-color: #f9fafc;
    border-radius: 8px;
}

.checkbox-group .el-checkbox {
    padding: 8px;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.checkbox-group .el-checkbox:hover {
    background-color: #ecf5ff;
}
</style>