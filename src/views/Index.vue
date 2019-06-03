<template>
<div>
    <menubar :topbar_cls="topbar_cls" module="home"></menubar>
    <div class="home-banner" :class="rand_home_banner">
        <div class="fly-box"><i class="fly"></i></div>
        <div class="fade-in-up">
            <h1>您的一站式品牌管家</h1>
            <h4 style="text-indent: -5px;">广告直投，精准抵达目标用户；品牌资讯，增加企业品牌曝光；品牌管理，提升企业品牌价值</h4>
            <a href="javascript:;" @click="POPUP_LOGIN" class="to-experience">立即体验</a>
        </div>
    </div>
    
    <!--精准的客户定位-->
    <div class="home-topic home-topic-target">
        <div class="container">
            <div class="intro-box fl-l">
                <h2>精准的定向能力<br>瞄准活跃客户</h2>
                <p>我们根据用户的地理位置、使用设备、活跃时间以及用户的操作习惯为您描绘出精确的用户画像，帮助您选择合适的品牌营销群体</p>
                <a href="javascript:;" @click="POPUP_LOGIN" >立即体验>></a>
            </div>
            <div class="image-box fl-r">
                <img src="../assets/images/home-topic-target.png" />
            </div>
        </div>
    </div>
    
    <!--多样的营销方式-->
    <div class="home-topic home-topic-types">
        <div class="container">
            <div class="image-box fl-l">
                <img src="../assets/images/home-topic-types.png" />
                <ul>
                    <li style="margin-top: 60px;"><i class="kaipin"></i><span>开屏广告</span></li>
                    <li style="margin-top: 15px;"><i class="fanye"></i><span>翻页广告</span></li>
                    <li style="margin-top: 0;"><i class="baodao"></i><span>品牌报道</span></li>
                    <li style="margin-top: 15px;"><i class="faxian"></i><span>发现频道</span></li>
                    <li style="margin-top: 60px;"><i class="pintuan"></i><span>品牌拼团</span></li>
                </ul>
            </div>
            <div class="intro-box fl-r">
                <h2 class="col-white">多样的营销方式<br>提升用户体验</h2>
                <p class="col-white">我们提供首页开屏广告、翻页刷屏广告、品牌品牌报道、品牌活动发现频道以及品牌助力拼团等多种营销方式，帮助企业将信息推送给真正有兴趣的用户</p>
                <a href="javascript:;" @click="POPUP_LOGIN" >立即体验>></a>
            </div>
        </div>
    </div>
    
    <!--专业的品牌管理-->
    <div class="home-topic home-topic-manage">
        <div class="container after-cls">
            <div class="intro-box fl-l">
                <h2>专业的品牌管理<br>提高市场竞争力</h2>
                <p>我们拥有来自域名、商标、知识产权等行业的专业品牌保护团队，可以解决在品牌建设中会遇到的各种各样的问题，从而帮助企业树立良好的企业形象、打造品牌优势、发展品牌战略。</p>
                <a href="javascript:;" @click="POPUP_LOGIN" >立即体验>></a>
            </div>
            <div class="image-box fl-r">
                <img src="../assets/images/home-topic-manage.png" />
            </div>
        </div>
    </div>
    
    <pub-foot></pub-foot>
</div>
</template>

<script>
// @ is an alias to /src
import Menubar from '@/components/Menubar.vue'
import PubFoot from '@/components/PubFoot.vue'
import { mapMutations } from 'vuex'

export default {
    name: 'index',
    components: {
        Menubar,
        PubFoot,
    },
    data () {
        return {
            topbar_cls: 'top-bar-home'
        }
    },
    computed: {
        rand_home_banner () {
            return 'home-banner' + Math.floor((Math.random()*10))
        }
    },
    mounted() {
        let that = this;
        window.addEventListener("scroll",that.windowScroll);
    },
    methods: {
        windowScroll () {
            let that = this;
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(scrollTop > 50){
                that.topbar_cls = 'top-bar-fixed';
            }else{
                that.topbar_cls = 'top-bar-home';
            }
        },
        ...mapMutations([
            'POPUP_LOGIN'
        ])
    }
}
</script>
