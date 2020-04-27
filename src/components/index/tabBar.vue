<template>
  <div class="tabbar-container">
    <div class="tabbar">
      <router-link :to="{name:'message'}" tag="div" class="tabbar-item">
        <Badge :count="$store.state.count">
            <Icon type="ios-chatboxes"></Icon>
        </Badge>
        <p>消息</p>
      </router-link>
      <router-link :to="{name:'contact'}" tag="div" class="tabbar-item">
        <Icon type="ios-people"></Icon>
        <p>联系人</p>
      </router-link>
      <router-link :to="{name:'discover'}" tag="div" class="tabbar-item">
        <Icon type="ios-nutrition"></Icon>
        <p>发现</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
 
    }
  },
  watch:{

  },
  methods:{

  },
  created(){

  }
};
</script>

<style lang="less" scoped>
.tabbar-container {
  width: 100%;
  height: 100%;
}
.tabbar{
    width: 100%;
    background-color: #F9F9F9;
    padding-top: 5px;
    position: absolute;
    left: 0;
    bottom: 0;

    display: flex;
    justify-content: space-around;
}
.tabbar-item {

    sup{
        height: 13px;
        padding: 0px 2px;
        line-height: 0;
        top: -3px;
        }
  i {
    font-size: 25px;
  }
  p {
    font-size: 11px;
  }
}
</style>
