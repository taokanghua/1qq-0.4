<template>
  <router-link :to="{name:'charpage',params:{id:info.nickname}}" class="findfrd-container" tag="div">
      <img :src="info.img" alt="">
      <div class="findfrd-info">
          <h4>{{info.nickname}} <Icon type="ios-female" v-if="info.gender!='男'" color="pink"></Icon><Icon v-else type="ios-male" color="blue"></Icon></h4>
          <p>[{{online?'在线':'离线'}}]  {{info.selfdesc}}</p>
      </div>
  </router-link>
</template>

<script>
export default {
    data(){
        return{
            info:'',
            online:''
            // item:{gender:'女'}
        }
    },
    methods:{
        async getinfo(){
            const {data:res} = await this.axios.get('/checkuser/'+this.id)
            this.info = res.res
            const {data: online} = await this.axios.get('/getstatus/'+this.id)
            this.online = online.online
        }
    },
    props:['id'],
    created(){
        this.getinfo()
    }
}
</script>

<style lang="less" scoped>
.findfrd-container{
    display: flex;
    align-items: center;
    padding: 0 3% 5px 3%;
    margin-bottom: 8px;
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    .findfrd-info{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
        h4{
            text-align: left;
            color: #464c5b;
        }
        p{
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; 
            text-align: left;  
            color: #657180;
        }
    }
    
}
</style>