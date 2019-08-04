<template>
    <div>tag</div>
</template>

<script>
import mixin from '@/mixin/pagination'
export default {
    mixins: [mixin],
    data() {
        return {
            searchForm: {},
            tableData: [],
            tableUrl: '/api/cate'
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
</style>