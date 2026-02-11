import request from '@/utils/request'

// 1.删除角色
export const removeRoleAPI = (id: number) => {
    return request.delete<any, any>(`/admin/acl/role/remove/${id}`)
}

//2。新增角色接口
export const addRoleAPI = (data: any) => {
    return request.post<any, any>(`/admin/acl/role/save`, data)
}


// 3.更新角色接口
export const updateRoleAPI = (data: any) => {
    return request.put<any, any>(`/admin/acl/role/update`, data)
}

//4.获取角色分页列表  roleName可选
export const getRolePageListAPI = (page: number, limit: number,roleName?:string) => {
    // 如果有角色名称搜索条件，添加到URL中
    const url = roleName ? 
        `/admin/acl/role/${page}/${limit}?roleName=${roleName}` : 
        `/admin/acl/role/${page}/${limit}`
    return request.get<any, any>(url)
}


// 5. 新增角色或者更新角色
export const addOrUpdateRoleAPI = (data: any) => {
    if (data.id) {
        return request.put<any, any>(`/admin/acl/role/update`, data)
    } else {
        return request.post<any, any>(`/admin/acl/role/save`, data)
    }
}



// 菜单管理
// 1. 获取菜单列表
export const getMenuListAPI = () => {
    return request.get<any, any>(`/admin/acl/permission`)
}

//2. 给角色分配权限

export const assignPermissionToRoleAPI = (roleId: number, permissionId: number[]) => {
    return request.post<any, any>(`/admin/acl/permission/doAssign?roleId=${roleId}&permissionId=${permissionId}` 
       
    )
}

//3.根据角色获取菜单接口
export const getRoleMenuListAPI = (roleId: number) => {
    return request.get<any, any>(`/admin/acl/permission/toAssign/${roleId}`)
}