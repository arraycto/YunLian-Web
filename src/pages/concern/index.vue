<template>
  <div class="" id="concern">
    
    <div class="title clearfix">
      <div class="titleli"><p :class="titlep==1?'v_p':''" @click="titleindex(1)">认证作者</p></div>
      <div class="titleli"><p :class="titlep==2?'v_p':''" @click="titleindex(2)">活动主办方</p></div>
    </div>
    <div class="author" v-if="titlep==1">推荐作者</div>
    <div class="author" v-if="titlep==2">推荐主办方</div>
    <div class="authorapply" @click="enterSponsor()">申请成为<span v-if="titlep==1">作者</span><span v-if="titlep==2">主办方</span></div>
    <div class="box clearfix">
       <div class="row" v-for="list in data" @click="goconcernDetail(list.id,list.isFollow)" :style="{backgroundImage: 'url(' + picHead + list.hostLogo + ')'}">
          <div class="rowbackimg">
           <div class="rowimg"><img :src="picHead + list.hostLogo" /></div>
           <div class="rowtitle">{{list.hostCompany}}</div>
           <div class="rowcon">{{list.hostDesc}}</div>
           <div class="rowlabel clearfix">
             <div class="rowlabell"><p v-if="list.subNum!=null">粉丝 {{list.subNum}} </p>
                                    <p v-if="list.subNum==null">粉丝 0 </p></div>
             <div class="rowlabelr" v-if="titlep==1"><p> 文章 {{list.addArticleNum==null?'0':list.addArticleNum}} </p></div>
             <div class="rowlabelr" v-if="titlep==2"><p> 活动 {{list.addActivityNum==null?'0':list.addActivityNum}} </p></div>
           </div>
           <div class="rowbtn1" @click="open2(list.id)" v-on:click.stop="doThis" v-if="list.isFollow==true">已关注</div>
           <div class="rowbtn2" @click="postFollow(list.id)" v-on:click.stop="doThis" v-if="list.isFollow==false"> + 关注</div>
           </div>
       </div>
     
    </div>
       <!--分页-->
    <div class="v_paging" v-if="inde>10">
        <el-pagination
            background
           layout="prev, pager, next, jumper"
           :current-page.sync="currentPage1"
           @current-change="handleCurrentChange"
           :total="inde">
    </el-pagination>
   </div>
   
  </div>
