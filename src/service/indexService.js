/**
 * Created by LXH on 2017/10/31.
 */
import axios from './axios.js'
import qs from 'qs'
import store from'../vuex/'
import cs from'./commonService'
export const indexService = {
    api: {},
    // 轮播图请求
    listImgs: function(params){
        return axios.get('/banners'+ this.getParam(params))
    },
    // 文章列表请求
    getArticles: function(params){
        return axios.get('/articles'+ this.getParam(params))
    },
    // 文章详情页请求
    getArticleDetail: function(params){
        return axios.get('/articles/'+params.id + this.getParam(params))
    },
    // 热门文章列表请求
    hotArticles: function(params){
        return axios.get('/articles/hot'+ this.getParam(params))
    },
    // 文章分类
    articlesType: function(params){
        return axios.get('/articles/type'+ this.getParam(params))
    },
    // 字典相关操作api
    dictionary: function(params){
        return axios.get('/dictionarys/list'+ this.getParam(params))
    },
    // 新闻阅读数加1
    getReadnum: function(params){
        return axios.post('/articles/'+params.articleId+'/readnum',qs.stringify(params))
    },
   // 所有社群号（1作者，2主办方）
   allAdminUser: function(params){
        return axios.get('/allAdminUser'+ this.getParam(params))
    },
    // 关注社群号
    postFollow: function(params){
        return axios.post('/myFollow/'+params.adminId,qs.stringify(params))
    },
    // 模板阅读数+1
    templateRead: function(params){
        return axios.put('/templates/incwatchnum' + this.getParam(params))
    },
    // 点击订阅产品包价格查询
    subscribeOrder: function(params){
        return axios.put('/productpkgs/subscribe' + this.getParam(params))
    },
    // 获取orderNo
    orderSubmit: function(params){
        return axios.put('/productpkgs/ordersubmit', qs.stringify(params))
        // return axios.put('/productpkgs/ordersubmit' + this.getParam(params))
    },
    // 支付页面生成支付二维码
    getErweima: function(params){
        return axios.put('/orders' + this.getParam(params))
    },
    /*  个人中心页  */
    myCenter:function (params) {
        return axios.get('/users/center' + this.getParam(params))
    },
    // 支付宝支付
    myOrder:function (params) {
        return axios.put('/orders' + this.getParam(params))
    },
    getParam: function(param){
        let url = '';
        for(let key in param){
            if(param[key] !== null){
                url ? url += '&'+key+'='+param[key] : url += key+'='+param[key]
            }
        }
        return url ? '?'+url : ''
    },
    checkLogin: function () {
        localStorage.redirectUrl = location.href
        let token = localStorage.token
        if(token && token != "undefined"){
            return true
        }else{
            /*localStorage.redirectUrl = window.location.href
            setTimeout(function () {
                    localStorage.redirectUrl = location.href
                location.href = location.origin+'/shops/'+store.state.shopId+ '/login/phone'
            },3000)*/
            return false
        }
    }
}
export default {indexService}