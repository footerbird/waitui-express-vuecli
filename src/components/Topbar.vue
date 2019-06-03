<template>
    <div id="to_topbar" class="to-topbar">
        <div class="ico-top" id="ico_top" v-show="totop_show" @click="scrollTop"></div>
    </div>
</template>

<script>
export default {
    name: 'topbar',
    data () {
        return {
            totop_show: false
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
            that.totop_show = scrollTop > 100 ? true : false;
        },
        scrollTop () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }
}
</script>
