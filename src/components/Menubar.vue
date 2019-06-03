<template>
    <div class="header">
        <div class="top-bar" :class="topbar_cls">
            <div class="container after-cls">
                <a href="/" class="top-logo"></a>
                <div class="top-nav">
                    <ul>
                        <li :class="{'cur':module=='home'}"><router-link to="/">首页</router-link></li>
                        <li :class="{'cur':module=='article'}"><router-link to="/article_list.html">头条</router-link></li>
                        <li :class="{'cur':module=='mark'}"><router-link to="/mark_list.html">商标</router-link></li>
                        <li :class="{'cur':module=='domain'}"><router-link to="/domain_list.html">域名</router-link></li>
                        <li><router-link to="/">APP</router-link></li>
                    </ul>
                </div>
                <div class="top-nav fl-r">
                    <ul>
                        <li><a href="javascript:;" @click="POPUP_LOGIN">免费品牌推广</a></li>
                        <li><router-link to="/">W币交易中心</router-link></li>
                        <li><a href="javascript:;" @click="POPUP_REGISTER" class="to-register">注册</a></li>
                        <li class="split"><a href="javascript:;">|</a></li>
                        <li class="mr0"><a href="javascript:;" @click="POPUP_LOGIN" class="to-login">登录</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'menubar',
    props: {
        topbar_cls: String,
        module: String
    },
    methods: {
        ...mapMutations([
            'POPUP_LOGIN',
            'POPUP_REGISTER'
        ])
    }
}
</script>
