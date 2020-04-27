<template>
  <div class="contact-container">
    <myheader>
      <router-link
        :to="{ name: 'addfriend' }"
        tag="i"
        class="iconfont icon-tianjiayonghu"
      ></router-link>
    </myheader>
    <scrollcom
      :notify="notify.scrollnotify"
      v-if="notify.scrollnotify"
    ></scrollcom>

    <keep-alive>
      <div>
        <userlistitem
          v-for="item in friendlist"
          :key="item"
          :id="item"
        ></userlistitem>
      </div>
    </keep-alive>

    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "@/components/index/tabBar.vue";
import myheader from "@/components/index/header.vue";
import scrollcom from "@/components/other/scrollcom.vue";
import userlistitem from "@/components/other/userlistitem.vue";
export default {
  data() {
    return {
      friendlist: this.$store.state.userinfo.personlist.friends, //好友列表
      notify: "",
    };
  },
  methods: {
    async senduserinfo() {
      //获取用户昵称
      const { data: res } = await this.axios.get(
        "checkuser/" + this.$store.state.userinfo.id
      );
      this.$store.state.userinfo.nickname = res.res.nickname;
      // 发送用户信息到后台
      let d = this.$store.state.userinfo;
      let data = {
        id: d.id,
        img: d.img,
        nickname: d.nickname,
      };
      this.$socket.emit("userinfo", data);
    },
    async getnotiy() {
      //获取通知
      if(this.notify != '') return
      const { data: res } = await this.axios("/getsysnotify");
      this.notify = res.res;
      // console.log(this.notify.notify.title);
      if(this.notify.notify.title != ''){
        this.winnotify(this.notify.notify.title, this.notify.notify.desc)
      }
    },
    winnotify(title, content) {
      if(!this.notify) return
      if (this.$store.state.showTag) {
        this.$Notice.open({
          title: title,
          desc: content
        });
        this.$store.state.showTag = false;
      }
    },
  },
  components: {
    tabbar,
    myheader,
    scrollcom,
    userlistitem,
  },
  created() {
    this.senduserinfo();
    if (!this.notify) {
      this.getnotiy();
    }
    this.axios('/goonline/'+this.$store.state.userinfo.id) //更新用户状态
    //从服务器获取会话
    // to do  
    // 完成上传会话 现在要上传聊天记录 但是现在连不上数据库
    if(this.$store.state.userinfo){
      if(this.$store.state.showTag){
      this.$store.state.session = this.$store.state.userinfo.personlist.chat
      this.$store.state.showTag = false;
      console.log(this.$store.state.session)}
    }
  },
};
</script>

<style lang="less" scoped>
.contact-container {
  width: 100%;
  height: 100vh;
  background-color: #f5f6fa;
}
</style>
