<template>

    <div class="layout">
        <div class="layout-left">
            <Logo />
            <Menu :menuList="menuRoutes" />

        </div>
        <div class="layout-top">
            <Tabbar />
        </div>
        <div class="layout-content">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from '@/layout/components/Logo.vue'
import Menu from '@/layout/components/Menu.vue'
import Tabbar from '@/layout/components/Tabbar.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoutesStore } from '@/store/routes'
const routesStore = useRoutesStore()
const { routes } = routesStore
const menuRoutes = computed(() => {
    return routes.filter((item) => item.meta.hidden === false)
})

</script>

<style scoped lang="scss">
.layout {
    width: 100%;
    height: 100vh;


    .layout-left {
        width: $layout_silder_width;
        height: 100%;
        background-color: $layout_silder_bg_color;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
    }

    .layout-top {
        width: calc(100% - $layout_silder_width);
        height: $layout_tabbar_height;
        background-color: $layout_tabbar_bg_color;
        position: fixed;
        top: 0;
        left: $layout_silder_width;
        z-index: 999;
    }

    .layout-content {
        width: calc(100% - $layout_silder_width);
        height: calc(100vh - $layout_tabbar_height);
        background-color: $layout_main_bg_color;
        position: fixed;
        top: $layout_tabbar_height;
        left: $layout_silder_width;
        z-index: 999;
        padding: 20px;
        overflow-y: auto; // 添加垂直滚动条
    }
}
</style>
