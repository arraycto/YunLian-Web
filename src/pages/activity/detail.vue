<template>
  <div class="" id="activity_detail">
    <!--活动信息板块-->
    <div class="activity-message">
        <!-- <p class="tuiguang"><i class="iconfont icon-iconfontdaohanggonggao"></i> 推广本活动，赚取积分！</p> -->
        <div class="activity-message-top">
          <p class="title">{{detail.activityTitle}}</p>
          <!-- <p class="browse">浏览：<span>234</span></p> -->
        </div>
        <div class="activity-message-bottom">
            <div class="activity-message-bottom-left">
              <div class="imgHead"><img v-if="detail.activityPoster != null" :src="detail.activityPoster | picTurn"></div>
                <p class="p1">分享到：<share :option="myShareOption" ref="myShare"></share></p>
                <p class="p2">
                    <i class="iconfont icon-shouji1"></i> 手机访问二维码
                    <span class="erweima" style="display:inline-block;">
                        <canvas class="canvas" id="canvas1"></canvas>
                    </span>
                </p>
            </div>
            <div class="activity-message-bottom-right">
                <div class="activity-message-bottom-right-1">
                    <span class="title">主办方：</span>
                    <p class="gs-name" @click="enterPublish(detail.publishUserId)">
                        <img :src="detail.pubUserHeadimg">
                        <span class="gs-con">{{detail.publishUser}}</span><i class="i1"></i></p>
                </div>
                <div class="activity-message-bottom-right-2">
                    <div class="activity-message-bottom-right-3-left"><img src="../../assets/image/shijian.png" alt=""> </div>
                    <div class="activity-message-bottom-right-2-right">
                        <p>{{detail.signupStartTime | stampFormate4}}&nbsp;至&nbsp;{{detail.signupEndTime | stampFormate4}}<span>{{state[detail.actStauts]}}</span></p>
                    </div>
                </div>
                <div class="activity-message-bottom-right-3">
                    <div class="activity-message-bottom-right-3-left"><img src="../../assets/image/didian.png" alt=""></div>
                    <div class="activity-message-bottom-right-3-right" v-if="detail.newcity!=detail.newprov" @click="enterMap()"><a>{{detail.prov}}{{detail.city}}{{detail.dist}}{{detail.activityAddress}}</a><span></span></div>
                    <div class="activity-message-bottom-right-3-right" v-if="detail.newcity==detail.newprov" @click="enterMap()"><a>{{detail.city}}{{detail.dist}}{{detail.activityAddress}}</a><span></span></div>
                </div>
                <div class="activity-message-bottom-right-4">
                    <div class="activity-message-bottom-right-3-left"><img src="../../assets/image/renwu.png" alt=""></div>
                    <div class="activity-message-bottom-right-4-right" v-if="detail.actApplyNum || detail.peoUpperLimit">
                        <p class="right-4-p1" v-if="detail.actApplyNum!= 0 && detail.showUsers==1" @click="showPeoList()"><span>{{detail.actApplyNum}}</span>人已报名/</p>
                        <!-- <p class="right-4-p1" @click="showPeoList()"><span>{{detail.actApplyNum}}</span>人已报名/</p> -->
                        <p class="right-4-p1" v-if="detail.peoUpperLimit">限{{detail.peoUpperLimit}}人</p>
                    </div>
                    <div class="activity-message-bottom-right-4-right2">
                        <div class="right-4-img2"></div>
                        <div class="right-4-img"></div>
                    </div>
                </div>
                <div class="activity-message-bottom-right-5">
                    <img src="../../assets/image/piao.png" alt="" style="position:absolute;left:4px;">
                    <div class="activity-message-bottom-right-5-right">
                        <div>
                            <el-radio-group v-model="radio1" @change="chooseTicket(radio1)">
                                <el-radio :label="item.id" border  class="wxz" v-for="(item,index) in tickets" :key="item.id">
                                    <span class="pricename">{{item.name}}</span> 
                                    <span v-if="item.price!=0" class="price">￥ {{item.price/100}}</span>
                                    <span v-if="item.price==0" class="price">免费票</span>
                                 </el-radio>
                                 <el-radio disabled :label="item1.id" border class="wxz nofree disable" v-for="(item1,index1) in notickets" :key="index1">
                                    <span class="pricename">{{item1.name}}</span> 
                                    <span v-if="item1.price!=0" class="price">￥ {{item1.price/100}}</span>
                                    <span v-if="item1.price==0" class="price">免费票</span>
                                 </el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                </div>
                <div class="activity-message-bottom-right-6">
                    <span v-if="showNum">{{singleTicket.detail}}</span>
                </div>
                <div class="activity-message-bottom-right-7">
                    <el-input-number size="mini" v-model="num1" @change="handleChange" :min="1" :max="singleTicket.limitNum*1" label="描述文字"></el-input-number>
                    <p v-if="showNum"><span>剩余{{singleTicket.leftNum}}张</span>/<span>限购{{singleTicket.limitNum}}张</span></p>
                </div>
                <div class="activity-message-bottom-right-8">
                    <!-- <div class="right-8-btn1" @click="apply()">立即报名</div> -->
                    <div class="right-8-btn1 box2" v-if="detail.actApplyStauts*1===1" @click="apply()">立即报名</div>
                    <div class="right-8-btn1 box2 " v-if="detail.actApplyStauts*1===0">
                        <div class="startapply">开始报名</div>
                        <div class="box-min">{{detail.signupStartTime | stampFormate2}}</div>
                    </div>
                    <div class="right-8-btn1 box2 gray-box" v-if="detail.actApplyStauts*1===2">活动已结束</div>
                    <div class="right-8-btn2" v-if="!isSave" @click="saveClick"><i class="iconfont icon-xianxingxing"></i> 收藏</div>
                    <div class="right-8-btn2" v-if="isSave" @click="saveClick"><i class="iconfont icon-xing" style="color:#389bff;font-size:19px;margin-right: 5px;"></i> 收藏</div>
                    <div class="right-8-btn3" v-if="!isLike" @click="likeClick"><i class="iconfont icon-xianxingzan"></i>赞</div>
                    <div class="right-8-btn3" v-if="isLike" @click="likeClick"><i class="iconfont icon-zan" style="color:#389bff;font-size:19px;margin-right: 5px;"></i>赞</div>
                </div>
            </div>
        </div>
        <div style="clear:both;"></div>
    </div>

    <!--活动详情-->
    <div class="quiz-title">
        <div class="quiz-text">
            <span>活动详情</span>
            <div class="blue_line"></div>
        </div>
        <div class="html-content" v-html="detail.activityDetails"></div>
        
    </div>
    <div class="quiz-title" style="margin-top:40px;">
        <!-- <div style="width:800px;">
            <comment :good="good" v-if="good"></comment>
        </div> -->
    </div>

    <!--活动详情（未完善）-->
    <div class="typo-box">
        
    </div>
      <add-info v-if="showAddInfo"  :postInfo="signInfo"></add-info>
      <div class="zhezhao" v-if="showPeople"></div>
      <div class="baoming" v-if="showPeople">
          <div class="top">
              <span>已报名的人</span>
              <i class="iconfont icon-guanbi" @click="showPeoList"></i>
          </div>
          <div class="bottom">
              <div class="hang" v-for="(item,index) in peopleList" :key="item.id">
                  <img :src="item.headImg | picTurn" alt="">
                  <span class="name">{{item.nickName}}</span>
                  <span class="time">{{item.createTime | stampFormate}}</span>
              </div>
              <load-more v-if="peopleList.length!=0" :page="page.num" :total="page.totalPage" :status="loadStatus" @loadMore="loadmore"></load-more>
          </div>
      </div>
      
  </div>
