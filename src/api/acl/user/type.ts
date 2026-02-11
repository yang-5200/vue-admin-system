// 用户分页查询响应的数据类型限制
export interface UserPageQueryResponse {
    code: number
    data: {
        current: number
        pages: number
        size: number
        total: number
        records: UserInfo[]
    }
    message: string;
    ok: boolean;
}
export interface UserInfo {
    id: number
    name: string
    password: string
    phone?: string
    roleName: string
    username: string
    createTime: string
    updateTime: string
}



// 用户信息数据类型限制
export interface UserInfoRequest {
    name: string
    password: string
    username: string
}


// 添加用户响应的数据类型限制
export interface UserInfoResponse {
    code: number
    data: string
    message: string;
    ok: boolean;
}