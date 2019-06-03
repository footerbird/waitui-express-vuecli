<template>
<div>
    <menubar module="article"></menubar>
    <div class="container after-cls pt30 pb30">
        <div class="article-left">
            <div class="hotwords">
                <font>热搜词：</font>
                <template v-for="(hotword, index) in article_hotword">
                <a :href="'/article_search/'+hotword.hotword_name" target="_blank" :key="index">{{hotword.hotword_name}}</a>
                </template>
            </div>
            
            <div class="article-table">
                <table width="100%">
                    <tr>
                        <td rowspan="2">
                            <a :href="'/article_detail/'+article_first.article_id+'.html'" target="_blank" :title="article_first.article_title">
                                <img class="big" :src="article_first.thumb_path" :alt="article_first.article_title" />
                                <div class="title ta-c">{{article_first.article_title}}</div>
                            </a>
                        </td>
                        <td class="pr0" width="240">
                            <a :href="'/article_detail/'+article_second.article_id+'.html'" target="_blank" :title="article_second.article_title">
                                <img :src="article_second.thumb_path" :alt="article_second.article_title" />
                                <div class="title">{{article_second.article_title}}</div>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td class="pr0" width="240">
                            <a :href="'/article_detail/'+article_third.article_id+'.html'" target="_blank" :title="article_third.article_title">
                                <img :src="article_third.thumb_path" :alt="article_third.article_title" />
                                <div class="title">{{article_third.article_title}}</div>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div class="categorys">
                <a :class="{'cur':current_category==''}" href="javascript:;" @click="toggleArticleCategory('')">最新文章</a>
                <template v-for="(category, index) in article_category">
                <a :class="{'cur':current_category==category.category_type}" href="javascript:;" :data-category="category.category_type" @click="toggleArticleCategory(category.category_type)" :key="index">{{category.category_name}}</a>
                </template>
            </div>
            
            <div class="article-list" id="article_list">
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
        <div class="article-right">
            <div class="search">
                <input type="text" placeholder="大家都在搜" v-model="keyword" id="keyword" @keyup.enter="keywordSearch" />
                <input type="button" id="keywordBtn" @click="keywordSearch" />
            </div>
            
            <div class="flash">
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
            article_first: {},
            article_second: {},
            article_third: {},
            article_category: [],
            article_list: [],
            current_category: '',
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
        .post('/api/get_articleListBaseAjax')
        .then(({data}) => {
            that.article_hotword = data.article_hotword;
            that.article_first = data.article_first;
            that.article_second = data.article_second;
            that.article_third = data.article_third;
            that.article_category = data.article_category;
            that.article_list = data.article_list;
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
            .post('/api/get_articleListAjax',that.$qs.stringify({
                category: that.current_category,
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
        toggleArticleCategory (type) {
            let that = this;
            that.current_category = type;
            that.article_list = [];
            that.article_page = 0;
            that.article_loading = true;
            that.article_loadnone = false;
            let repeatArr = [that.article_first.article_id,that.article_second.article_id,that.article_third.article_id];
            that.$http
            .post('/api/get_articleListAjax',that.$qs.stringify({
                category: that.current_category,
                page: that.article_page+1,
                repeat: repeatArr
            },{arrayFormat: 'brackets'}))
            .then(({data}) => {
                that.article_list = data;
                that.article_page++;
                that.article_loading = false;
                if(data.length < 10){
                    that.article_loadnone = true;
                }
            })
        }
    }
}
</script>
