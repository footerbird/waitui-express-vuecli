<template>
<div>
    <menubar module="article"></menubar>
    <div class="container after-cls pt30 pb30">
        <div class="article-left bg-white pl20 pr20">
            
            <article>
                <div class="title">{{article.article_title}}</div>
                <div class="author">
                    <img class="figure" :src="article.figure_path" />
                    <span class="name">{{article.author_name}}</span><span class="time">{{article.create_time}}</span><span class="read" style="display: none;">阅读：{{article.article_read}}</span>
                </div>
                <div class="summary">{{article.article_lead}}</div>
                <section v-html="article.article_content"></section>
                
                <a href="javascript:;" class="dashang-btn" @click="popupAward">打赏支持</a>
                
            </article>
            
        </div>
        <div class="article-right bg-white">
            
            <div class="recommend pl20 pr20" style="border-top: none;">
                <h4 class="title">相关阅读</h4>
                <template v-for="(relative, index) in article_relative">
                <div class="recommend-item" :key="index">
                    <a :href="'/article_detail/'+relative.article_id+'.html'" target="_blank">{{relative.article_title}}</a>
                </div>
                </template>
            </div>
            
            <swiper class="swiper mt20" :options="swiper_option" ref="mySwiper">
                <swiper-slide class="swiper-item">
                    <a href="javascript:;">
                        <img src="../assets/images/welfare/welfare_banner_1.jpg" />
                    </a>
                </swiper-slide>
                <swiper-slide class="swiper-item">
                    <a href="javascript:;">
                        <img src="../assets/images/welfare/welfare_banner_2.jpg" />
                    </a>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
            
            <div class="flash mt20 pl20 pr20" style="border-top: none;">
                <h4 class="title">7×24h&nbsp;快讯</h4>
                <template v-for="(flash, index) in flash_list">
                <div class="flash-item" :key="index">
                    <a href="javascript:;" @click="toggleFlashActive(flash)">{{flash.flash_title}}</a>
                    <div v-show="flash.flash_active" v-html="flash.flash_content"></div>
                    <p>{{flash.create_time}}</p>
                </div>
                </template>
            </div>
            
        </div>
    </div>
    
    <pub-foot></pub-foot>
    <topbar></topbar>
    <popup-award :popup="popup_award" @closePopup="closePopupAward"></popup-award>
</div>
</template>

<script>
// @ is an alias to /src
import Menubar from '@/components/Menubar.vue'
import PubFoot from '@/components/PubFoot.vue'
import Topbar from '@/components/Topbar.vue'
import PopupAward from '@/components/PopupAward.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'article_detail',
    components: {
        Menubar,
        PubFoot,
        Topbar,
        PopupAward,
        swiper,
        swiperSlide
    },
    data () {
        return {
            article: {},
            flash_list: [],
            article_relative: [],
            popup_award: false,
            swiper_option: {
                loop : true,
                autoplay: {
                    delay: 8000,//8秒切换一次
                },
                pagination: {
                    el: '.swiper-pagination',
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            }
        }
    },
    computed: {
        
    },
    mounted() {
        let that = this;
        that.$http
        .post('/api/get_articleDetailBaseAjax',that.$qs.stringify({
            article_id: that.$route.params.article_id
        }))
        .then(({data}) => {
            that.article = data.article;
            that.article_relative = data.article_relative;
            
            let flash_list = data.flash_list;
            for(let i=0; i<flash_list.length; i++){
                flash_list[i].flash_active = false;
            }
            that.flash_list = flash_list;
            
        })
    },
    methods: {
        toggleFlashActive (flash) {
            flash.flash_active = !flash.flash_active;
        },
        popupAward () {
            this.popup_award = true;
        },
        closePopupAward () {
            this.popup_award = false;
        }
    }
}
</script>
