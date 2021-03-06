/**
 * Created by zhong on 2017/10/24.
 *
 * (resolve) =>{require(['../components/test.vue'],resolve)}
 *
 */
import Vue from 'vue'
import store from './vuex'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 定义全局组件
import navbar from './component/common/navBar.vue'
import zmodal from './component/common/modal.vue'
import zbanner from './component/common/banner.vue'
import zfooter from './component/common/footer.vue'
import zhistory from './component/common/goback.vue'
import backhome from './component/common/back-home.vue'
import zlogo from './component/common/logo.vue'
import loadMore from './component/common/load-more.vue'

Vue.component('navbar', navbar)
Vue.component('z-modal', zmodal)
Vue.component('z-banner', zbanner)
Vue.component('z-footer', zfooter)
Vue.component('z-history', zhistory)
Vue.component('z-home', backhome)
Vue.component('z-logo', zlogo)
Vue.component('loadMore', loadMore)


// 定义组件
const short = (resolve) => {require(['./pages/short.vue'],resolve)}
const home = (resolve) => {require(['./pages/home/home.vue'],resolve)}
const search = (resolve) => {require(['./pages/home/search.vue'],resolve)}
const about = (resolve) => {require(['./pages/login/aboutUs.vue'],resolve)}
// 咨询
const news = (resolve) => {require(['./pages/consult/index.vue'],resolve)}
const passage = (resolve) => {require(['./pages/consult/detail.vue'],resolve)}
const keywords = (resolve) => {require(['./pages/consult/keywords.vue'],resolve)}
// 关注
const concern = (resolve) => {require(['./pages/concern/index.vue'],resolve)}
const concernDetail = (resolve) => {require(['./pages/concern/detail.vue'],resolve)}
const author = (resolve) => {require(['./pages/concern/author.vue'],resolve)}
// 活动
const activity = (resolve) => {require(['./pages/activity/index.vue'],resolve)}
const activityDetail = (resolve) => {require(['./pages/activity/detail.vue'],resolve)}
const createOrder = (resolve) => {require(['./pages/activity/create-order.vue'],resolve)}
const payment = (resolve) => {require(['./pages/activity/payment.vue'],resolve)} //支付页面
const activityPlace = (resolve) => {require(['./pages/activity/place.vue'],resolve)}
// 付费读
const subject = (resolve) => {require(['./pages/subject/index.vue'],resolve)}
const subjectDetail = (resolve) => {require(['./pages/subject/detail.vue'],resolve)}
// 资料库
const database = (resolve) => {require(['./pages/database/index.vue'],resolve)}
// 会员中心
const vip = (resolve) => {require(['./pages/vip/index.vue'],resolve)}
const vipPoints = (resolve) => {require(['./pages/vip/detail.vue'],resolve)}

//个人中心
const personal = (resolve) => {require(['./pages/personal/index.vue'],resolve)}
const purchase = (resolve) => {require(['./pages/personal/purchase.vue'],resolve)}
const collection = (resolve) => {require(['./pages/personal/collection.vue'],resolve)}
const integral = (resolve) => {require(['./pages/personal/integral.vue'],resolve)}
const follow = (resolve) => {require(['./pages/personal/follow.vue'],resolve)}
const code = (resolve) => {require(['./pages/personal/code.vue'],resolve)}
const notice = (resolve) => {require(['./pages/personal/notice.vue'],resolve)}
const setup = (resolve) => {require(['./pages/personal/setup.vue'],resolve)}
const ticket = (resolve) => {require(['./pages/personal/ticket.vue'],resolve)}
const sponsor = (resolve) => {require(['./pages/personal/sponsor.vue'],resolve)}

//品牌站
const brand = (resolve) => {require(['./pages/brand/index.vue'],resolve)}
const brandweb = (resolve) => {require(['./pages/brand/brandweb.vue'],resolve)}
const brandDatabase = (resolve) => {require(['./pages/brand/database.vue'],resolve)}
const brandImg = (resolve) => {require(['./pages/brand/brandImg.vue'],resolve)}
const brandNew = (resolve) => {require(['./pages/brand/brandNews.vue'],resolve)}


const alipay = (resolve) => {require(['./pages/activity/alipay.vue'],resolve)} //支付宝支付
const paySuccess = (resolve) => {require(['./pages/activity/payOk.vue'],resolve)} //支付成功


// 登录注册
const login = (resolve) => {require(['./pages/login/loginhome.vue'],resolve)} //密码登录页面
const phone = (resolve) => {require(['./pages/login/loginPhoneHome.vue'],resolve)} //手机号验证码登录页面
const register = (resolve) => {require(['./pages/login/registerHome.vue'],resolve)} //注册页面
const find = (resolve) => {require(['./pages/login/findHome.vue'],resolve)} //找回密码页
const bind = (resolve) => {require(['./pages/login/bindHome.vue'],resolve)} //绑定手机号
const qrcode = (resolve) => {require(['./pages/login/qrcode.vue'],resolve)} // 二维码登录
const modifyPass = (resolve) => {require(['./pages/login/modifyPass.vue'],resolve)} // 修改密码登
// const loginPhoneNo = (resolve) => {require(['./pages/login/loginPhoneNo.vue'],resolve)} //动态验证码登录页
// const register = (resolve) => {require(['./pages/login/register.vue'],resolve)} //用户注册页
const wxlogin = (resolve) => {require(['./pages/login/wxlogin.vue'],resolve)} //第三方授权微信跳转页
const bindQrcode = (resolve) => {require(['./pages/login/bindQrcode.vue'],resolve)}
const bindwxlogin = (resolve) => {require(['./pages/login/bindwxlogin.vue'],resolve)}
const agreement = (resolve) => {require(['./pages/login/agreement.vue'],resolve)}
// 404错误页面
const error = (resolve) => {require(['./pages/error.vue'],resolve)}

