import request from '@/utils/request'

export const reqSpuList = (currentPage: number, pageSize: number, category3Id: number | string) => {
    return request<any, any>({
        url: `/admin/product/${currentPage}/${pageSize}`,
        method: 'get',
        params: {
            category3Id: category3Id
        }
    })

}


/**
//  新增spu
export const reqSpuAdd = (spuInfo:any)=>{
    return request<any,any>({
        url:`/admin/product/saveSpuInfo`,
        method:'post',
        data:spuInfo
    })  
} 
 */

// 1.1获取全部品牌的数据
export const reqBrandList = () => {
    return request<any, any>({
        url: `/admin/product/baseTrademark/getTrademarkList`,
        method: 'get'
    })
}

// 1.2 获取某个Spu下的全部的售卖商品的图片数据
export const reqSpuImageList = (spuId: number) => {
    return request<any, any>({
        url: `/admin/product/spuImageList/${spuId}`,
        method: 'get'
    })
}

// 1.3 获取某一个Spu下的全部的已有的销售属性
export const reqSpuSaleAttrList = (spuId: number) => {
    return request<any, any>({
        url: `/admin/product/spuSaleAttrList/${spuId}`,
        method: 'get'
    })
}

// 1.4 获取整个项目的全部的销售属性【销售属性的集合】
export const reqBaseSaleAttrList = () => {
    return request<any, any>({
        url: `/admin/product/baseSaleAttrList`,
        method: 'get'
    })
}


// 1.5 更新和添加spu
// 1.5 更新和添加spu
export const reqAddOrUpdateSpu = (spuInfo: any) => {
    if (spuInfo.id !== undefined && spuInfo.id !== null && spuInfo.id !== '') {
        return request<any, any>({
            url: '/admin/product/updateSpuInfo',
            method: 'post',
            data: spuInfo
        })
    } else {
        return request<any, any>({
            url: '/admin/product/saveSpuInfo',
            method: 'post',
            data: spuInfo
        })
    }
}
// export const reqAddOrUpdateSpu = (spuInfo:any)=>{
//     if(spuInfo.id){
//         return request<any,any>({
//             url:`/admin/product/updateSpuInfo`,
//             method:'post',
//             data:spuInfo
//         })
//     }else{
//         return request<any,any>({
//             url:`/admin/product/saveSpuInfo`,
//             method:'post',
//             data:spuInfo
//         })
//     }
// }

// // 1.5 新增spu
// export const reqAddSpu = (spuInfo:any)=>{
//     return request<any,any>({
//         url:`/admin/product/saveSpuInfo`,
//         method:'post',
//         data:spuInfo
//     })
// }

// // 1.6 更新spu
// export const reqUpdateSpu = (spuInfo:any)=>{
//     return request<any,any>({
//         url:`/admin/product/updateSpuInfo`,
//         method:'post',
//         data:spuInfo
//     })
// } 