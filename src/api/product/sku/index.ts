import request from '@/utils/request'
import type { SkuListResponse } from './type'

// API地址集合
const API = {
    cancelSale: '/admin/product/cancelSale/',
    deleteSku: '/admin/product/deleteSku/',
    findBySpuId: '/admin/product/findBySpuId/',
    getSkuInfo: '/admin/product/getSkuInfo/',
    getList: '/admin/product/list/',
    onSale: '/admin/product/onSale/',
    saveSkuInfo: '/admin/product/saveSkuInfo',
    getSpuImageList: '/admin/product/spuImageList/',
    getSpuSaleAttrList: '/admin/product/spuSaleAttrList/'
}

// 下架SKU接口
export const cancelSaleApi = (skuId: number | string) => {
    return request({
        url: `${API.cancelSale}${skuId}`,
        method: 'get'
    })
}

// 删除SKU接口
export const deleteSkuApi = (skuId: number | string) => {
    return request({
        url: `${API.deleteSku}${skuId}`,
        method: 'delete'
    })
}

// 根据SPU ID查询SKU接口
export const findBySpuIdApi = (spuId: number | string) => {
    return request({
        url: `${API.findBySpuId}${spuId}`,
        method: 'get'
    })
}

// 获取SKU详情接口
export const getSkuInfoApi = (skuId: number | string) => {
    return request({
        url: `${API.getSkuInfo}${skuId}`,
        method: 'get'
    })
}

// 获取SKU分页列表接口
export const getListApi = (page: number, limit: number) => {
    return request<any, SkuListResponse>({
        url: `${API.getList}${page}/${limit}`,
        method: 'get'
    })
}

// 上架SKU接口
export const onSaleApi = (skuId: number | string) => {
    return request({
        url: `${API.onSale}${skuId}`,
        method: 'get'
    })
}

// 新增SKU接口
export const saveSkuInfoApi = (data: any) => {
    return request({
        url: API.saveSkuInfo,
        method: 'post',
        data
    })
}

// 获取商品图片列表接口
export const getSpuImageListApi = (id: number | string) => {
    return request({
        url: `${API.getSpuImageList}${id}`,
        method: 'get'
    })
}

// 获取商品销售属性列表接口
export const getSpuSaleAttrListApi = (id: number | string) => {
    return request({
        url: `${API.getSpuSaleAttrList}${id}`,
        method: 'get'
    })
}
