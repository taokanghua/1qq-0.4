<template>
  <div class="setmyself-container">
      <myheader>
          <template v-slot:left>
              <div class="chat-back" @click="$router.go(-1)">
                <Icon type="ios-arrow-back" size="24"></Icon>
            </div>
          </template>
          <template v-slot:title>
              编辑用户资料
          </template>
          <span></span>
      </myheader>

      <img :src="$store.state.userinfo.img" alt="" class="setmyself-avatar">

      <div class="setmyself-form">
        <Form :model="formItem" :label-width="80">
             <Form-item label="账号:">
            <i-input :value.sync="$store.state.userinfo.id" disabled></i-input>
            </Form-item>
          <Form-item label="昵称:">
            <i-input v-model="formItem.input" placeholder="请输入"></i-input>
          </Form-item>
          <Form-item label="性别:">
            <Select v-model="formItem.select" placeholder="请选择">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
            </Select>
        </Form-item>
        <Form-item label="出生日期:">
            <Date-picker format="yyyy年MM月dd日" type="date" placeholder="选择日期" style="width:100%" @on-change="time"></Date-picker>
          </Form-item>
          <Form-item label="个性说明:">
            <Input type="textarea" placeholder="请输入..." v-model="formItem.style" />
          </Form-item>
      </Form>
      <i-button type="success" long @click="updatemsg">确认提交</i-button>
      </div>
  </div>
</template>

<script>
import myheader from '@/components/index/header.vue'
export default {
    data(){
        return{
            date:'',
            formItem:{
                input:'',
                select:'',
                date:'',
                style:''
            }
        }
    },
    methods:{
        async updatemsg(){
            let data = {
                account: this.$store.state.userinfo.id,
                nickname: this.formItem.input,
                gender: this.formItem.select,
                borndate: this.formItem.date,
                setmyself: this.formItem.style,
                img: this.$store.state.userinfo.img
            }
           const {data:res} = await this.axios.post('/updatedata', this.qs.stringify(data))
           if(res.meta.status == 200){
               this.$Message.success(res.content)
               this.$router.push({name:'contact'})
           }else{
               this.$Message.error('我也不知道哪里出了问题')
           }
        },
        //获取时间
        time(t){
            this.formItem.date = t
        }
    },
    components:{
        myheader
    }

}
</script>

<style lang="less" scoped>
.setmyself-container{
    .setmyself-avatar{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-top: 5%;
        box-shadow: 0 0 2px 1px #ccc;
    }
}
.setmyself-form{
    margin-top: 10px;
    padding: 0 5%;
}
</style>