import Home from "@/view/home/index.vue";
import Login from "@/view/login/index.vue";
import NotFound from "@/view/404/index.vue";
import Layout from "@/layout/index.vue";
// 首页
import Screen from "@/view/screen/index.vue";
// 权限模块
import Acl from "@/view/acl/index.vue";
import User from "@/view/acl/user/index.vue";
import Role from "@/view/acl/role/index.vue";
import Permission from "@/view/acl/permission/index.vue";
// 商品模块
import Product from "@/view/product/index.vue";
import TradeMark from "@/view/product/trademark/index.vue";
import Spu from "@/view/product/spu/index.vue";
import Sku from "@/view/product/sku/index.vue";
import Attr from "@/view/product/attr/index.vue";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

// 路由配置
export const constantRoutes = [
  {
    // 首页
    path: "/",
    component: Layout,
    name: "layout",
    meta: {
      hidden: false,
      title: "首页",
      icon: "House",
    },
    redirect: "/home",
    children: [
      {
        // 首页
        path: "/home",
        component: Home,
        name: "home",
        meta: {
          hidden: false,
          title: "首页",
          icon: "House",
          roles: ["*"],
        },
      },
    ],
  },

  {
    // 登录页
    path: "/login",
    component: Login,
    name: "login",
    meta: {
      title: "登录页",
      hidden: true,
      roles: ["*"],
    },
  },
  {
    // 404 页
    path: "/404",
    component: NotFound,
    name: "404",
    meta: {
      title: "404 页",
      hidden: true,
    },
  },
  {
    // 数据大屏
    path: "/screen",
    component: Screen,
    name: "screen",
    meta: {
      hidden: false,
      title: "数据大屏",
      icon: "Platform",
      roles: ["*"],
    },
  },
  {
    // 权限模块
    path: "/acl",
    component: Layout,
    name: "acl",
    meta: {
      hidden: false,
      title: "权限模块",
      icon: "Lock",
      requireAuth: true, //鉴权标记
    },
    children: [
      {
        // 用户管理
        path: "/acl/user",
        component: User,
        name: "user",
        meta: {
          hidden: false,
          title: "用户管理",
          icon: "Iphone",
        },
      },
      {
        // 角色管理
        path: "/acl/role",
        component: Role,
        name: "role",
        meta: {
          hidden: false,
          title: "角色管理",
          icon: "Stamp",
        },
      },
      {
        // 菜单管理
        path: "/acl/permission",
        component: Permission,
        name: "permission",
        meta: {
          hidden: false,
          title: "菜单管理",
          icon: "List",
        },
      },
    ],
  },
  {
    path: "/product",
    component: Layout,
    name: "product",
    meta: {
      hidden: false,
      title: "商品模块",
      icon: "ShoppingCart",
    },
    children: [
      {
        // 品牌管理
        path: "/product/trademark",
        component: TradeMark,
        name: "trademark",
        meta: {
          hidden: false,
          title: "品牌管理",
          icon: "Star",
        },
      },
      {
        // 属性管理
        path: "/product/attr",
        component: Attr,
        name: "attr",
        meta: {
          hidden: false,
          title: "属性管理",
          icon: "Discount",
        },
      },
      {
        // spu管理
        path: "/product/spu",
        component: Spu,
        name: "spu",
        meta: {
          hidden: false,
          title: "spu管理",
          icon: "Tools",
        },
      },
      {
        // sku管理
        path: "/product/sku",
        component: Sku,
        name: "sku",
        meta: {
          hidden: false,
          title: "sku管理",
          icon: "Tools",
        },
      },
    ],
  },

  {
    // 其他未匹配路由
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "其他未匹配路由",
      hidden: true,
    },
  },
];
