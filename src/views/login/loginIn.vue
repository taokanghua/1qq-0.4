<template>
  <div class="loginIn-container">
    <loginHeader :params=params></loginHeader>
    <!-- <div class="logo">
      <Icon type="logo-snapchat" size="52" class="login-icon" />
      <h1>KK</h1>
    </div> -->
    <!-- 账号表单 -->
    <div class="login">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem prop="account">
          <Input
            v-model="formValidate.account"
            placeholder="请输入账号"
            size="large"
            @on-blur="getavatar"
          />
          <img
            src="https://www.keaidian.com/uploads/allimg/190514/14161918_4.jpg"
            alt="用户头像"
            id="avatar"
            ref="avatar"
          />
        </FormItem>
        <FormItem prop="password">
          <Input
            v-model="formValidate.password"
            placeholder="请输入密码"
            size="large"
            type="password"
          />
        </FormItem>
      </Form>
    </div>

    <!-- 登录按钮 -->
    <div class="login-btn">
      <div class="btn" @click="getLogin">
        <Icon type="md-arrow-round-forward" class="login-btn" size="32"/>
      </div>
    </div>

    <!-- 底部帮助 -->
    <div class="footer">
      <router-link :to="{name:'forget'}" tag="span">忘记密码</router-link>
      <span>|</span>
      <router-link :to="{name:'loginUp'}" tag="span">用户注册</router-link>
    </div>

  </div>
</template>

<script>
import loginHeader from '@/components/login/login-header.vue'
export default {
  data() {
    return {
      formValidate: {
        account: "",
        password:""
      },
      ruleValidate: {
        // account:[{required:true, type: 'number', message:'账户不能为空', trigger: 'blur'}],
        password:[
          {required:true, message:'密码不能为空', trigger: 'blur'},
          {type:'string', min:5, max:12, message:'密码长度只能5~12位!', trigger:'blur'}
          ]
      },
      params:{
        icon: 'logo-snapchat',
        iconSize:52,
        text:'KK'
      }
    };
  },
  methods:{
    //登录
    getLogin(){
      this.$refs.formValidate.validate( async valid => {
        if(valid){
          const {data:res} = await this.axios.post('loginin',this.qs.stringify(this.formValidate))
          if(res.meta.status == 200){
            //保存token
            window.localStorage.setItem('kktoken', res.token)
            this.$store.state.userinfo = res.userinfo
            this.$router.push({name:'contact'})
          }else{
            this.$Message.error(res.content)
          }
        }else{
          this.$Message.error('表单验证失败')
        }
      })
    },
    //获取用户头像
    async getavatar(){
      if(this.formValidate.account.length < 5){
        return false
      }
      let data = {
        account: this.formValidate.account
      }
      const {data: res} = await this.axios.post('/question/getavatar', this.qs.stringify(data))
      if(res.meta.status != 200){
        return false
      }else{
          this.$refs.avatar.src = res.res.img
      }
    }
  },
  components:{
    loginHeader
  }
};
</script>

<style lang="less" scoped>
.loginIn-container{
  position: relative;
  height: 100vh;
  overflow: hidden;
}
// .logo {
//   display: flex;
//   justify-content: center;
//   align-content: center;
//   margin-top: 20%;
//   .login-icon {
//     color: royalblue;
//   }
//   h1 {
//     line-height: 52px;
//     margin-left: 0.2em;
//   }
// }
.login {
    margin: 12% 0;
    padding: 0 10%;
  #avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.login-btn{
  display: flex;
  justify-content: center;
  color: white;
  .btn{
    border-radius: 50%;
    background-color: #0F7FEF;
    padding: 16px 16px;
  }
}
.footer{
  width: 55%;
  font-size: 12px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
}
</style>
