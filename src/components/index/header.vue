<template>
  <div class="header">
      <div class="header-avatar">
          <slot name="left">
                <router-link :src="img" alt="" :to="{name:'setmyself'}" tag="img"/> 
          </slot>
      </div>
      <div class="header-title">
          <slot name="title">{{title}}</slot>
      </div>
      <div class="header-icon">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            img: this.$store.state.userinfo.img,
            title: ''
        }
    },
    created(){
        switch(this.$route.path){           
            case '/contacts':
                this.title = '联系人'
                break
            case '/message':
                this.title = '消息'
                break
            default:
                this.title = '发现'
        }

  }
}
</script>

<style lang="less" scoped>
    .header{
        background: linear-gradient(to right,#00C3FE,#01BAFF,#00A9FE);
        height: 50px;
        width: 100%;
        padding: 1% 3%;
        margin-bottom: 10px;
        border-radius: 0 0 2px 3px;
        box-shadow: 0 0 2px 1px #01BAFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .header-avatar{
        display: flex;
        align-items: center;
        img{
            width: 45px;
            height: 45px;
            border-radius: 50%;
        }
        i{
            color: #fff;
        }
    }
    .header-title{
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        letter-spacing: .1em;
        font-family: "Microsoft YaHei"
    }
    .header-icon{
        i{
            font-size: 24px;
            color: #fff;
        }
    }
</style>