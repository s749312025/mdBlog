<template>
    <div>
        <header-top></header-top>
        <div class="app-wrap">
            <router-view class="app-router"></router-view>
        </div>
    </div>
</template>

<script>
import headerTop from '@/components/header'
export default {
    name: 'app',
    components: {
        headerTop
    }
}
</script>

<style lang="scss" scoped>
.app-wrap {
    position: absolute;
    top: 70px;
    left: 165px;
    right: 0;
    bottom: 0;
    text-align: center;
    overflow: scroll;
}
</style>