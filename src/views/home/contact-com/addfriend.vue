<template>
  <div class="addfriend-container">
      <myheader>
          <template v-slot:left>
          <div class="chat-back" @click="$router.go(-1)">
            <Icon type="ios-arrow-back" size="24"></Icon>
          </div>
        </template>
        <template v-slot:title>
          添加好友/群
        </template>
        <span></span>
      </myheader>
      <!-- 搜索框 -->
      <div class="search-box">
          <input type="search" class="add-search" placeholder="输入kk号查找好友....">
          <Icon type="ios-search" class="search-icon" size="24"></Icon>
      </div>
    <!-- 搜索菜单栏 -->
    <div class="search-menu">
        <div class="menu-item" v-for="item in menulist" :key="item.text">
            <div class="menu-left">
                <span :class="item.icon+' iconfont'"></span>
                <span class="text">{{item.text}}</span>
            </div>
            <div class="menu-right">
                <Icon type="ios-arrow-forward" class="menu-icon" size="20"></Icon>
            </div>     
        </div>
    </div>

    <!-- 特殊栏 -->
    <div class="all">
        <Icon type="ios-heart" size="20" color="red"></Icon>
        <span>当前所有已注册用户</span>
        <Icon type="ios-arrow-forward" class="menu-icon" size="20" color="#979FB4"></Icon>
    </div>
      
  </div>
</template>

<script>
import myheader from '@/components/index/header.vue'
export default {
data(){
    return{
        menulist:[
            {icon: 'icon-phone', text: '添加手机联系人', link: 'phonecon'},
            {icon: 'icon-scan', text: '扫一扫添加好友', link: 'sanfrd'},
            {icon: 'icon-radaricon', text: '面对面添加好友', link: 'facefrd'},
            {icon: 'icon-serch', text: '按条件查找', link: 'conditionf'},
            {icon: 'icon-message', text: 'kk扩列', link: 'kuolie'},   
            {icon: 'icon-iconmorendizhi', text:'查看附近的人', link: 'nearf'}
        ]
    }
},
components:{
    myheader
}
}
</script>

<style lang="less" scoped>
.addfriend-container{
    width: 100%;
    height: 100vh;
    background-color: #F5F6FA;
    .all{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 10px 2%;
        background-color: #fff;
        margin-top: 12px;
        span{
            position: absolute;
            left: 9%;
            font-weight: 600;
        }
    }
}
.search-box{
    position: relative;
    margin-bottom: 15px;
    .add-search{
        width: 100%;
        border: none;
        outline: none;
        padding: 8px 5px 8px 26px;
    }
    .search-icon{
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }
}
.search-menu{
    width: 100%;
    .menu-item{
        padding: 10px 2%;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: #fff;
        .menu-left{
            width: 60%;
            display: flex;
            align-items: center;
            .iconfont{
                font-size: 20px;
                color: #979FB4;
            }
            .text{
                font-size: 14px;
                margin-left: 10px;
                font-weight: 600;
            }
        }
        .menu-right{
            width: 100%;
            display: flex;
            justify-content: flex-end;
            color: #979FB4;
        }
    }
}

</style>