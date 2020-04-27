<template>
  <div class="chat-item" @click="letChat(item.id)">
      <img :src="item.img" alt="">
      <div class="chat-info">
        <div class="chat-head">
          <h4 :uid="item.id" ref="name">{{item.name}}</h4>
          <span>{{item.time | timeformat}}</span>
        </div>
        <div class="content-msg">
          <p>{{$store.state.roomcontent[item.room][$store.state.roomcontent[item.room].length-1].cont[0]}}</p>
          <div class="chat-msg-box" v-show="item.cont.length>0">{{item.cont.length}}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
          
        }
    },
    props:['item'],
    methods:{
    letChat(id){
      let sessCount = this.item.cont.length
      this.$store.state.count -= sessCount
      // let id = this.$refs.name
      this.$router.push({name:'charpage', params:{id}})
      // console.log(id)
      this.item.cont = []
      // this.$store.commit('getcount') //执行这个 重新计算count
    }
    },
    filters:{
        timeformat(date){
            let d = new Date(date)
            return d.getHours() + ':' + (d.getMinutes().toString()).padStart(2, '0')
        }
    }
}
</script>

<style>

</style>