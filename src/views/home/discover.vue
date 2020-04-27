<template>
  <div class="discover-container">
    <div class="header" >
      <div class="title">
        <h4>动态</h4>
        <p>
          <span class="iconfont icon-Settings"></span>
          <router-link :to="{name:'editdiscover'}" class="iconfont icon-add" tag="span"></router-link>
        </p>
      </div>
      <div class="info">
        <img src="http://taokanghua.cn/sources/avatar/21.jpg" alt="">
      </div>
    </div>
    <div class="dicover-con">
      <div class="discover-item" >
        <div class="dis-header">
          <div class="dis-left">
            <img src="http://taokanghua.cn/sources/avatar/11.jpg" alt="">
            <div class="dis-info">
              <h4>帅帅兔</h4>
              <div class="time">
                今天08:40
                <span>可有可无的</span>
              </div>
            </div>
          </div>
          <Icon type="ios-more" class="more"></Icon>
        </div>
        <!-- 用户内容栏 -->
        <div class="dis-content">
          关关雎鸠，在河之洲。窈窕淑玉，君子好逑。
          <div class="img-box">
              <img v-lazy="'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=675663775,1168515943&fm=26&gp=0.jpg'" alt="">

          </div>
        <p class="device">手机用户</p>
        </div>
        <!-- 底部点赞 评论栏 -->
        <div class="dis-tools">
          <div class="dis-scan">浏览4次</div>
          <div class="tool">
            <span class="iconfont icon-dianzan_active"></span>
            <span class="iconfont icon-message1"></span>
            <span class="iconfont icon-share"></span>
          </div>
        </div>
        <!-- 评论和点赞列表栏 -->
        <div class="dis-commont">
          <div class="goodbox">
            <span class="iconfont icon-dianzan_active"></span>
            拿做吉他唱歌
          </div>
          <input type="text" placeholder="评论">
        </div>
      </div> <!--discover-item  end-->
      
    </div>

    <tabbar></tabbar>
  </div>
  
</template>

<script>
import tabbar from '@/components/index/tabBar.vue'
export default {
  data(){
    return{
    }
  },
  methods:{},
  components:{
    tabbar
  },
  created(){
    console.log()
  }
}
</script>

<style lang="less" scoped>
.discover-container{
  width: 100%;
  max-height: 100%;
  background-color: #F5F6FA;
  overflow: auto;
}
.header{
  padding: 1em 5px;
  height: 32vh;
  // background-color: skyblue;
  background-image: url(http://taokanghua.cn/sources/1584695205266.jpeg);
  background-size: cover;
  position: relative;
  .title{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    h4{
      font-size: 14px;
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    p{
      color: #fff;
      span{
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }
  .info{
    position: absolute;
    left: 1.4em;
    bottom: 2em;
    img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
.dicover-con{
  padding:8px 6px 47px 6px;
  overflow: auto;
  background-color: #fff;
  .discover-item{
    text-align: left;
    margin-bottom: 15px;
    .dis-header{
      display: flex;
      justify-content: space-between;
      .dis-left{
        display: flex;
        img{
          width: 45px;
          height: 45px;
          border-radius: 50%;
          box-shadow: 0 0 2px 1px #ccc;
        }
        .dis-info{
          text-align: left;
          margin-left: 10px;
          color: #404553;
          .time{
            font-size: 12px;
            span{
              margin-left: 8px;
            }
          }
        }
      }
      .more{
        font-size: 24px;
        color: slategray;
      }
    }
    .dis-content{
      margin-top: 16px;
      font-weight: 600;
      .img-box{
        width: 100%;
        height: 100%;
        img{
          max-width: 100%;
        }
      }
      
      .device{
        font-size: 12px;
        font-weight: bold;
      }
    }
    .dis-tools{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #F4F5F9;
      .dis-scan{
        font-size: 12px;
        color: #B3B6BD;
      }
      .tool{
        span{
          font-size: 28px;
          margin-left: 8px;
        }
      }
    }
    .dis-commont{

      .goodbox{
        color: #3E6185;
        span{
          font-size: 20px;
          color: skyblue;
        }
      }
      input{
        width: 100%;
        border: none;
        outline: none;
        padding:3px 0 3px 12px;
        border-radius: 5px;
        background-color: #F4F5F9;
      }
    }
  }
}
</style>