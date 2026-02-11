// 品牌相关接口

import request from "@/utils/request";

const API={
    // 获取品牌列表
    TRADEMARK_URL:'/admin/product/baseTrademark',
    // 添加品牌
    ADDTRADEMARK_URL:'/admin/product/baseTrademark/save',
    // 更新品牌
    UPDATETRADEMARK_URL:'/admin/product/baseTrademark/update',
    // 删除品牌
    REMOVETRADEMARK_URL:'/admin/product/baseTrademark/remove',
}

// export const reqHasTrademark = (pageNum: number, pageSize: number) => {
//     return request<any, any>(API.TRADEMARK_URL, {
//         params:{
//             pageNum,
//             pageSize,
//         }
//     })
// }
export const reqHasTrademark =(pageNum: number, pageSize: number) => {
    return request.get(API.TRADEMARK_URL+`/${pageNum}/${pageSize}`)
}
// 添加品牌
export const reqAddTrademark = (data:any) => {
    return request.post(API.ADDTRADEMARK_URL, data)
}
// 更新品牌  //已有品牌id
export const reqUpdateTrademark = (data:any) => {
    return request.put(API.UPDATETRADEMARK_URL, data)
}

// 删除品牌
export const reqDeleteTrademark = (id: number) => {
    return request.delete(API.REMOVETRADEMARK_URL+`/${id}`)
}