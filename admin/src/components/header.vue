<template>
    <div class="nav-header">
        <div class="header flex flex-between">
            <div class="img fc-fff flex">
                <span>clarece</span>
            </div>
            <div class="flex align-center right">
                <div>
                    <span></span>
                </div>
                <div class="name">
                    HI~
                    <el-dropdown class="drop" size="small" @command="handleCommand">
                        <span class="el-dropdown-link">
                            {{$store.state.userData.username}}
                            <i
                                class="el-icon-arrow-down el-icon--right"
                            ></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="logout">
                                <span>退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="sider">
            <el-menu
                class="nav-sider"
                :default-active="$route.path"
                @open="handleOpen"
                @close="handleClose"
                :router="true"
            >
                <div v-for="(item, index) in navList" :key="index">
                    <el-menu-item :index="item.href">
                        <i :class="item.icon"></i>
                        <span>{{item.name}}</span>
                    </el-menu-item>
                </div>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navList: [
                {
                    href: '/home',
                    icon: 'el-icon-menu',
                    name: '主页'
                },
                {
                    href: '/tag',
                    icon: 'el-icon-s-management',
                    name: '标签'
                },
                {
                    href: '/article',
                    icon: 'el-icon-notebook-1',
                    name: '文章'
                }
            ]
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
        handleCommand(command) {
            if (command == 'logout') {
                this.logout()
            }
        },
        logout() {
            setTimeout(() => {
                this.$router.push('/home')
            }, 500)
        }
    },
    mounted() {}
}
</script>

<style lang="scss" scoped>
.header {
    background: #2c4167;
    height: 70px;
    line-height: 70px;
    color: #fff;
    .img {
        img {
            width: 140px;
        }
        span {
            margin-top: 5px;
            line-height: 18px;
        }
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 165px;
        height: 70px;
        background: #f13d63;
        text-align: center;
    }
    .right {
        padding-right: 40px;
        & > * {
            margin: 0 20px;
        }
    }
    .drop {
        display: inline;
        color: #fff !important;
    }
}
.sider {
    padding-top: 50px;
    width: 164px;
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    overflow-x: hidden;
    background-color: #294265;
    .el-menu {
        background: transparent;
    }
}
.btn-service {
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 999;
    font-size: 24px;
}
</style>
<style lang="scss">
.el-menu-item.is-active {
    color: #c70026 !important;
    border-left: 3px solid #c70026;
    i {
        color: #c70026 !important;
    }
}
.el-menu-item:focus,
.el-menu-item:hover {
    background-color: #c7002612 !important;
}
.el-submenu__title i,
.el-menu-item {
    color: #fff !important;
}
.nav-sider {
    height: 100%;
    border: none !important;
    font-weight: normal;
}
</style>
