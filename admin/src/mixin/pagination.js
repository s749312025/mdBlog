const mixin = {
    data() {
        return {
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
            const { code, data } = await this.$fetch(this.tableUrl, {
                page: this.page,
                psize: this.psize,
                ...this.searchForm
            })
            if (this.tableData && code === 0) {
                this.tableData = data.list
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
