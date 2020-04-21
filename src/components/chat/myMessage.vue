<template>
  <div class="he-chat-item my-chat-item">
          <div class="content-box">
            <p v-if="data.name">{{data.name}}</p>
            <div class="he-chat-i-content my-chat-i-content">
              {{data.cont}}
            </div>
          </div>
          
          <img :src="data.img" alt="">
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['data']
}
</script>

<style lang="less" scoped>

</style>