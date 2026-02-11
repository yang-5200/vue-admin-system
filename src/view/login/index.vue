<template>
    <div class="login-container">
        <div class="login-box">
            <h2 class="login-title">系统登录</h2>
            <el-form :model="loginForm" :rules="rules" ref="loginFormRef" class="login-form">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="User" size="large"
                        clearable />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock"
                        show-password size="large" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="login-btn" @click="handleLogin" :loading="loading" size="large">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/modules/user'



const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref()
const loading = ref(false)

const loginForm = reactive({
    username: 'admin',
    password: '111111'
})

const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 20, message: '账号长度在 3 到 20 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
    ]
}

// 点击登录出发事件
const handleLogin = async () => {
    try {
        // 1.先校验表单
        const valid = await loginFormRef.value.validate()
        if (valid) {
            // 2.校验通过，调用登录接口
            const res = await userStore.userLogin(loginForm)
            if (res === 'ok') {
                ElMessage.success('登录成功')
                // 登录成功后，跳转到首页
                router.push({ name: 'layout' })
                //*** */ 登录成功后，获取用户信息
                await userStore.getUserInfo()

            } else {
                ElMessage.warning('登录失败')
            }
        } else {
            ElMessage.warning('请填写完整信息')
        }
    } catch (error) {
        // 捕获登录失败的错误
        console.error('登录失败:', error)
        ElMessage.error(error instanceof Error ? error.message : '登录失败')
    }
}


</script>

<style scoped lang="scss">
.login-container {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #185bc0;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
        animation: rotate 20s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
}

.login-box {
    position: relative;
    width: 420px;
    padding: 50px 40px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    z-index: 1;
}

.login-title {
    text-align: center;
    margin-bottom: 40px;
    color: #333;
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 2px;
}

.login-form {
    .el-form-item {
        margin-bottom: 24px;
    }

    :deep(.el-input__wrapper) {
        padding: 8px 15px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }

        &.is-focus {
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
    }
}

.login-btn {
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 2px;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    transition: all 0.3s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }

    &:active {
        transform: translateY(0);
    }
}
</style>