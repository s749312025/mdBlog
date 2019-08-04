<template>
    <div>
        <el-dialog title="登录账号" :visible.sync="dialog" center width="400px"
            :close-on-click-modal="false" top="50px">
            <div class="bind-phone-dialog">
                <el-form ref="form" :model="form" :rules="rules"
                    class="bind-phone">
                    <el-form-item prop="phone">
                        <el-input v-model="form.phone" :maxlength="11"
                            placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input placeholder="请输入密码" type="password"
                            @keyup.enter.native="handleSubmit"
                            v-model="form.password">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button class="width-100 footer-btn" type="primary"
                    @click="handleSubmit">登录</el-button>
                <p class="text-center marginT-10"><a class="fc-blue"
                        href="javascript:;" @click="forget">忘记密码？</a>
                </p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dialog: !!this.value,
            innerdialog: false,
            checked: true,
            form: {
                phone: '',
                password: ''
            },
            rules: {
                phone: [
                    {
                        type: 'string',
                        required: true,
                        message: '请输入手机号码',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        type: 'string',
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        async handleSubmit() {
            this.$refs.form.validate(async valid => {
                const { code, data } = await this.$fetch('/tool/members/login', this.form)
                if (code === 0) {
                    this.$store.dispatch('setLogin', data)
                    // ls.set('token', data.token)
                    // ls.set('tokenTime', new Date().getTime())
                    // this.$store.dispatch(`base/info/get`)
                    this.dialog = false
                }
            })
        },
        async sendCode() {
            if (this.isSend) return
            //手机号正则验证
            var reg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
            if (!this.form.phone) {
                this.$message.error('请输入手机号码')
                return
            }
            if (!reg.test(this.form.phone)) {
                //手机号不合法
                this.$message.error('您输入的手机号码不合法，请重新输入')
            }
            const { code } = await api.post('kmd/msg', {
                phone: this.form.phone
            })
            if (code === 1001) {
                this.$message.success('验证码发送成功!')
                this.time = 60
                this.timer()
            }
        },
        timer() {
            if (this.time > 0) {
                this.time--
                this.btnContent = this.time + 's后重新获取'
                this.isSend = true
                window.timer = setTimeout(this.timer, 1000)
            } else if (this.time === 0) {
                this.btnContent = '获取验证码'
                if (window.timer) clearTimeout(window.timer)
                this.isSend = false
            }
            console.log(this.time)
        },
        forget() {
            this.$emit('forget')
        }
    },
    watch: {
        dialog(val) {
            if (!val) this.$emit('input', val)
        }
    }
}
</script>
<style lang="scss">
.bind-phone-dialog {
    .bind-phone {
        .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #666;
            a {
                color: #2b90ed;
            }
        }
        .rules-phone .el-form-item__content {
            margin-left: 10px !important;
            margin-top: -15px;
        }
        .send {
            .el-input-group__append {
                background-color: #aaa;
                border-color: #aaa;
                .el-button.is-disabled:hover {
                    border-color: transparent;
                    background-color: transparent;
                    color: inherit;
                }
            }
        }
        .el-input-group__append {
            cursor: pointer;
            background-color: #2b90ed;
            border-color: #2b90ed;
            color: #fff;
        }
    }
    div[role='alert'] {
        margin-top: -20px;
        margin-bottom: 20px;
        padding: 5px 10px;
    }
}
.footer-btn {
    margin-top: -30px;
}
</style>
