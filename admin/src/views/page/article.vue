<template>
    <div class="article-list content-view">
        <el-card class="box-card">
            <el-form :inline="true">
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    @click="$router.push('/article/add')"
                >新增</el-button>
            </el-form>
        </el-card>
        <div class="table">
            <el-table :data="tableData" v-loading="table_loading" style="border: 1px solid #eee;">
                <el-table-column prop="title" show-overflow-tooltip label="标题"></el-table-column>
                <el-table-column prop="markdown" show-overflow-tooltip label="内容"></el-table-column>
                <el-table-column prop="markdown" label="标签">
                    <template slot-scope="scope">
                        <div>
                            <el-tag
                                v-for="(item, index) in scope.row.cate.slice(0, 3)"
                                :key="index"
                            >{{item.cate}}</el-tag>
                            <span v-if="scope.row.cate.length > 3">...</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="markdown" label="是否公开">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.status"
                            @change="(v) => changeStatus(scope.$index, scope.row, v)"
                            :active-value="1"
                            :inactive-value="0"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="markdown" label="创建时间">
                    <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
                </el-table-column>
                <el-table-column prop label="更新时间">
                    <template slot-scope="scope">{{scope.row.modify_time | dateFormat}}</template>
                </el-table-column>
                <el-table-column prop label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages marginT-20 text-center">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import mixin from '@/mixin/pagination'
export default {
    mixins: [mixin],
    data() {
        return {
            searchForm: {
                psize: 15
            },
            tableData: [],
            tableUrl: '/api/article'
        }
    },
    methods: {
        async changeStatus(index, item, v) {
            this.table_loading = true
            const data = await this.$fetch(`/api/article`, { id: item.id, status: v }, 'put')
            this.table_loading = false
            if (data.errno == 0) {
                this.$message.success('更新成功！')
            }

            this.init()
        },
        handleEdit(index, item) {
            this.$router.push(`/article/add?id=${item.id}`)
        },
        handleDelete(index, item) {
            this.$confirm('是否删除此标签', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const data = await this.$fetch('/api/article', { id: item.id }, 'delete')
                if (data.errno == 0) {
                    this.$message.success('删除成功！')
                    this.init()
                }
            })
        }
    },
    created() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
.article-list {
}
</style>