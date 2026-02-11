// 属性管理接口
import request from '@/utils/request'

import type { CategoryResponseType, AttrResponseType } from './type'


// 一级分类接口
export const reqCategory1 = () => {
    return request<any, CategoryResponseType>({
        url: '/admin/product/getCategory1',
        method: 'get'
    })
}

// 二级分类接口
export const reqCategory2 = (id: number) => {
    return request<any, CategoryResponseType>({
        url: `/admin/product/getCategory2/${id}`,
        method: 'get'
    })
}

// 三级分类接口
export const reqCategory3 = (id: number) => {
    return request<any, CategoryResponseType>({
        url: `/admin/product/getCategory3/${id}`,
        method: 'get'
    })
}

// 属性列表接口
export const reqAttrList = (c1Id: number, c2Id: number, c3Id: number) => {
    return request<any, AttrResponseType>({
        url: `/admin/product/attrInfoList/${c1Id}/${c2Id}/${c3Id}`,
        method: 'get'
    })
}

// /admin/product/saveAttrInfo
export const reqSaveAttrInfo = (data: any) => {
    return request<any, any>({
        url: '/admin/product/saveAttrInfo',
        method: 'post',
        data
    })
}
