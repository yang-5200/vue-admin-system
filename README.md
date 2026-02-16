
# Vue Admin Template

一个基于 Vue 3 + TypeScript + Element Plus 开发的企业级后台管理系统模板，集成了完整的权限管理、商品管理和数据可视化功能。

## 技术栈

- **前端框架**: Vue 3.5.24 (Composition API)
- **构建工具**: Vite 7.2.4
- **状态管理**: Pinia 3.0.4
- **路由**: Vue Router 4.6.4
- **UI 库**: Element Plus 2.13.1
- **HTTP 客户端**: Axios 1.13.3
- **图表库**: ECharts 6.0.0
- **样式预处理器**: Sass
- **开发语言**: TypeScript 5.9.3

## 功能特点
图片展示：
<img width="1034" height="901" alt="image" src="https://github.com/user-attachments/assets/dc487715-a52a-4836-bd34-37f6ae13abf7" />
<img width="1223" height="611" alt="image" src="https://github.com/user-attachments/assets/5db6b9df-b47c-4eb7-bc04-2fb4e8177d48" />
<img width="1270" height="451" alt="image" src="https://github.com/user-attachments/assets/8f9f4aa6-6123-4ad5-b598-f3fa5ed44142" />

### 核心功能模块

1. **权限管理模块**
   - 用户管理：用户信息的增删改查
   - 角色管理：角色权限的分配与管理
   - 菜单管理：系统菜单的配置与权限控制

2. **商品管理模块**
   - 品牌管理：商品品牌信息的管理
   - 属性管理：商品属性的定义与维护
   - SPU管理：标准化产品单元的管理
   - SKU管理：库存单元的管理

3. **数据可视化模块**
   - 数据大屏：关键业务数据的可视化展示

4. **基础功能**
   - 登录认证：用户登录与权限验证
   - 响应式布局：适配不同屏幕尺寸
   - 国际化支持：中文界面

### 技术亮点
- **现代化技术栈**：采用 Vue 3 + TypeScript + Vite 等最新前端技术
- **模块化设计**：API、组件、路由等模块化组织，代码结构清晰
- **类型安全**：部分使用 TypeScript，提供类型定义，减少运行时错误
- **状态管理**：使用 Pinia 进行全局状态管理，支持组合式 API
- **组件化开发**：封装可复用组件，提高开发效率
- **数据可视化**：集成 ECharts 实现丰富的数据展示效果
- **权限控制**：实现了基于角色的权限管理系统
- **响应式设计**：适配不同设备屏幕尺寸
- **代码规范**：遵循前端开发最佳实践，代码风格统一

## 项目结构
├── public/             # 静态资源
├── src/                # 源代码
│   ├── api/            # API 请求模块
│   │   ├── acl/        # 权限相关 API
│   │   ├── product/    # 商品相关 API
│   │   └── user/       # 用户相关 API
│   ├── assets/         # 静态资源
│   ├── components/     # 公共组件
│   ├── layout/         # 布局组件
│   ├── router/         # 路由配置
│   ├── store/          # 状态管理
│   ├── styles/         # 全局样式
│   ├── utils/          # 工具函数
│   ├── view/           # 页面组件
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── .env.development    # 开发环境配置
├── .gitignore          # Git 忽略文件
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript 配置
└── vite.config.ts      # Vite 配置
