<template>
  <div class="he-chat-item">
          <img :src="data.img" alt="">
          <div class="content-box">
            <p v-show="data.name">{{data.name}}</p>
            <div class="he-chat-i-content">
              {{data.cont}}
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
    props:['data']
}
</script>

<style lang="less" scoped>

</style>