</template>
<script type="text/ecmascript-6">
import QRCode from 'qrcode'
import share from '../../component/common/share.vue'
import {commonService} from '../../service/commonService'
import {indexService} from '../../service/indexService'
import addInfo from './addInfo.vue'
import comment from '../../component/common/comment.vue'
  export default {
    // 添加以下代码
    metaInfo () {
        const title = this.title
        const desc = this.summary
        // console.log('des',this.$store.state.homeStore.article.summary)
        const keyword = this.keywordtag
        return {
            title,
            meta: [
                { vmid: 'description', name: 'description', content: desc },
                { vmid: 'keyWords', name: 'keyWords', content: keyword},
            ]

        }
    },
    asyncData({store,route}){
        function getDetail(){
            return indexService.getActDetail({activityId:route.params.id,}).then(function (res) {
                store.state.homeStore.actDetail = res.data.datas;
            });
        }
        return Promise.all([
            getDetail()
        ])
    },
    computed:{
         //将存在store中的数据取出
         // getter
         // setter
        detail: {
            get: function () { return this.$store.state.homeStore.actDetail || []},
            set: function (newValue) {return newValue}
        },
    },
    props: [],
    data () {
      return {
        title:'',
        summary:'',
        keywordtag:'',
        num1: 1,
        state:['未开始','进行中','已结束'],
        tickets:[],
        notickets:[],
        radio1:'',
        showNum:false,
        newIndex:'',
        singleTicket:{},
        key:'',
        isSave:false,
        isLike:false,
        myShareOption: {
            title: '',
            desc: '',
            summary: '',
            pics: ''
        },
          showAddInfo:false,
          signInfo:'',
          isFollowed:false,
          loadStatus:0,
          peopleList:[],
          page: { // 分页
            num: 1,
            size:10,
            totalCount: 0,
            totalPage:0
        },
        showPeople:false,
        showComment:false,
        good:null,
      }
    },
    components: {share,'add-info':addInfo,comment:comment},
    mounted () {
        //获取分享信息
        this.$refs.myShare.title = this.detail.activityTitle;
        this.title = this.detail.activityTitle;
        this.summary = this.detail.activityTitle;
        if(this.detail.actTag!=null && this.detail.actTag!=''){
           this.keywordtag = this.detail.actTag.join(',');
        }else{
           this.keywordtag = '';
        }
        this.$refs.myShare.desc = this.detail.activityAddress;
        this.$refs.myShare.pics = this.$store.state.picHead + this.detail.activityPoster;
        this.getTickets() //订单信息
        this.codelDetail() //手机二维码
        this.getPeople()
        let that = this;
        if(localStorage.token && localStorage.token!='undefined'){
            this.saveIs()
            this.likeIs()
            indexService.signActivity({actId:that.detail.id}).then(function(res){
                that.signInfo = res.data.datas
            })

        }
        this.good = {
            id:this.$route.params.id,type:2
        }
        // console.log(this.detail)
        window.scrollTo(0,0);
    },
    methods: {
        showPeoList(){
            this.showPeople = !this.showPeople
        },
        loadmore(i){
            //loadstatus为加载状态，每次收到接口数据后要修改该状态
            let that = this
            that.loadStatus = 1
            that.page.num = i
            that.getPeople()
        },
        getPeople(){
            const that = this
            indexService.getApplyPeople({
                id:that.$route.params.id,
                pageNo:that.page.num,
                pageSize:that.page.size
            }).then(function (res) {
                let tabInfo = res.data.datas;
                that.page.totalPage = tabInfo.totalPage
                that.page.totalCount = tabInfo.totalCount == null ? 0 : parseInt(tabInfo.totalCount);
                let newArr = tabInfo.datas;
                for(let i=0;i<newArr.length;i++){
                    that.peopleList.push(newArr[i]);
                }
                if(res.data.datas.pageNo>=res.data.datas.totalCount){
                    that.loadStatus = 2
                }else {
                     that.loadStatus = 0
                }
                
            });
        },
        enterMap: function () {
            const that = this
            
            let url = 'http://'+location.host+'/place?place='+ that.detail.city + that.detail.dist + that.detail.activityAddress
            // console.log(url)
            window.open('http://'+location.host+'/place?place='+ that.detail.city + that.detail.dist + that.detail.activityAddress);
            // http://localhost:9012/place?place=%E5%94%90%E5%B1%B1%E5%B8%82%E5%94%90%E5%B1%B1%E5%B8%82%E5%A4%A7%E5%8F%94%E5%A4%A7%E5%A9%B6%E5%90%A6
            // that.$router.push({
            //     name: 'activityPlace',
            //     query: {place: that.detail.city + that.detail.dist + that.detail.activityAddress}
            // })
        },
        enterPublish(id){
            const that = this
            if(localStorage.token && localStorage.token!='undefined'){
                indexService.isFollowMain({
                    userId:id
                }).then(function (res) {
                    that.isFollowed = res.data.datas
                    that.$router.push({name:'concernDetail',query:{id:id,isFollow:that.isFollowed}})
                })
            } else {
                that.$router.push({name:'concernDetail',query:{id:id,isFollow:that.isFollowed}})
            }
            
        },
        codelDetail:function(){
            const that = this
            let canvas1 = document.getElementById('canvas1');
            let url = window.location.href
            QRCode.toCanvas(canvas1, url, (error) => {
                if (error) {
                } else {
                }
            })
        },
         //是否收藏
        saveIs:function(){
            const that = this;
            indexService.isCollect({
                type:3,
                typeId: that.$route.params.id,
            }).then(function (res) {
                that.isSave = res.data.datas
            })
        },
        //是否点赞
        likeIs:function(){
            const that = this;
            indexService.isCollect({
                type:2,
                typeId: that.$route.params.id,
            }).then(function (res) {
                that.isLike = res.data.datas
            })
        },
        //点赞
        likeClick:function(){
            const that = this;
            let type1
            if(that.isLike == true){type1 = 0} else {type1 = 1}
            indexService.hasLikeAct({
                type:type1,
                activityId: that.$route.params.id,
            }).then(function (res) {
                that.isLike = !that.isLike
                if(localStorage.token && localStorage.token!='undefined'){
                    that.getsaveNum();
                }
            })
        },
        //收藏
        saveClick:function(){
            const that = this;
            if(localStorage.token && localStorage.token!='undefined'){
                let type2
                if(that.isSave == true){type2 = 0} else {type2 = 1}
                indexService.hasCollectAct({
                    type:type2,
                    activityId: that.$route.params.id,
                }).then(function (res) {
                    that.isSave = !that.isSave
                })
            } else {
                that.$router.push({name:'login'})
            }
        },
        apply(){
            const that = this
            if(localStorage.token && localStorage.token!='undefined'){
                that.checkTickets()
            } else {
                that.$router.push({name:'login'})
            }
        },
        //选择票种后初步检查是否可购
        checkTickets(){
            const that = this
            //接口未弄好
            if(that.radio1!=''){
                indexService.checkTicket({actId:that.$route.params.id,ticketId:that.radio1,num:that.num1}).then(function (res) {
                    that.coded(res.data)
                    // console.log('检查片',res.data.datas)
                });
            } else {
                that.$message({
                    type: 'info',
                    message: '请选择票种'
                });
            }
        },
        putTicket(){
            const that = this
            indexService.checkTicket({actId:that.$route.params.id,key:that.key}).then(function (res) {
                // if(){

                // }
            });
        },
      // getActDetail
      chooseTicket(item){
          const that = this
          that.showNum = true
          for(var i=0;i<that.tickets.length;i++){
                if(that.tickets[i].id == item){
                    that.newIndex = i
                }
            }
            that.singleTicket = that.tickets[that.newIndex]
            // console.log('徐哈',that.newIndex)
      },
      getTickets(){
        const that = this
        indexService.getTicketDetail({actId:that.$route.params.id,}).then(function (res) {
            // console.log('票务',res.data.datas);
            let oldTicket
            oldTicket = res.data.datas
            for(var i=0;i<oldTicket.length;i++){
                if(oldTicket[i].leftNum <= '0' || oldTicket[i].status == '0'){
                    that.notickets.push(oldTicket[i])
                }else{
                    that.tickets.push(oldTicket[i])
                }
            }
        });
      },
       getDetails(){
           const that = this
            indexService.getActDetail({activityId:that.$route.params.id,}).then(function (res) {
                that.$store.state.homeStore.actDetail = res.data.datas;
            });
        },
        goOrder(){
            this.$router.push({name:'purchase'})
        },
      handleChange(value) {
        // console.log(value);
      },
      // 判断code值
        coded: function(item) {
            const that = this;
            if(item.code === 200){
                that.showAddInfo=true;
            } else if (item.code === 517107){ //您有一个待支付订单,请先处理(datas会有待支付订单号) ===携带订单编号，跳转到订单页
                that.$confirm('您有一个待支付订单,请先处理!', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.goOrder()
                }).catch(() => {

                });
            } else if (item.code === 517109){ //您有一个待审核订单,请先处理(datas会有待审核订单号)  ===携带审核订单号，跳转到审核页面

                that.$confirm('您有一个待审核订单,请先处理!', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    that.goOrder()
                }).catch(() => {

                });
            } else if (item.code === 517117){ ////当前票太抢手了,请刷新重试
                // commonService.autoCloseModal(that,item.message,1)
                that.$message({
                    type: 'info',
                    message: item.message
                });
                setTimeout(function(){
                    that.$router.go(0)
                },500)
            } else{ //当前票种已售罄,请选择其它票种 === 刷新活动详情页
                // commonService.autoCloseModal(that,item.message,1)
                that.$message({
                    type: 'info',
                    message: item.message
                });
            }
        },
    }
  }
