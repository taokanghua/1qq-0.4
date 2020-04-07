<template>
  <div class="loginIn-container">
    <div class="logo">
      <Icon type="logo-snapchat" size="52" class="login-icon" />
      <h1>KK</h1>
    </div>
    <!-- 账号表单 -->
    <div class="login">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem prop="account">
          <Input
            v-model="formValidate.account"
            placeholder="Enter your name"
            size="large"
          />
          <img
            src="http://taokanghua.cn/sources/1584695205266.jpeg"
            alt="用户头像"
            id="avatar"
          />
        </FormItem>
        <FormItem prop="password">
          <Input
            v-model="formValidate.password"
            placeholder="Enter your password"
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
      <span>忘记密码</span>
      <span>|</span>
      <span>用户注册</span>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      formValidate: {
        account: "",
        password:""
      },
      ruleValidate: {
        account:[{required:true, type: 'number', message:'账户不能为空', trigger: 'blur'}],
        password:[
          {required:true, message:'密码不能为空', trigger: 'blur'},
          {type:'string', min:5, max:12, message:'密码长度只能5~12位!', trigger:'blur'}
          ]
      }
    };
  },
  methods:{
    //登录
    getLogin(){
      this.$refs.formValidate.validate( (valid) => {
        if(valid){
          this.$Message.success('表单验证通过')
        }else{
          this.$Message.error('表单验证失败')
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.loginIn-container{
  position: relative;
  height: 100vh;
  overflow: hidden;
}
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
  .btn{
    border-radius: 50%;
    background-color: #0F7FEF;
    padding: 16px 16px;
    .login-btn{
        color: white;
    }
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
