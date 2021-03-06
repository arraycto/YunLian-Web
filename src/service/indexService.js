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
    // 热门作者
    gethotAuthor: function(params){
        return axios.get('/authors/hot'+ this.getParam(params))
    },
    // 热门活动
    gethotActivity: function(params){
        return axios.get('/activities/hot'+ this.getParam(params))
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
    //isFollowMain是否关注社群号
    isFollowMain: function(params){
        return axios.get('/isFollow'+ this.getParam(params))
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
    /*  是否收藏接口 */
    isCollect:function(params){
        return axios.get('/users/collect/exist' + this.getParam(params));
    },
    /*  是否收藏 */
    hasCollect:function(params){
        return axios.post('/articles/'+params.articleId+'/collect' + this.getParam(params))
    },
    /*  是否点赞 */
    hasLike:function(params){
        return axios.post('/articles/'+params.articleId+'/like' + this.getParam(params))
    },
    // 文章阅读数+1
    articleRead: function(params){
        return axios.post('/articles/'+params.articleId+'/readnum' + this.getParam(params))
    },


     /*  活动是否收藏 */
     hasCollectAct:function(params){
        return axios.post('/activities/'+params.activityId+'/collect' , qs.stringify(params))
    },
    /*  活动是否点赞 */
    hasLikeAct:function(params){
        return axios.post('/activities/'+params.activityId+'/like' , qs.stringify(params))
    },
    // 活动
    getActList: function(params){
        return axios.get('/activities'+ this.getParam(params))
    },
    //获取参加活动人的头像
    getApplyPeople: function(params){
        return axios.get('/activities/people'+ this.getParam(params))
    },
    // 活动
    getColumns: function(params){
        return axios.get('/columns'+ this.getParam(params))
    },
    // 作者/主办方
    getAuthor: function(params){
        return axios.get('/allAdminUser'+ this.getParam(params))
    },
    // 活动详情
    getActDetail:function(params){
        return axios.get('/activities/'+params.activityId)
    },
    // 票务信息
    getTicketDetail:function(params){
        return axios.get('/activities/'+params.actId+'/tickets')
    },
    //分页字典
    getDictionaries:function(params){
        return axios.get('/dictionarys/list'+ this.getParam(params))
    },
    // 字典
    getDictionary:function(params){
        return axios.get('/dictionarys/'+params.classId)
    },
    //支付页面
    //选择票种后初步检查是否可购
    checkTicket: function(params){
        return axios.post('/activities/'+params.actId+'/check',qs.stringify(params))
    },
    /* 获取列表 */
    postApplyInfo: function (params) {
        return axios.post('/activities/'+params.actId+'/apply/',qs.stringify(params))
    },
    /* 获取列表 */
    createOrder: function (params) {
        return axios.post('/activities/'+params.actId+'/order/',qs.stringify(params))
    },
    /* 获取列表 */
    signActivity: function (params) {
        return axios.get('/activities/'+params.actId+'/sign/'+this.getParam(params))
    },
    /* 获取列表 */
    getOrder: function (orderNo) {
        return axios.get('/orders/'+orderNo)
    },
    /* （本地）获取订单内容 */
    getOderform: function (params) {
        return axios.post('/orders/',qs.stringify(params))
    },
    /*   订单详情页请求  */
    orderItem:function(id){
        return axios.get('/orders/' + id)
    },
    //购买票下单去支付
    putOrder: function(params){
        return axios.post('/activities/'+params.actId+'/order' ,qs.stringify(params))
    },
    // 点击订阅产品包价格查询
    // subscribeOrder: function(params){
    //     return axios.put('/productpkgs/subscribe' + this.getParam(params))
    // },
    // // 获取orderNo
    // orderSubmit: function(params){
    //     return axios.put('/productpkgs/ordersubmit', qs.stringify(params))
    //     // return axios.put('/productpkgs/ordersubmit' + this.getParam(params))
    // },
    // // 支付页面生成支付二维码
    // getErweima: function(params){
    //     return axios.put('/orders' + this.getParam(params))
    // },
    // 用户是否购买过产品包
    mySinglePro:function(params){
        return axios.get('/users/getBought'+ this.getParam(params))
    },
    /* 申请主办方 */
    postApplyadmin:function(params){
        return axios.post('/applyadmin',qs.stringify(params));
    },
    /* 查看名称是否可用 */
    getNamecheck:function(params){
        return axios.get('/namecheck' + this.getParam(params));
    },
    /* 查看账号是否可用 */
    getAccountcheck:function(params){
        return axios.get('/accountcheck' + this.getParam(params));
    },
    /* 是否已经申请主办方 */
    getIsApplyAdmin:function(params){
        return axios.get('/isApplyAdmin' + this.getParam(params));
    },
    // 查询当前ip
    // getIp:function(params){
    //     return axios.post('/ip',qs.stringify(params));
    // },
    getIp: function(params){
        return axios.get('/ip'+ this.getParam(params))
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
