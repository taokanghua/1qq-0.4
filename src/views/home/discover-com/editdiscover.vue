<template>
  <div class="editdis-container">
    <div class="edit-header">
      <span @click="$router.go(-1)">取消</span>
      <h3>说说</h3>
      <div @click="publishDynamic">发表</div>
    </div>
    <div class="edit-content">
      <div class="edit-con-info">
        <img :src="$store.state.userinfo.img" alt="" />
        <span>{{$store.state.userinfo.nickname}}</span>
        <input type="text" placeholder="个性标题..." maxlength="8" v-model="dynamic.personal">
      </div>
      <textarea name="" id="" placeholder="分享新鲜事..." v-model="dynamic.content"></textarea>
      <div class="edit-img">
        <img :src="item" alt="" class="chooseimg" v-for="item in imglist" :key="item+''">
        <div class="select-img">
          <label for="file">
            <img src="@/assets/pic.png" alt="" />
            <p>选择图片...</p>
          </label>
          <input type="file" name="file" id="file" @change="selectimg" ref="file" multiple/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      imglist:[],
      dynamic:{
        uniq: this.$store.state.userinfo.id+Date.now(),
        id: this.$store.state.userinfo.id,
        name: this.$store.state.userinfo.nickname,
        time: new Date(),
        content:'',
        personal:'',
        show:true, //删除了就修改这个值
        imgs:this.imglist, // 选择的图片列表
        local:'',  //地名
        looknum:'', // 浏览次数
        comment:[], 
        goods:[]  //点赞列表
      }
    }
  },
  methods:{
    async selectimg(){
      let formdata = new FormData()
      let num = 0
      this.$refs.file.files.forEach(item=>{
        formdata.append('img'+num, item)
        num ++
      })
      // formdata.append('img', this.$refs.file.files[0])
      // console.log(formdata.get('img'))
      let {data:res} = await this.axios.post('/upload', formdata)
      this.imglist.push(res.path)
      this.dynamic.imgs = this.imglist
    },
    publishDynamic(){
      console.log(this.dynamic)
    },
    async getlocal(){
      let ip = {ip:returnCitySN["cip"]}
      // console.log(ip)
      let {data:res} = await this.axios.post('/getlocal/', this.qs.stringify(ip))
      if(res.status != 0){
        this.dynamic.local = '定位获取失败!'
      }else{
        this.dynamic.local = res.content.address_detail.city
      }
      
    }
  },
  created(){
    this.getlocal()
    
  }
};
</script>

<style lang="less" scoped>
.editdis-container {
  width: 100vw;
  height: 100vh;
  background-color: #f2f3f7;
}
.edit-header {
  height: 50px;
  padding: 0 1em;
  color: #fff;
  background-color: #6532d7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    font-weight: bold;
    padding: 3px 8px;
    border-radius: 10px;
    background-color: #b299ec;
  }
}
.edit-content {
  min-height: 50vh;
  background-color: #fff;
  padding:5px 8px;
  margin-top: 10px;
  text-align: left;
  .edit-con-info {
    display: flex;
    align-items: center;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    span {
      font-size: 15px;
      font-weight: bold;
      margin-left: 10px;
    }
    input{
      outline: none;
      border: none;
      margin-left: 24px;
      font-size: 12px;
      color: chocolate;
      
    }
  }
  textarea {
    width: 100%;
    min-height: 24vh;
    border: none;
    font-size: 15px;
    font-weight: 500;
    padding-left: 4px;
    outline: none;
  }
  .edit-img {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    .chooseimg{
      width: 32%;
      height: 100px;
      margin-bottom: 4px;
      margin-right: 1%;
    }

    .select-img {
        width: 32%;
        height: 100px;
        // margin-left: 8px;
        background-color: #ccc;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            border-radius: 50%;
        }
      input {
        display: none;
      }
      p{
          font-size: 12px;
      }
    }
  }
}
</style>