// 创建路由器实例，配置路由规则
const routers = [
    {path: '/d/:shortId', component: short},
    {name: 'home',path:'/',component: home, meta: {keepAlive: true}},
    {name: 'search',path:'/search',component: search},
    {name: 'about',path:'/about',component: about},
    {name: 'err',path:'/s/404',component: error}, //错误跳到404页面
    // 资讯
    {name: 'news',path:'/index/:id',component: news},
    {name: 'passage',path:'/article/:id',component: passage},
    {name: 'keywords',path:'/keywords/:id',component: keywords},
    // 关注
    {name: 'concern',path:'/concern',component: concern},
    {name: 'concernDetail',path:'/concern/detail',component: concernDetail},
    {name: 'author',path:'/author/:id',component: author},
    
    // 活动
    {name: 'activity',path:'/activities',component: activity},
    {name: 'activityDetail',path:'/activity/:id',component: activityDetail},
    {name: 'createOrder', path:'/order/:type/:comNo',component:createOrder},
    {name: 'payment',path:'/payment/:id/:type',component: payment},
    {name: 'alipay',path:'/alipay',component: alipay},
    {name: 'paySuccess',path:'/paySuccess',component: paySuccess},
    {name: 'activityPlace',path:'/place',component:activityPlace},
    // 付费阅读
    {name: 'subject',path:'/subject',component: subject},
    {name: 'subjectDetail',path:'/subject/:id',component: subjectDetail},
    // 资料库
    {name: 'database',path:'/database',component: database},
    // 会员
    {name: 'vip',path:'/vip',component: vip},
    {name: 'vipPoints',path:'/vip/points',component: vipPoints},
     //电子票
    {name: 'ticket',path:'/ticket/:id',component: ticket},
    // 申请成为主办方
    {name: 'sponsor',path:'/sponsor',component: sponsor},

    //个人中心
    // {name: 'personal',path:'/personal',component: personal},
    {name: 'personal',path:'/personal',component: personal,redirect:'/personal/purchase',
         children:[
          {name: 'purchase',path:'/orders',component: purchase},   //购买
          {name: 'collection',path:'/collect',component: collection},   //收藏
          {name: 'integral',path:'/personal/integral',component: integral},   //积分
          {name: 'follow',path:'/personal/follow',component: follow},   //关注
          {name: 'code',path:'/personal/code',component: code},   //总换码
          {name: 'notice',path:'/message',component: notice},   //通知
          {name: 'setup',path:'/setting',component: setup},   //设置
          ]
           },

    // 登录注册模块
    {name: 'login', path:'/login/password',component: login}, // 密码登录页
    {name: 'phone', path:'/login',component: phone}, // 手机号验证码登录页面
    {name: 'register', path:'/register',component: register}, // 注册页面
    {name: 'find', path:'/passwords/phone',component: find}, // 找回密码页面
    {name: 'bind', path:'/bind',component: bind}, // 绑定手机号
    {name: 'qrcode', path:'/qrcode',component: qrcode}, // pc
    {name: 'modifyPass',path:'/modifyPass',component: modifyPass}, // 修改密码
    // {name: 'password', path:'passlogin/password',component: login}, // 密码登录页
    // {name: 'find', path:'passwords/phone',component: forgotPwd}, // 密码找回页
    // {name: 'login', path:'login',component: login}, // 密码登陆
    // {name: 'register', path:'register',component: register}, // 注册页面
    {name: 'wxlogin', path:'/wxlogin',component: wxlogin}, // 微信跳转页
    {name: 'bindQrcode', path:'/bindQrcode',component: bindQrcode}, // 绑定微信二维码页面
    {name: 'bindwxlogin', path:'/bindwxlogin',component: bindwxlogin}, // 绑定微信页面
    {name: 'agreement', path:'/agreement',component: agreement}, // 条款页面
    //品牌站
    {name: 'brand', path:'/brand',component: brand},
    {name: 'brandweb', path:'/brandweb',component: brandweb},
    {name: 'brandDatabase', path:'/brandDatabase',component: brandDatabase},
    {name: 'brandImg', path:'/brandImg',component: brandImg},
    {name: 'brandNew', path:'/brandNew',component: brandNew},
]

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes:routers
})

let isClient = typeof window != 'undefined' ? true : false
router.beforeEach((to, from, next) => {

    next()
})
router.afterEach((to, from, next) => {

});

export default router