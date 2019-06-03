import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import ArticleList from './views/ArticleList.vue'
import ArticleSearch from './views/ArticleSearch.vue'
import ArticleDetail from './views/ArticleDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/article_list.html',
      name: 'article_list',
      component: ArticleList
    },
    {
      path: '/article_search/:keyword',
      name: 'article_search',
      component: ArticleSearch
    },
    {
      path: '/article_detail/:article_id.html',
      name: 'article_detail',
      component: ArticleDetail
    },
  ]
})
