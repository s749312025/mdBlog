<template>
    <div class="content-view">
        <h2 class="fs-24 text-left fc-333 marginB-10">所有标签</h2>
        <p class="fs-12 texxt-left fc-999 marginB-10">CURD(查询100条)</p>
        <el-tag
            :key="tag.id"
            class="pointer tag"
            v-for="tag in tableData"
            closable
            type="danger"
            effect="dark"
            :disable-transitions="false"
            @close="handleClose(tag)"
            @click="modTag(tag)"
        >{{tag.cate}}</el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        ></el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
</template>

<script>
import mixin from '@/mixin/pagination'
export default {
    mixins: [mixin],
    data() {
        return {
            searchForm: {
                psize: 100
            },
            tableData: [],
            inputVisible: false,
            inputValue: '',
            tableUrl: '/api/cate'
        }
    },
    methods: {
        async handleClose(tag) {
            this.$confirm('是否删除此标签', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const data = await this.$fetch('/api/cate', { id: tag.id }, 'delete')
                if (data.errno == 0) {
                    this.$message.success('删除成功！')
                    this.init()
                }
            })
        },

        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },

        modTag(tag) {
            this.$prompt('请输入标签', '修改标签', {
                inputValue: tag.cate,
                confirmButtonText: '修改',
                cancelButtonText: '取消'
            }).then(async ({ value }) => {
                if (value.length == 0) {
                    this.$message.error('不能为空')
                }
                const data = await this.$fetch('/api/cate', { id: tag.id, cate: value }, 'put')
                if (data.errno == 0) {
                    this.$message.success('修改成功！')
                    this.init()
                }
            })
        },

        async handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                const data = await this.$fetch('/api/cate', { cate: inputValue }, 'post')
                if (data.errno == 0) {
                    this.$message.success('添加成功！')
                    this.tableData.push({
                        id: data.data.id,
                        cate: inputValue
                    })
                }
            }
            this.inputVisible = false
            this.inputValue = ''
        }
    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>

</style>
<style>
.el-tag {
    margin-right: 10px;
    margin-top: 10px;
}
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>