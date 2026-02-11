// 用户模块接口
import request from '@/utils/request'
import type { UserPageQueryResponse,UserInfoRequest,UserInfoResponse } from './type'
// /admin/acl/user/{page}/{limit}
// 获取用户分页列表
export const getUserPageList =(page:number,limit:number)=>{
    return request.get<any,UserPageQueryResponse>(`/admin/acl/user/${page}/${limit}`)
    
}


// /admin/acl/user/save
// 添加用户
export const addUser = (data: UserInfoRequest) => {
    return request.post<any, UserInfoResponse>(`/admin/acl/user/save`, data)
}


// /admin/acl/user/update
// 更新用户
export const updateUser = (data: any) => {
    return request.put<any, any>(`/admin/acl/user/update`, data)
}

// /admin/acl/user/toAssign/{adminId}
// 获取用户分配角色列表
export const getUserToAssignRoleList = (adminId: number) => {
    return request.get<any, any>(`/admin/acl/user/toAssign/${adminId}`)
}


// /admin/acl/user/doAssignRole
// 为用户分配角色
export const assignRole = (data: any) => {
    return request.post<any, any>(`/admin/acl/user/doAssignRole`, data)
}

// /admin/acl/user/remove/{id}
// 删除用户
export const removeUser = (id: number) => {
    return request.delete<any, any>(`/admin/acl/user/remove/${id}`)
}

// /admin/acl/user/batchRemove
// 批量删除用户
export const batchRemoveUser = (ids: number[]) => {
    return request.delete<any, any>(`/admin/acl/user/batchRemove`, {
        data: ids
    })
}

// /admin/acl/user/{page}/{limit}
// 条件查询用户分页列表
export const getUserPageListByCondition = (page: number, limit: number,username:string) => {
    return request.get<any, any>(`/admin/acl/user/${page}/${limit}?username=${username}`)
}
