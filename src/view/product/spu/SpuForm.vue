<template>
    <el-card style="margin-top: 20px;">
        <el-dialog v-model="dialogVisible">
            <el-image :src="dialogImageUrl" style="width: 100%;" />
        </el-dialog>
        <el-form>
            <el-form-item label="SPU名称" prop="name">
                <el-input v-model="SpuParamsForm.spuName" placeholder="请输入SPU名称"></el-input>
            </el-form-item>
            <el-form-item label="SPU 品牌">
                <el-select v-model="SpuParamsForm.tmId" placeholder="请选择SPU品牌" style="width: 300px;">
                    <el-option v-for="item in brandList" :key="item.id" :label="item.tmName"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU 描述">
                <el-input v-model="SpuParamsForm.description" type="textarea" placeholder="请输入SPU描述"></el-input>
            </el-form-item>

            <el-form-item label="spu图片">
                <el-upload class="avatar-uploader" action="api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" v-model:file-list="spuImageList">
                </el-upload>
            </el-form-item>

            <el-form-item label="SPU 销售属性">

                <el-select v-model="salesAttrIdAndValueName" placeholder="请选择SPU销售属性" style="width: 300px;">
                    <el-option v-for="item in unownedSaleAttrList" :key="item.id" :label="item.name"
                        :value="`${item.id}-${item.name}`"></el-option>
                </el-select>
                <el-button type="primary" style="margin-left: 10px;" @click="addSaleAttrValue">添加销售属性</el-button>
                <!-- 销售属性值列表 -->
                <el-table :data="saleAttrList" border style="margin-top: 20px;   width: 80%;">
                    <el-table-column type="index" label="序号"></el-table-column>
                    <el-table-column label="销售属性总名字" prop="saleAttrName"></el-table-column>
                    <el-table-column label="销售属性值（具体）">
                        <template #default="scope">
                            <el-tag v-for="item in scope.row.spuSaleAttrValueList" :key="item.id"
                                style="margin-left: 5px;">{{
                                    item.saleAttrValueName }}
                            </el-tag>
                            <el-input v-if="scope.row.flag == true" v-model="scope.row.saleAttrValue"
                                @blur="toLook(scope.row)" placeholder="请输入销售属性值" style="width: 100px;">
                            </el-input>
                            <el-button v-else type="primary" size="default" @click="toEdit(scope.row)">添加</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="danger" size="default"
                                @click="deleteSaleAttrValue(scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitSpu">提交SPU</el-button>
                <el-button @click="goBack">返回</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { reqBrandList, reqSpuImageList, reqSpuSaleAttrList, reqBaseSaleAttrList, reqAddOrUpdateSpu } from '@/api/product/spu'


const SpuParamsForm = reactive({
    category3Id: '',
    spuName: '',
    tmId: '',
    description: '',
    spuImageList: [] as any[],
    saleAttrList: [] as any[]
})
// 1.1品牌列表
const brandList = ref([] as any[])
//1.2 图片列表
const spuImageList = ref<any>([])
// 1.3 销售属性列表
const saleAttrList = ref<any>([])
//1.4 销售属性值列表
const saleAttrValueList = ref<any>([])
// 获取SPU参数数据
const getSpuParams = async (spu: any) => {
    // 1.1获取spu表单数据
    Object.assign(SpuParamsForm, spu) // 把spu数据赋值给SpuParamsForm
    // 1.1 品牌列表
    const res1 = await reqBrandList()
    if (res1.code === 200) {
        console.log(res1.data)
        brandList.value = res1.data || []
    }
    // 1.2 图片列表
    const res2 = await reqSpuImageList(spu.id)
    if (res2.code === 200) {
        console.log(res2.data)
        spuImageList.value = res2.data.map((item: any) => {
            return {
                name: item.imgName,
                url: item.imgUrl
            }
        })
    }
    // 1.3 部分销售属性列表
    const res3 = await reqSpuSaleAttrList(spu.id)
    if (res3.code === 200) {
        console.log(res3.data)
        saleAttrList.value = res3.data || []
    }
    // 1.4 完整销售属性值列表
    const res4 = await reqBaseSaleAttrList()
    if (res4.code === 200) {
        console.log(res4.data)
        saleAttrValueList.value = res4.data || []
    }
}

// 图片预览对话框
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
// 图片预览处理
const handlePictureCardPreview = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

