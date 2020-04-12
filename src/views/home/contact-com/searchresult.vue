<template>
  <div class="searchres-container">
      <myheader>
          <template v-slot:left>
          <div class="chat-back" @click="$router.go(-1)">
            <Icon type="ios-arrow-back" size="24"></Icon>
          </div>
        </template>
        <template v-slot:title>
          查找结果
        </template>
        <span></span>
      </myheader>

    <div v-for="item in frditem" :key="item._id">
        <findfrd :item="item"></findfrd>
    </div>
    

      
  </div>
</template>

<script>
import myheader from '@/components/index/header.vue'
import findfrd from '@/components/other/findfrditem.vue'
export default {
    data(){
        return{
            frditem:[]
        }
    },
    components:{
        myheader,
        findfrd
    },
    methods:{
        async getallusers(){
            const {data:res} = await this.axios.get('/allusers')
            this.frditem = res.res
            if(res.meta.status !=200){
                this.$Message.error('用户列表获取失败!')
            }
        }
    },
    created(){
        this.getallusers()
    }
}
</script>

<style lang="less" scoped>
.searchres-container{
     width: 100%;
     height: 100vh;
     background-color: #F5F6FA;
}
</style>