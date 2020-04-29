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
        <img :src="$store.state.userinfo.img" alt="">
      </div>
    </div>
    <div class="dicover-con">
      <dynamicitem v-for="item in dynamic" :key="item._id" :item="item"></dynamicitem>
      <!--discover-item  end-->
    </div>

    <tabbar></tabbar>
  </div>
  
</template>

<script>
import tabbar from '@/components/index/tabBar.vue'
import dynamicitem from '@/components/other/dynamicitem.vue'
export default {
  data(){
    return{
      dynamic: []
    }
  },
  methods:{
    async getdynamics(){
      let {data:res} = await this.axios.get('getdynamic')
      this.dynamic = res.dynamic.reverse()
    }
  },
  components:{
    tabbar,
    dynamicitem
  },
  created(){
    // 获取动态
    this.getdynamics()
  }
}
</script>

<style lang="less">
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
              color: #43BC85;
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
      .content{
        width: 100px;

      }
      .img-box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        &:after{
          content: '';
          width: 32%;
        }
        img{
          width: 32%;
          height: 120px;
          margin-top: 5px;
        }
      }
      
      .device{
        margin-top: 6px;
        font-size: 12px;
        font-weight: bold;
        color: #FF4302;
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
          font-size: 13px;
          color: skyblue;
          border-bottom: 1px solid #F4F5F9;
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
.sing-img{
          img{
            width: 100% !important;
            height: 100% !important;
          }
          
        }
</style>