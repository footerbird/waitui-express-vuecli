<template>
<div>
    <div class="footer">
        <div class="footer-box">
            <div class="container pt20 pb20 after-cls">
                <dl>
                    <dt>企业服务</dt>
                    <dd><a href="/" target="_blank">企业名录</a></dd>
                    <dd><a href="/mark_list.html" target="_blank">商标服务</a></dd>
                    <dd><a href="/domain_list.html" target="_blank">域名服务</a></dd>
                </dl>
                <dl>
                    <dt>帮助中心</dt>
                    <dd><a href="/agreement.html" target="_blank">用户协议</a></dd>
                    <dd><a href="/" target="_blank">常见问题</a></dd>
                    <dd><a href="/" target="_blank">寻求报道</a></dd>
                </dl>
                <dl>
                    <dt>联系我们</dt>
                    <dd><a href="/" target="_blank">杭州再下一城网络科技有限公司</a></dd>
                    <dd><p>公司地址&nbsp;&nbsp;杭州拱墅区上塘路333号海外海写字楼11楼</p></dd>
                    <dd><p>公司电话&nbsp;&nbsp;400-889-0135（09:00~18:00）</p></dd>
                </dl>
                
                <dl class="fl-r">
                    <dt class="ta-r"><img class="bottom-logo" src="../assets/images/bottom-logo.png" /></dt>
                    <dd class="ta-r"><p>QQ咨询：<a class="in-block" href="http://wpa.qq.com/msgrd?v=3&amp;uin=2165223868&amp;site=qq&amp;menu=yes" target="_blank">2165223868</a></p></dd>
                    <dd class="ta-r"><p>加入我们：<a class="in-block w90" href="mailto:hr@waitui.com" target="_blank">hr@waitui.com</a></p></dd>
                    <dd class="ta-r"><p>商务合作：<a class="in-block w90" href="mailto:bd@waitui.com" target="_blank">bd@waitui.com</a></p></dd>
                </dl>
                
                <div class="fl-r"></div>
                
            </div>
            
            <div class="friend-link">
                <div class="container">
                    <ul>
                        <li><label>友情链接：</label></li>
                        <li><a href="https://www.marksmile.com/" target="_blank">名商网</a></li>
                        <li><a href="http://www.yumi.com/" target="_blank">玉米网</a></li>
                        <li><a href="http://www.shangbiao.com/" target="_blank">商标圈</a></li>
                    </ul>
                    <div class="copyright">
                        <span class="mr15">Copyright © 2018 外推网</span>
                        <span>浙ICP备14009787号-1</span>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    
    <popup-login></popup-login>
    <popup-register></popup-register>
    <popup-findpwd></popup-findpwd>
</div>
</template>

<script>
// @ is an alias to /src
import PopupLogin from '@/components/PopupLogin.vue'
import PopupRegister from '@/components/PopupRegister.vue'
import PopupFindpwd from '@/components/PopupFindpwd.vue'

export default {
    name: 'pub_foot',
    components: {
        PopupLogin,
        PopupRegister,
        PopupFindpwd
    },
}
</script>