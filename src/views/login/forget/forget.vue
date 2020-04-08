<template>
  <div class="forget-container">
      <loginHeaderBack></loginHeaderBack>
      <loginHeader :params=params></loginHeader>
      <div class="forget-form">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="账号:" prop="account">
                <Input v-model="formValidate.account" placeholder="Enter your name" @on-blur="getques"/>
            </FormItem>  
            <FormItem label="密保问题:" prop="question" v-show="showbox.pwdques">
                <Input v-model="formValidate.question" placeholder="Enter your e-mail" disabled/>
            </FormItem>
            <FormItem label="密保答案:" prop="answer" v-show="showbox.pwdques">
                <Input v-model="formValidate.answer" placeholder="请输入密保答案..." :disabled="showbox.answer" @on-blur="checkans"/>
            </FormItem>
            <FormItem label="新密码:" prop="newpwd" v-show="showbox.newpwd">
                <Input v-model="formValidate.newpwd" placeholder="Enter your e-mail" />
            </FormItem>
          </Form>
      </div>
      <!-- 按钮 -->
      <div class="updatePwd" @click="checkform">
          <Icon type="ios-jet" size="52"/>
      </div>
  </div>
</template>

<script>
import loginHeaderBack from '@/components/login/login-header-back.vue'
import loginHeader from '@/components/login/login-header.vue'
export default {
    data(){
        return{
            params:{
                icon: "ios-key",
                iconSize: 52,
                text: "找回密码",
            },
            formValidate:{
                account:'',
                question:'',
                answer:'',
                newpwd:'',

            },
            ruleValidate:{
                newpwd:[
                    {required:true, message:'密码不能为空', trigger:'blur'},
                    {type:'string', max:12, min:5, message:'密码长度为5~12', trigger:'blur'}
                    ]
            },
            showbox:{
                pwdques:false,
                newpwd: false,
                answer:false
            }
        }
    },
    methods:{
        // 获取用户密保
        async getques(){
            if(this.formValidate.account == ''){
                this.$Message.error('请输入账号!')
            }else{
                let id = this.formValidate.account.trim()
                let {data:res} = await this.axios.get('/question/'+id)
                if(res.meta.status != 200){
                    this.$Message.error(res.content)
                }else{
                    this.formValidate.question = res.res.question
                    this.showbox.pwdques = true
                }
                // console.log(res)
            }
        },
        // 验证用户密保答案
        async checkans(){
            let data = {
                account: this.formValidate.account,
                answer: this.formValidate.answer
            }
            let {data: res} = await this.axios.post('/question/answer', this.qs.stringify(data))
            if(res.meta.status === 200){
                this.$Message.success(res.content)
                this.showbox.answer = true
                this.showbox.newpwd = true
            }else{
                this.$Message.error(res.content)
            }
        },
        checkform(){
            this.$refs.formValidate.validate(async valid=>{
                if(valid){
                    let data = {
                        account: this.formValidate.account,
                        password: this.formValidate.newpwd
                    }
                   let {data:res} = await this.axios.post('/question/changepwd', this.qs.stringify(data))
                   if(res.meta.status === 200){
                       this.$Message.success(res.content)
                       this.$router.push({name:'loginIn'})
                   }else{
                       this.$Message.error('我也不知道哪里出了问题')
                   }
                }else{
                    return false
                }
            })
        }
    },
    components:{
        loginHeaderBack,
        loginHeader
    }
}
</script>

<style lang="less" scoped>
.forget-container{
    position: relative;
    height: 100vh;
    overflow: hidden;
}
.forget-form{
    margin-top: 5%;
    padding:0 7% 0 4%;
}
.updatePwd{
    background-color: skyblue;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    bottom: 20%;
    transform: translateX(-50%);
    i{
        color: gray;
        animation: fly 2s linear infinite;
    }
}
@keyframes fly{
    0%{
        transform: translate(5px, -5px);
    }
    50%{
        transform: translate(0,0) rotate(10deg);
    }
    100%{
        transform: translate(5px, -5px) rotate(0deg);
    }
}
</style>