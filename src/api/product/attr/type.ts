export interface ResponseData {
    code: number
    message: string
    ok: boolean
    
}

// 分类里的的ts
export interface CategoryObj {
    id: number|string,
    name: string,
    category1Id?: number|string,
    category2Id?: number|string,
    
}

// 响应的ts
export interface CategoryResponseType {
    code: number
    message: string
    ok: boolean
    data: CategoryObj[]
}



// 属性值的ts
export interface AttrValueObj {
    attrId: number|string,
    id: number|string,
    valueName: string,
}

// 属性列表的数组
export interface AttrObj {
    attrName: string,
    attrId: number|string,
    attrValueList: AttrValueObj[],
    categoryId: number|string,
    categoryLevel: number|string,
    id: number|string,
}

// 属性列表里的ts
export interface AttrResponseType {
    code: number|string,
    message: string,
    ok: boolean,
    data: AttrObj[]
}