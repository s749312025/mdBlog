const mixin = {
    data() {
        return {
            table_loading: false,
            total: 0,
            page: 1,
            psize: 10
        }
    },
    methods: {
        async init() {
            Object.keys(this.searchForm).map(key => {
                if (this.searchForm[key] == '') {
                    this.searchForm[key] = undefined
                }
            })
            this.table_loading = true
            const { errno, data } = await this.$fetch(this.tableUrl, {
                page: this.page,
                psize: this.psize,
                ...this.searchForm
            })
            this.table_loading = false
            if (this.tableData && errno === 0) {
                this.tableData = data.data
                this.total = Number(data.count)
            }
        },
        handleCurrentChange(page) {
            this.page = page
            this.init()
        },
        handleSizeChange(psize) {
            this.psize = psize
            //this.searchSubmit()
        },
        async searchSubmit() {
            this.page = 1
            await this.init()
        },
        searchReset(obj = {}) {
            Object.keys(this.searchForm).forEach(item => {
                this.searchForm[item] = undefined
            })
            Object.keys(obj).forEach(item => {
                this.searchForm[item] = obj[item]
            })
            this.searchSubmit()
        }
    }
}

export default mixin
