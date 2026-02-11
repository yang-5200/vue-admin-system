<template>
    <div class="slide-verify-container">
        <div class="slide-verify-box" ref="verifyBox">
            <canvas ref="canvas" :width="width" :height="height"></canvas>
            <canvas ref="block" :width="width" :height="height" class="slide-verify-block"></canvas>
            <div class="slide-verify-refresh" @click="refresh">
                <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor"
                        d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                </svg>
            </div>
            <div class="slide-verify-slider" :style="{ width: sliderWidth + 'px' }" ref="slider"
                @mousedown="handleMouseDown" @touchstart="handleTouchStart">
                <div class="slider-text" v-if="!isDragging && !isVerified">{{ sliderText }}</div>
                <div class="slider-btn" :class="{ 'verified': isVerified }">
                    <svg v-if="!isVerified" viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                    </svg>
                    <svg v-else viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['success', 'fail'])

const width = ref(320)
const height = ref(155)
const sliderWidth = ref(320)
const canvas = ref<HTMLCanvasElement>()
const block = ref<HTMLCanvasElement>()
const verifyBox = ref<HTMLDivElement>()
const slider = ref<HTMLDivElement>()

const isDragging = ref(false)
const isVerified = ref(false)
const sliderText = ref('向右滑动填充')
const blockX = ref(0)
const blockY = ref(0)
const img = ref<HTMLImageElement>()

let startX = 0
let moveX = 0

const init = () => {
    refresh()
}

const refresh = () => {
    isVerified.value = false
    isDragging.value = false
    sliderText.value = '向右滑动填充'

    if (slider.value) {
        slider.value.style.transform = 'translateX(0px)'
    }

    if (block.value) {
        block.value.style.transform = 'translateX(0px)'
    }

    draw()
}

const draw = () => {
    if (!canvas.value || !block.value) return

    const ctx = canvas.value.getContext('2d')
    const blockCtx = block.value.getContext('2d')

    if (!ctx || !blockCtx) return

    img.value = new Image()
    img.value.crossOrigin = 'Anonymous'
    img.value.src = `https://picsum.photos/seed/${Date.now()}/${width.value}/${height.value}`

    img.value.onload = () => {
        ctx.drawImage(img.value, 0, 0, width.value, height.value)
        blockCtx.drawImage(img.value, 0, 0, width.value, height.value)

        const blockSize = 42
        blockX.value = Math.floor(Math.random() * (width.value - blockSize - 100) + 100)
        blockY.value = Math.floor(Math.random() * (height.value - blockSize - 40) + 20)

        drawBlock(ctx, blockX.value, blockY.value, blockSize)
        drawBlock(blockCtx, blockX.value, blockY.value, blockSize)
    }
}

const drawBlock = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + size, y)
    ctx.lineTo(x + size, y + size)
    ctx.lineTo(x, y + size)
    ctx.closePath()
    ctx.fill()

    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.stroke()
}

const handleMouseDown = (e: MouseEvent) => {
    if (isVerified.value) return

    isDragging.value = true
    startX = e.clientX

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return

    moveX = e.clientX - startX

    if (moveX < 0) moveX = 0
    if (moveX > width.value - 40) moveX = width.value - 40

    if (slider.value) {
        slider.value.style.transform = `translateX(${moveX}px)`
    }

    if (block.value) {
        block.value.style.transform = `translateX(${moveX}px)`
    }
}

const handleMouseUp = () => {
    if (!isDragging.value) return

    isDragging.value = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    verify()
}

const handleTouchStart = (e: TouchEvent) => {
    if (isVerified.value) return

    isDragging.value = true
    startX = e.touches[0].clientX

    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
}

const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.value) return

    moveX = e.touches[0].clientX - startX

    if (moveX < 0) moveX = 0
    if (moveX > width.value - 40) moveX = width.value - 40

    if (slider.value) {
        slider.value.style.transform = `translateX(${moveX}px)`
    }

    if (block.value) {
        block.value.style.transform = `translateX(${moveX}px)`
    }
}

const handleTouchEnd = () => {
    if (!isDragging.value) return

    isDragging.value = false
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)

    verify()
}

const verify = () => {
    const diff = Math.abs(moveX - blockX.value)

    if (diff < 5) {
        isVerified.value = true
        sliderText.value = '验证通过'
        emit('success')
    } else {
        emit('fail')
        setTimeout(() => {
            refresh()
        }, 500)
    }
}

const reset = () => {
    refresh()
}

onMounted(() => {
    init()
})

onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
})

defineExpose({
    reset
})
</script>

<style scoped lang="scss">
.slide-verify-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.slide-verify-box {
    position: relative;
    width: 320px;
    height: 155px;
    background: #f7f9fa;
    border-radius: 2px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.slide-verify-block {
    position: absolute;
    top: 0;
    left: 0;
}

.slide-verify-refresh {
    position: absolute;
    right: 0;
    top: 0;
    width: 34px;
    height: 34px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;

    &:hover {
        color: #333;
    }
}

.slide-verify-slider {
    position: relative;
    width: 320px;
    height: 40px;
    background: #f7f9fa;
    margin-top: 10px;
    border-radius: 2px;
    border: 1px solid #e4e7eb;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #45494c;
    user-select: none;
    cursor: pointer;
}

.slider-text {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.slider-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s;

    &:hover {
        background: #f0f0f0;
    }

    &.verified {
        background: #52ccba;
        color: #fff;
    }
}
</style>