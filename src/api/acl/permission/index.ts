import request from '@/utils/request'

//1. 获取菜单列表
//2.给角色分配权限
//3. 删除角色接口
//4.新增菜单接口
//5.根据角色id获取菜单接口
//6.更新菜单接口

const API = {
    //1. 获取菜单列表
    getPermissionList: '/admin/acl/permission',
    //2.给角色分配权限
    assignPermission: '/admin/acl/permission/doAssign',
    //3. 删除角色接口  +id
    deletePermission: '/admin/acl/permission/remove',
    //4.新增菜单接口
    addPermission: '/admin/acl/permission/save',
    //5.根据角色id获取菜单接口 +roleId
    getPermissionByRoleId: '/admin/acl/permission/toAssign',
    //6.更新菜单接口
    updatePermission: '/admin/acl/permission/update',
}

// 1. 获取菜单列表
export const getPermissionListAPI = () => request.get(API.getPermissionList)
// 2.给角色分配权限
export const assignPermissionAPI = (data: any) => request.post(API.assignPermission, data)

// 3. 删除角色接口  +id
export const deletePermissionAPI = (id: string) => request.delete(API.deletePermission + `/${id}`)

// 4.新增菜单接口
export const addPermissionAPI = (data: any) => request.post(API.addPermission, data)

// 5.根据角色id获取菜单接口 +roleId
export const getPermissionByRoleIdAPI = (roleId: string) => request.get(API.getPermissionByRoleId + `/${roleId}`)

// 6.更新菜单接口
export const updatePermissionAPI = (data: any) => request.put(API.updatePermission, data)