</template>
<script>
  import {modularService} from '../../service/modularService'
  export default {
    props: [],
    data () {
      return {
        title:'关注',
        titlep:1,
        currentPage1:1,
        inde:10,
        page:{
           num:1,
           size:8,
        },
        data:'',
      }
    },
    // asyncData({store,route}){
    //     function getType(){
    //         return modularService.getAllAdminUser({pageNo: 1, pageSize:8,adminType:1,type:true}).then(function (res) {
    //             store.state.homeStore.data = res.data.datas.datas
    //             store.state.homeStore.inde = res.data.datas.totalPage * 10
    //         });
    //     }
    //     return Promise.all([
    //         getType()
    //     ])
    // },
    computed: {
            picHead() {
                return this.$store.state.picHead
            },
            // data() {
            //    return this.$store.state.homeStore.data 

            // },
            //  inde() {
            //    return this.$store.state.homeStore.inde

            // },
        },
    // 添加以下代码
    metaInfo () {
        const title = this.title
        return {
            title
        }
    },
    mounted () {
      window.scrollTo(0,0);
      this.getAllAdminUser()
    },
    methods: {
      
       enterSponsor:function(){
        this.$router.push({name:'sponsor'})
      },
      // 
      goconcernDetail:function(id,isFollow){

          this.$router.push({path:"/concern/detail",query:{id:id,isFollow:isFollow}}) 
          // this.$router.replace({name:'concernDetail'})
      },
      titleindex:function(index){
              this.titlep=index
              this.page.num=1
              this.currentPage1=1
              this.getAllAdminUser()
      },
       //分页
      handleCurrentChange(val){
          this.page.num=val
          this.getAllAdminUser()
      },
      // 取消关注弹出层
      open2(id) {
        this.$confirm('是否取消关注?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '取消关注成功!'
          });
          this.putCancleFollow(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
      //获取所有社群号
      getAllAdminUser (){
        let that = this;
        modularService.getAllAdminUser({pageNo: that.page.num, pageSize:that.page.size,adminType:that.titlep,type:true}).then(function (res) {
                  if(res.data.code==200){
                      that.data=res.data.datas.datas
                      that.inde=res.data.datas.totalPage * 10
                  }
        });
      },
      //关注社群号
      postFollow (id){
        let that = this;

        modularService.postFollow({adminId:id}).then(function (res) {
                  if(res.data.code==200){
                       that.getAllAdminUser()
                        that.$message.success('关注成功');
                      //  that.data=res.data.datas.datas

                  }
        });
      },
     
       //获取我的关注
      // getMyFollow (){
      //   let that = this;
      //   modularService.getMyFollow({pageNo: that.page.num, pageSize:that.page.size,adminType:that.titlep,type:true}).then(function (res) {

      //             if(res.data.code==200){
      //                  that.data=res.data.datas.datas
      //                 that.inde=res.data.datas.totalPage * 10

              
                 
      //             }
      //   });
      // },
      putCancleFollow(id){
          let that=this
         modularService.putCancleFollow({adminId:id}).then(function (res) {

                  if(res.data.code==200){
                     that.$message.success('取消关注成功');
                     that.getAllAdminUser()
                 
                  }
        });

      }
    }
  }
</script>
<style lang="less">
  #concern{
    .title{
       height: 50px;
       background: #FFFFFF;
       width: 240px;
       margin: 54px auto 0;
         .titleli{
            float: left;
            width: 120px;
            height: 50px;
           p{
            background: #FFFFFF;
            border: 1px solid #EAEAEA;
            font-size: 16px;
            line-height: 50px;
            color: #303030;
            text-align: center;
            cursor: pointer;
           }
           .v_p{
              background: #20A0FF;
              color: #fff;
              border:none;
           }
         }

    } 
    .author{
            font-size: 18px;
            line-height: 24px;
            color: #303030;
            margin-top: 30px;
            text-align: center;
         }
         .authorapply{
            margin-top: 6px;
            font-size: 12px;
            line-height: 16px;
            color: #20a0ff;
            text-align: center;
            cursor: pointer;
         }
    .box{
      // padding: 5px 0 40px;
      width: 1200px;
      margin: 0 auto;
      .row{
        display:block;
         float: left;
         width: 277px;
         height: 314px;
         // padding:26px 16px 0;
         margin-top: 20px;
         margin-right: 20px;
         // background-image: url("../../assets/image/hot.png");
         background-size: 100% 100%;
         border-radius: 2px;
             .rowimg{
              // padding-top: 26px;
              // padding-top:26px;
              width: 60px;
              height: 60px;
              margin: 26px auto 0;
              border-radius: 50%;
              overflow: hidden;
                img{
                   width: 100%;
                   height: 100%;
                }
             }
             .rowtitle{
                 
                 font-size: 16px;
                 color: #333333;
                 line-height: 18px;
                 margin-top: 15px;
                 text-align: center;
             }
             .rowcon{
               padding: 0 16px;
                 font-size: 14px;
                 color: #999999;
                 margin-top: 11px;
                 line-height: 21px;
                 text-align: center;
                 height: 42px;
                 overflow: hidden;
             }
             .rowlabel{
               margin-top: 35px;
               width: 100%;
               // height: 19px;
               .rowlabell{
                 width: 50%;
                 float: left;
                 border-right: 1px solid #7F7F7F;
                 box-sizing: border-box;
                height: 14px;
                 p{
                   text-align: right;
                   padding: 0 8px;
                   font-size: 14px;
                   line-height: 14px;
                       color: #7F7F7F;
                 } 
               }
               .rowlabelr{
                width: 50%;
                 float: left;
                  p{
                   text-align: left;
                   padding: 0 8px;
                   font-size: 14px;
                   line-height: 14px;
                       color: #7F7F7F;
                 }
               }
             }
             .rowbtn{
                   // width: 100px;
                   // height: 34px;
                   // margin: 0 auto;
                   // border: 1px solid;
                   // border-color: -webkit-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                   // border-color: -moz-linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                   // border-image: linear-gradient(90deg,#FD9366, #77B9F8) 1 30;
                   // line-height: 34px;
                   // font-size: 14px;
                   // color: #3c4350;
                   // margin-top: 18px;
                   // text-align: center;
                   // cursor: pointer;
             }
             .rowbtn1{
                   width: 82px;
                   height: 34px;
                   margin: 0 auto;
                   border: 1px solid #20A0FF;
                   background: #fff;
                   line-height: 34px;
                   border-radius: 17px;
                   font-size: 14px;
                   color: #20A0FF;
                   margin-top: 18px;
                   text-align: center;
                   cursor: pointer;

             }
             .rowbtn2{
                   width: 82px;
                   height: 34px;
                   margin: 0 auto;
                   border: 1px solid #20A0FF;
                   // background-image: linear-gradient(-90deg, #508DFF 0%, #389BFF 34%, #26C5FE 89%, #3BB8FE 100%);
                   background-image: linear-gradient(-90deg, #3BB8FE 0%, #26C5FE 34%, #389BFF 89%, #508DFF 100%);
                   border-radius: 17px;
                   line-height: 34px;
                   font-size: 14px;
                   color: #fff;
                   margin-top: 18px;
                   text-align: center;
                   cursor: pointer;
             }
            .rowbackimg{
               background: #fff;
               width: 100%;
               height: 100%;
               border: 1px solid rgba(224,224,224,0.50);
               box-shadow: 0 5px 4px 0 rgba(202,202,202,0.10);
                border-radius: 2px;
                cursor: pointer;
            }
      }
      .row:hover .rowbackimg{

           background: rgba(221,243,255,0.7);
      }
      .row:nth-child(4n+4){
         margin-right: 0;
      }
    }
    .v_paging{
        width: 1200px;
        margin: 35px auto 0px;
    }
        
      
     }
</style>