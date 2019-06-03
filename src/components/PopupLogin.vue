<template>
<div>
    <div id="upwin_login" ref="popup" class="upwin" :class="popup_animate" style="height: 390px;" :style="popup_style" v-show="popup_login">
        <div class="upwin-title">用户登录<a href="javascript:;" class="upwin-title-close" @click="CLOSE_POPUP_LOGIN"></a></div>
        <div class="upwin-content">
            <div class="upwin-form">
                <div class="login-tab">
                    <a href="javascript:;" :class="{'cur':pwd_login}" @click="pwdLogin(true)">密码登录</a>
                    <a href="javascript:;" :class="{'cur':!pwd_login}" @click="pwdLogin(false)">短信登录</a>
                </div>
                <div class="form-tip" id="upwin_login_error"></div>
                <ul>
                    <li>
                        <div class="form-input-box">
                            <i class="ico ico-phone"></i>
                            <input type="tel" class="form-input" id="phone_num" placeholder="输入手机号" maxlength="11" required="required" />
                            <!--<a href="javascript:;" class="form-clear"></a>-->
                        </div>
                    </li>
                    <li id="code_num_box" v-if="!pwd_login">
                        <div class="form-input-box">
                            <div class="form-code-box">
                                <i class="ico ico-code"></i>
                                <input type="tel" class="form-input" id="code_num" placeholder="输入验证码" maxlength="6" required="required" />
                                <!--<a href="javascript:;" class="form-clear"></a>-->
                            </div>
                            <a href="javascript:;" class="form-input-link forbid" id="code_btn">获取验证码</a>
                        </div>
                    </li>
                    <li id="pwd_num_box" v-else>
                        <div class="form-input-box">
                            <i class="ico ico-pwd"></i>
                            <input type="password" class="form-input" id="pwd_num" placeholder="输入密码" required="required" />
                            <!--<a href="javascript:;" class="form-clear"></a>-->
                        </div>
                    </li>
                </ul>
                
                <div class="ta-r mb10 h15" style="margin-top: -15px;"><a href="javascript:;" class="upwin-link" id="upwin_tofindpwd" @click="POPUP_FINDPWD">忘记密码?</a></div>
                <a href="javascript:;" id="login_btn" class="upwin-btn mb20 forbid">登录</a>
                <div class="login-bottom-text">没有账号？<a href="javascript:;" class="upwin-link" id="upwin_toregister" @click="POPUP_REGISTER">立即注册</a></div>
            </div>
        </div>
    </div>
    <div class="upwin-mask" id="upwin_login_mask" v-show="popup_login"></div>
</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
    name: 'popup_login',
    data () {
        return {
            pwd_login: true,
            popup_style: {}
        }
    },
    computed: {
        ...mapState([
            'popup_login'
        ]),
        ...mapState({
            popup_animate (state) {
                return state.popup_login?'animated zoomIn':'';
            }
        })
    },
    watch: {
        // 如果 `popup_login` 发生改变，这个函数就会运行
        popup_login () {//需要的话，参数为newval,oldval
            let that = this;
            that.$nextTick(function () {
                // DOM 现在更新了
                let popup = that.$refs.popup;
                if(that.popup_login){
                    let curDivWidth = popup.offsetWidth;
                    let curDivHeight = popup.offsetHeight;
                    that.popup_style = {
                        marginLeft: -curDivWidth/2+'px',
                        marginTop: -curDivHeight/2+'px'
                    }
                }else{
                    that.popup_style = {};
                }
            })
        }
    },
    methods: {
        ...mapMutations([
            'CLOSE_POPUP_LOGIN',
            'POPUP_REGISTER',
            'POPUP_FINDPWD'
        ]),
        pwdLogin (state) {
            this.pwd_login = state;
        }
    }
}
</script>