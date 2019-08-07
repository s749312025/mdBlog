<template>
    <div>
        <el-form :inline="true" class="top marginL-10">
            <el-form-item>
                <el-input v-model="title" size="mini" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="thumb" size="mini" placeholder="请输入banner(选填)"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select
                    v-model="tags"
                    multiple
                    collapse-tags
                    size="mini"
                    style="margin-left: 20px;"
                    placeholder="请选择cate"
                >
                    <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.cate"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-button
                type="primary"
                icon="el-icon-plus"
                class="marginL-20 save-bbtn"
                size="mini"
                @click="submit"
            >保存</el-button>
        </el-form>
        <div class="mdpage">
            <div class="scEditor" id="scEditor" ref="scEditor"></div>
        </div>
    </div>
</template>

<script>
import Vditor from 'vditor'
export default {
    data() {
        return {
            id: this.$route.query.id,
            title: undefined,
            thumb: undefined,
            tags: [],
            options: [],
            vditor: undefined
        }
    },
    methods: {
        async getAlltags() {
            const data = await this.$fetch('/api/cate', { page: 1, psize: 100 })
            this.options = data.data.data
        },
        async renderInitContent() {
            if (!this.id) return
            const data = await this.$fetch(`/api/article?id=${this.id}`)
            this.title = data.data.title
            this.thumb = data.data.thumb
            this.tags = data.data.cate.map(item => item.id)
            this.vditor.setValue(data.data.markdown)
        },
        async submit() {
            const params = {
                title: this.title,
                thumb: this.thumb,
                user_id: localStorage.user ? JSON.parse(localStorage.user).id : undefined,
                markdown: this.vditor.getValue(),
                content: await this.vditor.getHTML(),
                cate: this.tags
            }
            if (this.id) {
                params.id = this.id
                const data = await this.$fetch(`/api/article`, { ...params }, 'put')
                if (data.errno == 0) {
                    this.$message.success('修改成功！')
                    this.$router.go(-1)
                }
                return
            }
            const data = await this.$fetch(`/api/article`, { ...params }, 'post')
            if (data.errno == 0) {
                this.$message.success('新增成功！')
                this.$router.go(-1)
            }
        }
    },
    mounted() {
        this.getAlltags()
        this.vditor = new Vditor('scEditor', {
            cache: false,
            counter: 20000,
            height: '100%',
            editorName: 'vditor',
            tab: '  '
        })
        this.renderInitContent()
        this.vditor.focus()
    }
}
</script>

<style lang="scss" scoped>
.mdpage {
    position: absolute;
    top: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100% - 50);
    .scEditor {
        height: 100%;
    }
}
.save-bbtn {
    margin-top: 8px;
}
.el-input {
    width: 300px;
}
</style>