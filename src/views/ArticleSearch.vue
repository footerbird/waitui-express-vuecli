<template>
<div>
    <menubar module="article"></menubar>
    <div class="container after-cls pt30 pb30">
        <div class="article-left">
            <div class="search">
                <input type="text" placeholder="大家都在搜" v-model="keyword" id="keyword" @keyup.enter="keywordSearch" />
                <input type="button" value="搜索" id="keywordBtn" @click="keywordSearch" />
            </div>
            
            <div class="hotwords">
                <font>热搜词：</font>
                <template v-for="(hotword, index) in article_hotword">
                <a :href="'/article_search/'+hotword.hotword_name" target="_blank" :key="index">{{hotword.hotword_name}}</a>
                </template>
            </div>
            
            <input type="hidden" id="article_page" value="1" />
            
            <div class="article-list" id="article_list" style="border-top: 1px solid #e6e8eb;">
                <template v-for="(article, index) in article_list">
                <a :href="'/article_detail/'+article.article_id+'.html'" target="_blank" class="article-item" :key="index">
                    <div class="thumb">
                        <img :src="article.thumb_path" :alt="article.article_title" />
                    </div>
                    <div class="limit">
                        <h4 class="title">{{article.article_title}}</h4>
                        <h5 class="summary">{{article.article_lead}}</h5>
                    </div>
                    <p><span class="author">{{article.author_name}}</span><span class="tag">{{article.author_tag}}&nbsp;&nbsp;{{article.create_time}}</span></p>
                </a>
                </template>
            </div>
            
            <div class="article-loadmore" v-if="article_loadnone" id="article_loadnone">喂喂，你触碰到我的底线了</div>
            <div class="article-loadmore" v-else id="article_loading">加载中，请稍后...</div>
            
        </div>
        <div class="article-right" style="padding-top: 55px;">
            
            <div class="flash" style="border-top: none;">
                <h4 class="title">7×24h&nbsp;快讯</h4>
                <template v-for="(flash, index) in flash_list">
                <div class="flash-item" :key="index">
                    <a href="javascript:;" @click="toggleFlashActive(flash)">{{flash.flash_title}}</a>
                    <div v-show="flash.flash_active" v-html="flash.flash_content"></div>
                    <p>{{flash.create_time}}</p>
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
            
            <div class="recommend mt20" style="border-top: none;">
                <h4 class="title">推荐阅读</h4>
                <template v-for="(recommend, index) in article_recommend">
                <div class="recommend-item" :key="index">
                    <a :href="'/article_detail/'+recommend.article_id+'.html'" target="_blank">{{recommend.article_title}}</a>
                </div>
                </template>
            </div>
            
        </div>
    </div>
    
    <pub-foot></pub-foot>
    <topbar></topbar>
</div>
</template>

<script>
// @ is an alias to /src
import Menubar from '@/components/Menubar.vue'
import PubFoot from '@/components/PubFoot.vue'
import Topbar from '@/components/Topbar.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'article_list',
    components: {
        Menubar,
        PubFoot,
        Topbar,
        swiper,
        swiperSlide
    },
    data () {
        return {
            keyword: '',
            article_hotword: [],
            article_list: [],
            article_page: 1,
            flash_list: [],
            article_recommend: [],
            article_loading: false,
            article_loadnone: false,
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
        .post('/api/get_articleSearchBaseAjax',that.$qs.stringify({
            keyword: that.$route.params.keyword
        }))
        .then(({data}) => {
            that.keyword = data.keyword;
            that.article_hotword = data.article_hotword;
            that.article_list = data.article_list;
            if(that.article_list.length < 10){
                that.article_loadnone = true;
            }
            that.article_recommend = data.article_recommend;
            
            let flash_list = data.flash_list;
            for(let i=0; i<flash_list.length; i++){
                flash_list[i].flash_active = false;
            }
            that.flash_list = flash_list;
            
        })
        
        window.addEventListener("scroll",that.windowScroll);
    },
    methods: {
        toggleFlashActive (flash) {
            flash.flash_active = !flash.flash_active;
        },
        keywordSearch () {
            location.href = '/article_search/'+this.keyword;
        },
        windowScroll () {
            let that = this;
            let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            if(that.article_loadnone) return;
            if(scrollTop + clientHeight +100 < scrollHeight) return;
            if(that.article_loading) return;
            that.article_loading = true;
            that.$http
            .post('/api/get_articleSearchAjax',that.$qs.stringify({
                keyword: that.keyword,
                page: that.article_page+1
            }))
            .then(({data}) => {
                that.article_list.push(...data);
                that.article_page++;
                that.article_loading = false;
                if(data.length < 10){
                    that.article_loadnone = true;
                }
            })
        },
    }
}
</script>
