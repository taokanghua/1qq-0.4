<template>
  <div class="loginup-container">
    <loginBack></loginBack>
    <loginHeader :params="params"></loginHeader>
    <!-- 注册表单 -->
    <div class="loginin-form">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="85"
      >
        <FormItem label="密码:" prop="pwd">
          <Input
            v-model="formValidate.pwd"
            placeholder="请输入密码"
            type="password"
          />
        </FormItem>
        <FormItem label="确认密码:" prop="enpwd">
          <Input
            v-model="formValidate.enpwd"
            placeholder="请再次输入密码"
            type="password"
          />
        </FormItem>
        <FormItem label="密保问题:" prop="question">
            <Select v-model="formValidate.question" placeholder="挑选你的密保问题">
                <Option :value="item" v-for="item in questionlist" :key="item">{{item}}</Option>
            </Select>
        </FormItem>
        <FormItem label="密保答案:" prop="answer">
            <Input v-model="formValidate.answer" placeholder="密保答案" />
        </FormItem>

        <Checkbox v-model="formValidate.checkAllGroup" class="form-checkbox">我已阅读协议，愿意遵守协议要求</Checkbox>
      </Form>
     </div> <!--注册表单结束 -->

    <div class="go-loginup" @click="checkForm">
        <Button type="primary" icon="md-checkmark" :disabled="!formValidate.checkAllGroup">立即注册</Button>
    </div>

  </div>
</template>
<script>
import loginBack from '@/components/login/login-header-back.vue'
import loginHeader from '@/components/login/login-header.vue';
export default {
  data() {
    return {
      questionlist:[],
      params: {
        icon: "md-log-in",
        iconSize: 52,
        text: "用户注册",
      },
      formValidate: {
          pwd:'',
          enpwd:'',
          question:'',
          answer:'',
          checkAllGroup: false,
          
      },
      ruleValidate: {
          pwd: [{required:true, message:'密码长度为5~12位', min:5, max:12, trigger:'blur'}],
          enpwd:[{required:true, validator:(rule, value, callback)=>{ //自定义验证规则
              if(value =="") return callback(new Error('请输入密码!'))
              else if(value != this.formValidate.pwd) return callback(new Error('两次密码不一致'))
              callback
          } ,trigger:'blur'}],
          question:[{required:true}],
          answer:[{required:true, message:'请输入密保答案', trigger:'blur'}]
      },
    };
  },
  components: {
    loginHeader,
    loginBack
  },
  methods:{
      // 验证表单
      checkForm(){
          this.$refs.formValidate.validate(valid => {
              if(valid){
                  this.$Message.success('表单验证通过')
              }else{
                  this.$Message.error('表单验证失败')
              }
          })
      },
      // 请求密保问题列表
      async getQuestionList(){
          const {data: res} = await this.axios.get('/questions')
          this.questionlist = res.questionList
      }
  },
  created(){
      this.getQuestionList()
  }
};
</script>
<style lang="less" scoped>
    .loginin-form{
        margin-top: 5%;
        padding:0 7% 0 4%;
        .form-checkbox{
            margin-top: 3%;
            color: #19BE6B;
            font-size: 12px;
        }
    }
    .go-loginup{
        margin-top: 8%;
    }
</style>
