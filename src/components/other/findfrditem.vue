<template>
  <router-link :to="{name:'persondetail', params:{id: item.id}}" class="findfrd-container" tag="div">
      <img :src="item.img" alt="">
      <div class="findfrd-info">
          <h4>{{item.nickname}} <Icon type="ios-female" v-if="item.gender!='男'" color="pink"></Icon><Icon v-else type="ios-male" color="blue"></Icon></h4>
          <p>{{item.selfdesc}}</p>
      </div>
  </router-link>
</template>

<script>
export default {
    data(){
        return{
            // item:{gender:'女'}
        }
    },
    props:['item'],
    methods:{
    }
}
</script>

<style lang="less" scoped>
.findfrd-container{
    display: flex;
    align-items: center;
    padding: 0 3% 5px 3%;
    border-bottom: 1px solid #d7dde4;
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
        }
        p{
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap; 
            text-align: left;  
        }
    }
    
}
</style>