</script>
<style lang="less">
  #activity_detail{
      #comments .quiz-text div{
          margin-top: 9px!important;
      }
    //   position: relative;
    .erweima{position: absolute;top:271px;right:0px;}
    .tuiguang{
        position: absolute;
        bottom: 0px;
        left:0px;
        line-height: 32px;
        width:172px;height:32px;background: #FAFAFA;
        box-shadow: inset -1px 0 0 0 #EEEEEE, inset 0 1px 0 0 #EEEEEE;
        font-size: 12px;
        color: #20A0FF;
        .iconfont{
            margin-right: 3px;
            font-size: 14px;
            margin-left: 8px;
        }
        }
      /*--活动信息板块--*/
      .layui-breadcrumb{font-size: 14px;color: #303030;}
      .iconfont{color:#20A0FF;line-height: 27px}
      .icon-clock{color:#20A0FF;font-size: 20px;}
      .icon-xianxingxing{font-size: 19px;margin-right: 5px;color: #B2B2B2;}
      .icon-xianxingzan{font-size: 19px;margin-right: 5px;color: #B2B2B2;}
    .activity-dh{width:1200px;margin:25px auto;}
    .activity-message{position: relative;background:#ffffff;border:1px solid #dddddd;width:1136px;margin:auto;padding:26px 31px;margin-top: 40px;}
    .activity-message-top{box-shadow: inset 0 -2px 0 0 #EEEEEE;
    padding-bottom: 15px;
    overflow: hidden;
      .title{
        width: 1000px;
        float: left;
        font-size:22px;color:#303030;text-align:left;line-height: 30px;
      }
      .browse{float:right;margin-right:10px;font-size:13px; color:#999999;text-align:left;margin-top: 7px;}
    }
    .icon-shouji1{line-height: initial !important;color:#D8D8D8;}
    .el-input-number--mini{width: 110px;}
    .posicon{position: absolute;left: 0px;line-height: initial;}
    .activity-message-bottom{}
    .activity-message-bottom-left{position: relative;;width:452px;float:left;display: table-cell;vertical-align: middle;margin-top:25px;}
    .activity-message-bottom-left .imgHead{width: 100%;height: 226px;overflow: hidden;position: relative;}
    .activity-message-bottom-left img{width:100%;position: absolute;top: 50%;transform: translateY(-50%);}
    .activity-message-bottom-left .p1{font-size:14px;color:#999999;text-align:left;margin-top:17px;position:relative;float:left;}
    .activity-message-bottom-left .p1 a:nth-child(1){display:block;width:26px;height:26px;position: absolute;left:60px;top: -2px;}
    .activity-message-bottom-left .p1 a:nth-child(2){display:block;width:26px;height:26px;position: absolute;left:94px;top: -2px;}
    .activity-message-bottom-left .p1 a:nth-child(3){display:block;width:26px;height:26px;position: absolute;left:128px;top: -2px;}
    .activity-message-bottom-left .p1 a:hover{cursor: pointer;}
    .activity-message-bottom-left .p2{float:right;margin-top:17px;font-size:12px;color:#7c818b;text-align:left;position:relative;
    overflow:hidden;
    }
    .activity-message-bottom-left .p2:hover{cursor: pointer;overflow: visible !important;
        .erweima{visibility: visible !important;
        }
    }
    .activity-message-bottom-left .p2 span{display: block;width:16px;height:20px;float:left;}
    .activity-message-bottom-left .p2 .erweima{position:absolute;top:13px;background:#fff;left:-58px;box-sizing: border-box;padding:14px;}
    .activity-message-bottom-right{padding-bottom:30px;margin-left:30px;width:650px;right:0;overflow: hidden;min-height:400px;float:left;}
    .activity-message-bottom-right-1{font-size:0;background:#FFFEF3;width:656px;height:51px;line-height:51px;font-size:14px;color:#999999;position:relative;margin-top:25px;}
    .activity-message-bottom-right-1 .title{float:left;}
    .activity-message-bottom-right-1 .gs-name{margin-top:14px;font-size:15px;color:#20A0FF;line-height:24px;text-align:left;float:left;/*position:absolute;top: 14px;left: 55px;*/}
    .activity-message-bottom-right-1 .gs-name:hover{cursor: pointer;}
    .activity-message-bottom-right-1 .gs-name img{width:16px;height:16px;border-radius:50%;float: left;margin:3px 6px 0 6px;display:block;}
    .activity-message-bottom-right-1 .gs-name i{display: block;width:20px;height:20px;float:right;margin-left:6px;margin-top:10px;}
    // .activity-message-bottom-right-1 .gs-name .i1{background:url("../../images/PC/icon/triangle.png")no-repeat;}
    // .activity-message-bottom-right-1 .gs-name .i2{background:url("../../images/PC/icon/triangleup.png")no-repeat;}
    .activity-message-bottom-right-1 .gs-con{max-width:400px;white-space:nowrap;text-overflow:ellipsis;display:inline-block;overflow:hidden;}
    .activity-message-bottom-right-1 a{width:20px;height:21px;margin:15px 6px;display:inline-block;float:left;position:relative;}
    .activity-message-bottom-right-1 a:hover{cursor: pointer;}
    .activity-message-bottom-right-1 .browse{float:right;margin-right:10px;font-size:13px; color:#999999;text-align:left;}
    .activity-message-bottom-right-1 .telephone{display:none;width:101px;height:28px;position:absolute;left:25px;top:-5px;font-size:12px;color:#ffffff;letter-spacing:0px;line-height:12px;text-align:center;line-height:28px;}
    .activity-message-bottom-right-2{background:#ffffff;box-shadow:inset 0px -1px 0px 0px #f5f5f5;width:656px;height:50px;margin-top:10px;}
    .activity-message-bottom-right-2-left{width:16px;height:16px;float:left;margin-top:20px;}
    .activity-message-bottom-right-2-right{float:left;padding-top:13px;padding-left:20px;}
    .activity-message-bottom-right-2-right p:nth-child(1){font-size:15px;color:#555555;text-align:left;}
    .activity-message-bottom-right-2-right p:nth-child(1) span{background:#ffffff;border:1px solid #20A0FF;font-size:12px;color:#20A0FF;text-align:center;line-height:20px;padding:2px 6px;margin-left:10px;}
    .activity-message-bottom-right-2-right p:nth-child(2){font-size:13px;color:#999999;text-align:left;margin-top:10px;}
    .activity-message-bottom-right-3{background:#ffffff;box-shadow:inset 0px -1px 0px 0px #f5f5f5;width:656px;height:50px;}
    .activity-message-bottom-right-3-left{width:16px;height:20px;margin-top:14px;float:left;}
    .activity-message-bottom-right-3-right{width:601px;float:left;padding-left:20px;font-size:15px;color:#555555;line-height:50px;text-align:left;}
    .activity-message-bottom-right-3-right span{display: block;float:right;width:8px;height:14px;margin-top:18px;margin-left:40px;}
    .activity-message-bottom-right-3-right:hover{cursor: pointer;}
    .activity-message-bottom-right-3-right a{color:#555;display: block;float: left;max-width: 553px;overflow: hidden;height:50px;white-space:nowrap;text-overflow:ellipsis;}
    .activity-message-bottom-right-4{background:#ffffff;box-shadow:inset 0px -1px 0px 0px #f5f5f5;width:656px;height:50px;}
    .activity-message-bottom-right-4-left{width:16px;height:16px;float:left;margin-top:18px;}
    .activity-message-bottom-right-4-right{float:left;padding-left:20px;}
    .activity-message-bottom-right-4-right .right-4-p1{cursor: pointer;float:left;font-size:15px;color:#555555;text-align:left;line-height:56px;}
    .activity-message-bottom-right-4-right .right-4-p2{float:left;font-size:13px;color:#999999;text-align:left;line-height:57px;margin-left:8px;}
    .activity-message-bottom-right-4-right2{float:right;margin-right:18px;}
    .activity-message-bottom-right-4-right2 .right-4-img{z-index:0;float:right;width:90px;height:35px;margin-top:10px;position:relative;}
    .activity-message-bottom-right-4-right2 .right-4-img:hover{cursor: pointer;}
    .activity-message-bottom-right-4-right2 .right-4-img img{width:30px;height:30px;position:absolute;top:0;border-radius:50%;border:2px solid #fff;}
    .activity-message-bottom-right-4-right2 .right-4-img img:nth-of-type(1){left:56px;z-index:3;}
    .activity-message-bottom-right-4-right2 .right-4-img img:nth-of-type(2){left:28px;z-index:2;}
    .activity-message-bottom-right-4-right2 .right-4-img img:nth-of-type(3){left:0;z-index:1;}
    // .activity-message-bottom-right-4-right2 .right-4-img2{float:right;background:url("../../images/activity-pc/message-right.png")no-repeat;width:8px;height:14px;margin-top:20px;margin-left:15px;}
    .activity-message-bottom-right-5{padding:15px 20px 10px 20px;background: #F5F5F5;box-shadow: inset 0 -1px 0 0 #EEEEEE;position:relative;}
    // .activity-message-bottom-right-5-left{float:left;width:16px;height:16px;background:url("../../images/activity-pc/right-5-left.png")no-repeat;position:absolute;left:0;top:0;bottom:0;margin:auto;}
    .activity-message-bottom-right-5-right{margin-left:10px;overflow: hidden;}
    .activity-message-bottom-right-5-right button{background:#ffffff;border:1px solid #dddddd;width:188px;height:46px;float:left;margin:0 6px 10px 6px;position:relative;}
    .activity-message-bottom-right-5-right button span{display: none;background:#bbbbbb;width:40px;height:20px;position:absolute;top:0;right:0;color:#fff;font-size:12px;line-height:20px;text-align: center;}
    .activity-message-bottom-right-5-right button:hover{cursor: pointer;}
    .activity-message-bottom-right-5-right button p:nth-child(2){font-size:12px;color:#fc6651;text-align:center;}
    .activity-message-bottom-right-5-right .btn-span{display: block;}
    .activity-message-bottom-right-5-right .check{background:#ffffff;border:1px solid #20A0FF;box-shadow:0px 2px 4px 0px rgba(211,234,218,0.50);width:188px;height:46px;color:#5fb878;}
    .activity-message-bottom-right-5-right .disable{background:#ededed;border:1px solid #dddddd;width:188px;height:46px;}
    .activity-message-bottom-right-6{min-height: 5px;background:#fff;margin-left:36px;width:600px;color:#999999;font-size:13px;margin-top:10px;margin-bottom:10px;}
    .activity-message-bottom-right-7{margin-left:36px;position:relative;background:#fff;}
    .activity-message-bottom-right-7{
        .el-input__inner{
            width: 110px;
            border-radius: 0px;
        }
        .el-input-number--mini{
            border-radius: 0px;
        }
        .el-input-number--mini .el-input-number__decrease, .el-input-number--mini .el-input-number__increase{
            height: 26px;
            border-radius: 0px;
            overflow: hidden;
            background: #fff;
        }
        i{
            line-height: 26px;
            font-size: 18px;
            font-weight: 700;
            color:#20A0FF;
        }
        .el-icon-minus{
            // line-height: 26px;
            // color:#20A0FF;
        }
        .el-icon-plus{

        }
    }
    .activity-message-bottom-right-5-right{
        .el-radio__input{
            display: none;
        }
        .el-radio.is-bordered{
            width: 190px;
            height: 48px;
            margin-left: 0px !important;
            margin-right: 10px;
            margin-bottom: 10px;
            border: none;
            border-radius: 0px;
            text-align: center;
            line-height: 48px;
            padding: 0 !important;
            overflow: hidden;
        }
        .nofree{
            .pricename{
                position: absolute;
                top: -7px;
                transform: translateX(-50%);
                left: 50%;
                color:#555;
            }
        }
        .disable{
            .pricename{color:#BBBBBB !important;}
            .price{color:#BBBBBB !important;}
        }
        .pricename{
            position: absolute;
            top: -7px;
            transform: translateX(-50%);
            left: 50%;
            color:#555;
        }
        .el-radio__label{
            position: relative;
            font-size: 15px;
            color: #303030;
            padding: 0 !important;
        }
        .price{position: absolute;font-size: 12px;
    color: #FC6651;
    top: 12px;
    transform: translateX(-50%);
    left: 50%;}
        .el-radio__input.is-checked+.el-radio__label{color:#409eff;}
        .is-bordered.is-checked{background: url('../../assets/image/ticket2.png') !important;}
        .wxz{background: url('../../assets/image/ticket1.png')}
    }
    .activity-message-bottom-right-7 .right-7-btn1{background:#ffffff;border:1px solid #dddddd;width:28px;height:28px;background-position: 5px 5px;position:absolute;top:0px;left:57px;}
    .activity-message-bottom-right-7 .right-7-btn2{background:#ffffff;border:1px solid #dddddd;width:28px;height:28px;background-position: 5px 12px;position:absolute;top:0px;left:84px;}
    .activity-message-bottom-right-7 button:hover{cursor: pointer;}
    .activity-message-bottom-right-7 p{float:right;margin-right:330px;margin-top:4px;font-size:12px;color:#999;}
    .activity-message-bottom-right-7 p span{color:#999;}
    .activity-message-bottom-right-8{margin-top:35px;}
    .activity-message-bottom-right-8 .right-8-btn1{margin-left:36px;background:#20A0FF;border:1px solid #20A0FF;width:188px;height:46px;text-align: center;line-height: 46px;color:#fff;font-size:18px;float:left;}
    .activity-message-bottom-right-8 .right-8-btn1-1{margin-left:30px;background:rgba(94,184,120,0.50);border:1px solid #20A0FF;width:188px;height:46px;text-align: center;line-height: 46px;color:#fff;font-size:18px;float:left;}
    .activity-message-bottom-right-8 .right-8-btn1:hover{cursor: pointer;}
    .activity-message-bottom-right-8 .right-8-btn2{ margin-left:15px;border:1px solid #eeeeee;width:116px;height:46px;background-position: 23px 13px;float:left;text-align: center;line-height:46px;box-sizing: border-box;font-size:18px;background:#FAFAFA;}
    .activity-message-bottom-right-8 .right-8-btn2-1{ background-position: 23px 13px;}
    .activity-message-bottom-right-8 .right-8-btn2:hover{cursor: pointer;}
    .activity-message-bottom-right-8 .right-8-btn2 span{font-size:14px;color:#999999;text-align:left;margin-left:5px;}
    .activity-message-bottom-right-8 .right-8-btn3{margin-left:15px;/*border:1px solid #eeeeee;*/width:116px;height:46px;background-position: 23px 13px;float:left;text-align: center;line-height:46px;box-sizing: border-box;font-size:18px;}
    .activity-message-bottom-right-8  .a1{margin-left:30px;border:1px solid #eeeeee;width:142px;height:46px;background-position: 23px 13px;float:left;text-align: center;line-height:46px;padding-left:20px;box-sizing: border-box;font-size:18px;}
    .activity-message-bottom-right-8 .right-8-btn3:hover{cursor: pointer;}
    .activity-message-bottom-right-8 .right-8-btn3 span{font-size:14px;color:#999999;text-align:center;margin-left:4px;}
    /*--主办方--*/
  .sponsor{display:none;background:#ffffff;border:1px solid #cccccc;box-shadow:0px 2px 4px 0px rgba(186,186,186,0.50);width:322px;height:203px;position: absolute;top:40px;left:52px;z-index:5;box-sizing: border-box;}
  .sponsor-top{width:100%;height:130px;padding:15px;}
  .sponsor-left{background:#ffffff;border:1px solid #d9d9d9;width:104px;height:104px;padding:1px;float:left;}
  .sponsor-left img{width:100%;height:100%;}
  .sponsor-right{float:left;width:175px;margin-left:10px;}
  .sponsor-right .sponsor-p1{width:160px;line-height:18px;font-size:16px;color:#5fb878;text-align:left;white-space:nowrap;text-overflow:ellipsis;display:block;overflow:hidden;}
  .sponsor-right .sponsor-p2{height:60px;line-height: 20px;margin-top:10px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden;}
  .sponsor-right .sponsor-p3{font-size:12px;color:#5fb878;text-align:left;line-height: 40px;}
  .sponsor-bottom{background:#fafafa;box-shadow:inset 0px 1px 0px 0px #eeeeee;width:320px;height:41px;position:relative;}
  .sponsor-bottom .sponsor-bottom-p{font-size:14px;color:#555555;text-align:left;position:absolute;top:-2px;left:133px;}
  .sponsor-bottom-p:hover{cursor: pointer;}
  .quiz-title{
      width: 1200px;
      margin: 0 auto;
      margin-top: 15px;
    .quiz-text{
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        color: #303030;
        position: relative;
        span{margin-left: 20px;}
        .blue_line{
            position: absolute;
            left:0;
            top: 9px;
            background: #20A0FF;
            width: 4px;
            height: 20px;
        }
      }
  }
  .zhezhao{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.35);
    height: 100%;
    width: 100%;
    z-index: 100;
    overflow-y: hidden;
  }    
    .baoming{
        width: 600px;
        background: #FFFFFF;
        border: 1px solid #CCCCCC;
        box-shadow: 0 2px 4px 0 rgba(187,187,187,0.50);
        position: fixed;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index:150;
        .top{
            padding: 0 20px;
            height: 43px;
            line-height: 43px;
            box-shadow: inset 0 -1px 0 0 #DDDDDD;
            span{
                font-size: 16px;
                color: #303030;
            }
            .icon-guanbi{
                color: #B2B2B2 !important;
                font-size: 16px;
                float: right;
                margin-top: 10px;
                cursor: pointer;
            }
        }
        .bottom{
            width: 100%;
            height: 450px;
            overflow-y: auto;
            .hang{
                height: 50px;
                box-shadow: inset 0 -1px 0 0 #F5F5F5;
                img{
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    margin-left: 20px;
                    line-height: 50px;
                    float: left;
                    margin-top: 8px;
                }
                .name{
                    font-size: 14px;
                    color: #303030;
                    margin-left: 6px;
                    float: left;
                    margin-top: 16px;
                }
                .time{
                    margin-top: 16px;
                    font-size: 14px;
                    color: #999999;
                    margin-right: 20px;
                    float: right;
                }
            }
        }
        .bottom::-webkit-scrollbar{
            width: 2px;
            background-color: rgba(0, 0, 0, 0.34);
        }
        .bottom::-webkit-scrollbar-track{
            background-color: #F5F5F5;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.22);
        }
    }
    .gray-box{
        cursor:initial !important;
        border: 1px solid #eee !important;
        background: #fafafa !important;
        color:#666 !important;
    }
    .startapply{
        cursor:initial !important;
        height: 28px;
        line-height: 30px;
        font-size: 17px;
    }
    .box-min{
        cursor:initial !important;
        height: 20px;
        line-height: 17px;
        font-size: 12px;
    }
  }
</style>