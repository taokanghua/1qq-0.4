<template>
  <div class="applyaddfrd-container">
    <myheader>
      <template v-slot:left>
        <div class="chat-back" @click="$router.go(-1)">
          <Icon type="ios-arrow-back" size="24"></Icon>
        </div>
      </template>
      <template v-slot:title>
        添加好友
      </template>
      <span></span>
    </myheader>

    <div class="applyaddfrd-info">
        <img :src="info.img" alt="">
        <div class="info">
            <h4>{{info.nickname}}</h4>
            <p>{{info.gender=='男'?'男':'女'}}  {{info.borndate | curage}}</p>
        </div>
    </div>
    <div class="apply-text">
        <p>填写验证信息</p>
       <textarea rows="4" class="textar" v-model="textarea"></textarea>
    </div>
    <i-button type="success" long class="apply-btn">立即发送</i-button>
  </div>
</template>

<script>
import myheader from "@/components/index/header.vue";
export default {
  data() {
    return {
        id: this.$route.params.id,
        info:'',
        textarea:''
    };
  },
  components: {
    myheader
  },
  methods:{
      async getinfo(){
          const {data:res} = await this.axios.get('/checkuser/'+this.id)
          this.info = res.res
        //   console.log(this.info)
          if(res.meta.status != 200){
              this.$Message.error('获取页面失败！')
          }
      }
  },
  created(){
      this.getinfo()
  },
  filters:{
      curage(v){
          // 这里会报错 不知道为啥
          if(!v) return false
          let date = new Date()
          let year = date.getFullYear()
          return year - parseInt(v.substr(0, 4)) + '岁'
      }
  }
};
</script>

<style lang="less" scoped>
.applyaddfrd-container{
    height: 100vh;
    background-color: #F5F6FA;
}
.applyaddfrd-info{
    padding: 0 3%;
    display: flex;
    align-content: center;
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-left: 12px;
        text-align: left;
        p{
            font-size: 12px;
            color: #B5B9C3;
        }
    }
}
.apply-text{
    margin-top: 20px;
    text-align: left;
    p{
        font-size: 14px;
        margin-bottom: 5px;
        color: #B5B9C3;
        text-indent: 10px;
    }
    .textar{
        width: 100%;
        padding: 10px 3%;
        border: none;
        outline: none;
        font-size: 14px;
        font-weight: bold;
    }
}
.apply-btn{
    height: 40px;
    margin-top: 30px;
}
</style>
