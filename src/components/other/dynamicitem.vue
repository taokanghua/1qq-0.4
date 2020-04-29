<template>
  <div class="discover-item" @click="addlook" :data-uniq="item.uniq" ref="q">
    <div class="dis-header">
      <div class="dis-left">
        <img :src="item.avatar" alt="" />
        <div class="dis-info">
          <h4>{{ item.name }}</h4>
          <div class="time">
            {{ item.time | timeF }}
            <span>{{ item.personal }}</span>
          </div>
        </div>
      </div>
      <Icon type="ios-more" class="more"></Icon>
    </div>
    <!-- 用户内容栏 -->
    <div class="dis-content">
      <span class="content">{{ item.content }}</span>
      <div class="img-box" ref="imgs">
        <viewer :images="item.imgs" class="img-box">
          <img v-lazy="i[0]" alt="" v-for="i in item.imgs" :key="i + ''" />
        </viewer>
      </div>
      <p class="device">
        <span class="iconfont icon-iconmorendizhi"></span>{{ item.local }}
      </p>
    </div>
    <!-- 底部点赞 评论栏 -->
    <div class="dis-tools">
      <div class="dis-scan">浏览{{ item.looknum }}次</div>
      <div class="tool">
        <span :class="{'iconfont':true, 'icon-dianzan_active':true, 'zan-active':zan}" @click="dianzan"></span>
        <span class="iconfont icon-message1"></span>
        <span class="iconfont icon-share"></span>
      </div>
    </div>
    <!-- 评论和点赞列表栏 -->
    <div class="dis-commont">
      <div class="goodbox" v-show="item.goods.length > 0">
        <span class="iconfont icon-dianzan_active icon-dianzan"></span>
        <span v-for="a in item.goods" :key="a.id+''">{{ a.name +'. '  }}</span>
        <a href="#" style="font-size:12px">觉得很赞</a>
      </div>
      <div class="comment-box">
        <div class="comment-item" v-for="c in item.comment" :key="c.comment">
          <h4>{{ c.name+':' }}</h4>
          <p>{{c.comment}}</p>
        </div>
        
      </div>
      <div class="edit-comment">
        <input type="text" placeholder="评论..." v-model="comment" @focus="sendbtn=true"/>
        <div class="edit-send" v-show="sendbtn" @click="sendcomment">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      zan: false, //是否点赞
      sendbtn:false, //发送按钮
      comment:''
    };
  },
  props: ["item"],
  methods: {
    checknum(n) {
      // 设置如果只一张照片 就大屏现实
      this.$nextTick(() => {
        if (n == 1) {
          this.$refs.imgs.className = "sing-img";
        }
      });
    },
    addlook() { // 增加浏览次数
      let uniq = this.$refs.q.getAttribute("data-uniq");
      this.axios.get("/dynamic/" + uniq);
    },
    async dianzan(){ //点赞  
        let data = {
            uniq: this.$refs.q.getAttribute('data-uniq'),
            id: this.$store.state.userinfo.id,
            name: this.$store.state.userinfo.nickname
        } 
        this.checkzan()
        if(!this.zan){
          let {data:res} = await this.axios.post('/dynamic/zan', this.qs.stringify(data))
          if(res.meta.status == 200) this.item.goods.push({id:data.id, name:data.name}) 
          if(res.meta.status !== 200){this.$Message.error('点赞失败')}

        }else{
          this.$Message.error('你已经点过赞了...')
        }        
    },
    checkzan(){
        this.item.goods.some(item=>{
            if(item.id == this.$store.state.userinfo.id){
                this.zan = true
                return true
            }
        })
    },
    async sendcomment(){ //发送评论
      if(this.comment == '') {
        this.$Message.warning('内容不能为空哦!')
        return
      }
      let data = {
        id: this.$store.state.userinfo.id,
        name: this.$store.state.userinfo.nickname,
        comment: this.comment,
        uniq: this.$refs.q.getAttribute("data-uniq")
      }
      let {data:res} = await this.axios.post('/postcomment', this.qs.stringify(data))
      if(res.meta.status == 200){
        this.$Message.success('评论成功！')
        this.item.comment.push(data)
      }
    }
  },
  created() {
    this.num = this.item.imgs.length;
    this.checknum(this.num);
    this.checkzan()
  },
  filters: {
    timeF(n) {
      let nowDate = new Date(); //现在的时间
      let date = new Date(n); //说说的时间
      let nowDay = nowDate.getDay();
      let day = date.getDay();

      let h = date
        .getHours()
        .toString()
        .padStart(2, "0");
      let m = date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let yue = date.getMonth() + 1;
      let ri = date.getDate();
      if (parseInt(nowDay) - parseInt(day) == 0) {
        return `今天 ${h}:${m}`;
      } else if (parseInt(nowDay) - parseInt(day) == 1) {
        return `昨天 ${h}:${m}`;
      } else {
        return `${yue}月${ri}月 ${h}:${m}`;
      }
    },
  },
};
</script>

<style lang="less">
    .comment-box{
      padding: 5px 0;
      font-size: 12px;
      .comment-item{
        display: flex;
        h4{
          color: black;     
          margin-right: 4px;
        }
      }
    }
    .zan-active{
        color: skyblue;
    }
    .icon-dianzan{
      font-size: 20px ;
      vertical-align: middle;
    }
    .edit-comment{
      display: flex;
      input{
        flex: 9;
      }
      .edit-send{
        color: #ffffff;
        border-radius: 5px;
        background-color: blue;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }
    }
</style>
