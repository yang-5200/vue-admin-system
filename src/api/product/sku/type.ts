export interface SkuInfo {
    category3Id: number,
    id: number,
    isSale: number,
    price: number,
    skuAttrValueList: any,
    skuDefaultImg: string,
    skuDesc: string,
    skuImageList: any,
    skuName: string,
    skuSaleAttrValueList: any,
    spuId: number,
    tmId: number,
    weight: number,
}

export interface SkuListResponse {
    code: number,
    data: {
        current: number,
        pages: number,
        records: SkuInfo[],
        size: number,
        total: number
    },
    message: string,
    ok: boolean
}