// 添加销售属性值
const toEdit = (row: any) => {
    row.flag = true
    row.saleAttrValue = ''
}
// 销售属性值查询
const toLook = (row: any) => {
    let newSaleAttrValue = {
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: row.saleAttrValue
    }
    // 销售属性值列表添加新的销售属性值
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    // 清空输入框
    row.saleAttrValue = ''
    // 切换为按钮状态
    row.flag = false

}
//2.1 销售属性id和销售属性值名称
const salesAttrIdAndValueName = ref('')
// 2.2 计算当前未拥有的销售属性列表
const unownedSaleAttrList = computed(() => {
    let unownedList = saleAttrValueList.value.filter((item: any) => {
        return !saleAttrList.value.some((attr: any) => {
            return attr.saleAttrName === item.name
        })
    })
    return unownedList || []
})

// 添加销售属性
const addSaleAttrValue = () => {
    const [saleAttrId, saleAttrValueName] = salesAttrIdAndValueName.value.split('-')
    // 准备一个对象，用来存储销售属性的ID与属性值
    let newsaleAttrObj = {
        saleAttrId: saleAttrId,
        saleAttrName: saleAttrValueName,
        spuSaleAttrValueList: []
    }
    // 把新的销售属性对象添加到销售属性值列表中
    saleAttrList.value.push(newsaleAttrObj)
    // 清空选择的销售属性
    salesAttrIdAndValueName.value = ''
}
// 删除销售属性值
const deleteSaleAttrValue = (row: any) => {
    saleAttrList.value.splice(row.$index, 1)
}
// 提交SPU
// const submitSpu = async () => {
//     const res = await reqAddOrUpdateSpu(SpuParamsForm)
//     if (res.code === 200) {
//         ElMessage.success('SPU添加成功')
//     }
// }
// 1. 首先，确保 submitSpu 函数正确处理返回的状态码
const submitSpu = async () => {
    try {
        // 确保销售属性数据正确传递
        SpuParamsForm.saleAttrList = saleAttrList.value;
        // 确保图片数据正确传递
        SpuParamsForm.spuImageList = spuImageList.value;

        console.log('提交的数据:', SpuParamsForm);

        const res = await reqAddOrUpdateSpu(SpuParamsForm);
        console.log('服务器返回:', res);

        if (res.code === 200) {
            ElMessage.success('SPU添加成功');
        } else if (res.code === 205) {
            ElMessage.warning('服务器繁忙，请稍后重试');
        } else {
            ElMessage.error(`提交失败: ${res.message || '未知错误'}`);
        }
    } catch (error) {
        console.error('提交失败:', error);
        ElMessage.error('网络错误，请检查网络连接');
    }
}

// 2. 修复 initaddSpu 方法中的字段名
const initaddSpu = async (c3Id: any) => {
    // 清空数据，使用正确的字段名
    Object.assign(SpuParamsForm, {
        category3Id: '',
        spuName: '',  // 修正字段名
        tmId: '',     // 修正字段名
        description: '',
        spuImageList: [] as any[],
        saleAttrList: [] as any[]  // 修正字段名
    })
    // 清空独立的 ref 变量
    spuImageList.value = []
    saleAttrList.value = []
    // 赋值
    SpuParamsForm.category3Id = c3Id || ''
    // 获取品牌列表
    let res1 = await reqBrandList()
    if (res1.code === 200) {
        console.log(res1.data)
        brandList.value = res1.data || []
    }
    // 获取销售属性列表
    let res4 = await reqBaseSaleAttrList()
    if (res4.code === 200) {
        console.log(res4.data)
        saleAttrValueList.value = res4.data || []  // 修正为 saleAttrValueList
    }
}
// 返回
const emit = defineEmits(['goBack'])
const goBack = () => {
    // 触发返回事件，场景值切换为0
    emit('goBack', '0')
}

//初始化
// const initaddSpu = async (c3Id: any) => {
//     // 清空数据
//     Object.assign(SpuParamsForm, {
//         category3Id: '',
//         spuName: '',
//         tmId: '',
//         description: '',
//         spuImageList: [] as any[],
//         saleAttrIdList: [] as number[]
//     })
//     // 赋值
//     SpuParamsForm.category3Id = c3Id || ''
//     // 获取品牌列表
//     let res1 = await reqBrandList()
//     if (res1.code === 200) {
//         console.log(res1.data)
//         brandList.value = res1.data || []
//     }
//     // 获取销售属性列表
//     let res4 = await reqBaseSaleAttrList()
//     if (res4.code === 200) {
//         console.log(res4.data)
//         saleAttrList.value = res4.data || []
//     }
// }

defineExpose({
    getSpuParams,
    initaddSpu
})
</script>

<style></style>