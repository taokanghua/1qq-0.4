<template>
    <div class="logo">
      <Icon :type="params.icon" :size="params.iconSize" class="login-icon" />
      <h1>{{ params.text }}</h1>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:['params']
}
</script>
<style lang="less" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 20%;
  .login-icon {
    color: royalblue;
  }
  h1 {
    line-height: 52px;
    margin-left: 0.2em;
  }
}
</style>