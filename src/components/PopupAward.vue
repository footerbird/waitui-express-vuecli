<template>
<div>
    <div id="upwin_award" ref="popup" class="upwin" style="border-radius: 8px;" :style="popup_style" v-show="popup">
        <a href="javascript:;" class="upwin-title-close" @click="$emit('closePopup')"></a>
        <div class="upwin-content">
            <div class="upwin-dashang">
                <img class="dashang-logo" src="../assets/images/dashang-logo.png" />
                <p class="dashang-thanks">感谢你对外推网的支持！</p>
                <div class="dashang-qrcode-box">
                    <img class="dashang-qrcode" v-if="award_alipay" id="dashang_qrcode_alipay" src="../assets/images/dashang-alipay.jpg" />
                    <img class="dashang-qrcode" v-else id="dashang_qrcode_wechat" src="../assets/images/dashang-wechat.jpg" />
                </div>
                <p class="dashang-advice">扫码打赏，建议金额1-10元</p>
                <div class="dashang-payway">
                    <label class="dashang-payway-alipay"><input type="radio" name="dashang_payway" id="dashang_payway_alipay" value="alipay" @click="awardAlipay(true)" :checked="award_alipay" /><i></i></label>
                    <label class="dashang-payway-wechat"><input type="radio" name="dashang_payway" id="dashang_payway_wechat" value="wechat" @click="awardAlipay(false)" :checked="!award_alipay" /><i></i></label>
                </div>
                <p class="dashang-bottom-tips">提醒：打赏金额将直接进入对方账号，无法退款，请您谨慎操作。</p>
            </div>
        </div>
    </div>
    <div class="upwin-mask" id="upwin_award_mask" v-show="popup"></div>
</div>
</template>

<script>
export default {
    name: 'popup_award',
    props: {
        popup: Boolean
    },
    data () {
        return {
            award_alipay: true,
            popup_style: {}
        }
    },
    computed: {
        
    },
    watch: {
        // 如果 `popup` 发生改变，这个函数就会运行
        popup () {//需要的话，参数为newval,oldval
            let that = this;
            that.$nextTick(function () {
                // DOM 现在更新了
                let popup = that.$refs.popup;
                if(that.popup){
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
        awardAlipay (state) {
            this.award_alipay = state;
        }
    }
}
</script>