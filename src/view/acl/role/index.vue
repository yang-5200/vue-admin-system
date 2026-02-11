<template>
    <el-card>
        <el-form ref="roleFormRef" :inline="true" class="el-form-one">
            <el-form-item label="角色名称:" prop="roleName">
                <el-input v-model="searchForm.roleName" placeholder="请输入角色名称">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchRole" class="el-form-search-btn">搜索</el-button>
                <el-button type="info" @click="resetForm" class="el-form-reset-btn">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card style="margin-top: 20px;">
        <div style=" margin: 20px 0;">
            <el-button type="primary" @click="addRole" class="el-form-add-btn">新增角色</el-button>
        </div>
        <el-table :data="roleTableData" border>
            <el-table-column label="#" type="index" width="50" />
            <el-table-column prop="id" label="id" width="300" />
            <el-table-column prop="roleName" label="职位名称" width="150"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"> </el-table-column>
            <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="default" @click="AddLimit(scope.row)"
                        class="el-form-addlimit-btn">新增权限</el-button>
                    <el-button type="primary" size="default" @click="editRole(scope.row)"
                        class="el-form-edit-btn">编辑</el-button>
                    <!-- <el-button type="danger" size="default">删除</el-button> -->
                    <el-popconfirm :title="`你确定要删除${scope.row.roleName}吗？`" @confirm="deleteRole(scope.row)">
                        <template #reference>
                            <el-button type="danger" size="default"" class=" el-form-delete-btn">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="total" v-model:page-size="pageSize"
            :page-sizes="[3, 5, 7, 9]" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-card>

    <!-- 弹框 -->
    <el-dialog v-model="centerDialogVisible" :title="roleForm.id ? '编辑角色' : '新增角色'" width="500" destroy-on-close center>
        <el-form>
            <el-form-item label="角色名称:">
                <el-input v-model="roleForm.roleName" placeholder="请输入角色名称">
                </el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmAddRole">
                    确认新增
                </el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 新增加权限的抽屉 -->
    <el-drawer v-model="limitDrawerVisible" title="新增权限" width="500" destroy-on-close center>
        <div>
            <!-- 注释：
                 data: 菜单列表
                show-checkbox: 是否显示复选框
                node-key: 节点的唯一标识
                prop : 节点的标签属性
                -->
            <el-tree style="max-width: 600px" :data="menuArr" show-checkbox node-key="id" default-expand-all
                :default-checked-keys="checkedKeysArr" :props="defaultProps" ref="treeRef" />
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="limitDrawerVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmAddLimit">
                    确认新增
                </el-button>
            </div>
        </template>
    </el-drawer>

</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getRolePageListAPI, addOrUpdateRoleAPI, assignPermissionToRoleAPI, getRoleMenuListAPI, removeRoleAPI } from '@/api/acl/role'

// 定义角色列表相关的状态
const roleTableData = ref([])
const total = ref(0)
const pageSize = ref(3)
const currentPage = ref(1)
const searchForm = ref({
    roleName: ''
})
// const roleFormRef = ref()

//4.定义删除角色
const deleteRole = async (row: any) => {
    // 4.1 调用接口，删除角色
    const res = await removeRoleAPI(row.id)
    if (res.code === 200) {
        ElMessage.success('删除角色成功')
        // 4.2 刷新角色列表
        getRolePageList()
    }
}



//3.定义新增权限相关的状态
//3.1 新增权限抽屉的显示状态
const limitDrawerVisible = ref(false)
//3.1.1 树形控件数据
const menuArr = ref([])
//3.1.2 树形控件选中的节点
const checkedKeysArr = ref([])
//3.1.2.1 树形控件的引用
const treeRef = ref()
//3.1.3 树形控件的属性
const defaultProps = ref({
    children: 'children',
    label: 'name'
})

//3.2点击新增权限按钮时，获取菜单列表
const AddLimit = async (row: any) => {
    limitDrawerVisible.value = true
    // 3.2.1 点击新增权限按钮时，获取菜单列表
    const res = await getRoleMenuListAPI(row.id)
    // 3.2.2 收集当前分类权限职位的数据
    Object.assign(roleForm.value, row)
    if (res.code === 200) {
        menuArr.value = res.data
        // 3.2.3 树形控件默认选中当前角色的权限
        checkedKeysArr.value = collectCheckedKeys(menuArr.value, [])
    }
}

// 3.3递归遍历菜单树，收集每一项的最后一级中 select为true的节点ID
// 递归收集函数
const collectCheckedKeys = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
        if (item.children && item.children.length > 0) {
            collectCheckedKeys(item.children, initArr)
        }
        if (item.select === true && item.level === 4) {
            initArr.push(item.id)
        }
    })
    // 重要：返回收集到的数组，否则函数会默认返回undefined
    return initArr
}


//3.4 点击确认新增权限按钮时，将选中的节点赋值给角色
const confirmAddLimit = async () => {
    // 职位的id
    const roleId = Number(roleForm.value.id)
    // 选中节点的id
    let arr = treeRef.value.getCheckedKeys()
    // 半选的id
    let arr1 = treeRef.value.getHalfCheckedKeys()
    // 合并选中的节点id和半选的节点id
    let permissionId = arr.concat(arr1)
    // 3.4.1 调用接口，将选中的节点id赋值给角色
    const res = await assignPermissionToRoleAPI(roleId, permissionId)
    if (res.code === 200) {
        ElMessage.success('新增权限成功')
        limitDrawerVisible.value = false
    }
}


// 2.定义新增角色相关的状态
const centerDialogVisible = ref(false)
//定义接口
interface RoleForm {
    roleName: string
    id?: number
}
const roleForm = ref<RoleForm>({
    roleName: ''
})
//2.1 新增角色按钮点击事件
const addRole = async () => {
    // 新增角色时，清空表单数据
    roleForm.value = { roleName: '' }
    centerDialogVisible.value = true
}
//2.2 编辑角色按钮点击事件
const editRole = async (row: any) => {
    // roleForm.value = row
    // 使用深拷贝避免表单修改实时影响表格数据
    roleForm.value = { ...row }
    centerDialogVisible.value = true
}
//2.3 确认新增或更新角色按钮点击事件
const confirmAddRole = async () => {
    if (roleForm.value.id) {
        // 编辑角色
        const res = await addOrUpdateRoleAPI(roleForm.value)
        if (res.code === 200) {
            ElMessage.success('编辑角色成功')

            getRolePageList()
            centerDialogVisible.value = false
        }
    } else {
        // 新增角色
        const res = await addOrUpdateRoleAPI(roleForm.value)
        if (res.code === 200) {
            ElMessage.success('新增角色成功')

            getRolePageList()
            centerDialogVisible.value = false
        }
    }
}








//1.获取角色列表
const getRolePageList = async () => {
    const res = await getRolePageListAPI(currentPage.value, pageSize.value, searchForm.value.roleName)
    if (res.code === 200) {
        console.log(res)
        roleTableData.value = res.data.records
        total.value = res.data.total
    }
}
onMounted(() => {
    getRolePageList()
})
const handleSizeChange = (val: number) => {
    pageSize.value = val
    getRolePageList()
}
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    getRolePageList()
}


const searchRole = async () => {
    const res = await getRolePageListAPI(currentPage.value, pageSize.value, searchForm.value.roleName)
    if (res.code === 200) {
        roleTableData.value = res.data.records
        total.value = res.data.total
    }
}
const resetForm = () => {
    searchForm.value.roleName = ''
    getRolePageList()
}

</script>

<style></style>