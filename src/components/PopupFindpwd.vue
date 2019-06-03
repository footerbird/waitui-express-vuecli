<template>
<div>
    <div id="upwin_findpwd" ref="popup" class="upwin" :class="popup_animate" style="height: 390px;" :style="popup_style" v-show="popup_findpwd">
        <div class="upwin-title">找回密码<a href="javascript:;" class="upwin-title-close" @click="CLOSE_POPUP_FINDPWD"></a></div>
        <div class="upwin-content">
            <div class="upwin-form pt0">
                <div class="form-tip" id="upwin_findpwd_error"></div>
                <ul>
                    <li>
                        <div class="form-input-box">
                            <i class="ico ico-phone"></i>
                            <input type="tel" class="form-input" id="phone_find" placeholder="输入手机号" maxlength="11" required="required" />
                            <!--<a href="javascript:;" class="form-clear"></a>-->
                        </div>
                    </li>
                    <li>
                        <div class="form-input-box">
                            <div class="form-code-box">
                                <i class="ico ico-code"></i>
                                <input type="tel" class="form-input" id="code_find" placeholder="输入验证码" maxlength="6" required="required" />
                                <!--<a href="javascript:;" class="form-clear"></a>-->
                            </div>
                            <a href="javascript:;" class="form-input-link forbid" id="code_btn_find">获取验证码</a>
                        </div>
                    </li>
                    <li>
                        <div class="form-input-box">
                            <i class="ico ico-pwd"></i>
                            <input type="password" class="form-input" id="pwd_find" placeholder="重设密码" required="required" />
                            <!--<a href="javascript:;" class="form-clear"></a>-->
                        </div>
                    </li>
                </ul>
                
                <a href="javascript:;" id="findpwd_btn" class="upwin-btn mb20 forbid">完成</a>
                
            </div>
        </div>
    </div>
    <div class="upwin-mask" id="upwin_findpwd_mask" v-show="popup_findpwd"></div>
</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

export default {
    name: 'popup_findpwd',
    data () {
        return {
            popup_style: {}
        }
    },
    computed: {
        ...mapState([
            'popup_findpwd'
        ]),
        ...mapState({
            popup_animate (state) {
                return state.popup_findpwd?'animated zoomIn':'';
            }
        })
    },
    watch: {
        // 如果 `popup_findpwd` 发生改变，这个函数就会运行
        popup_findpwd () {//需要的话，参数为newval,oldval
            let that = this;
            that.$nextTick(function () {
                // DOM 现在更新了
                let popup = that.$refs.popup;
                if(that.popup_findpwd){
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
            'CLOSE_POPUP_FINDPWD'
        ])
    }
}
</script>