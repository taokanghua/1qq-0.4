<template>
    <div class="login-back-container" @click="goback">
        <Icon type="md-arrow-back" size="32" class="back-icon"/>
    </div>
</template>
<script>
export default {
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="less" scoped>
.login-back-container{
    position: fixed;
    left: 3%;
    top: 3%;
    .back-icon{
        color: #808695;
    }
}
</style>