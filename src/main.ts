import { createApp } from "vue";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// 引入用户模块仓库
import { useUserStore } from '@/store/modules/user'

// 引入路由
import router from "./router";
// 引入仓库实例
import pinia from "./store";
import App from "./App.vue";
const app = createApp(App);
// 引入全局 清楚样式
import "@/styles/index.scss";

app.use(ElementPlus, {
  locale: zhCn,
});

// 全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局注册仓库实例
app.use(pinia);

// 先挂载pinia，再初始化用户数据
const userStore = useUserStore()
userStore.initUser()
app.use(router);

app.mount("#app");
