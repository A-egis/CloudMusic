<template>
  <div id="app">
    <div class="home-container">
      <el-header class="header">
        <div class="logo-container" @click="toHome">
          <i class="iconfont icon-logo"></i>
          <span class="logo-title">云音乐</span>
        </div>
        <div class="forward-container">
          <i class="iconfont icon-backward" @click="backward()"></i>
          <i class="iconfont icon-forward" @click="forward()"></i>
        </div>
        <div class="search-input-container">
          <el-input placeholder="请输入关键词" v-model="keywords" @keyup.enter.native="handleSearch">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="handleSearch"></i>
          </el-input>
        </div>
      </el-header>
      <div class="content">
        <el-aside class="nav" width="200px">
          <el-menu
            default-active="/discover"
            class="el-menu-vertical-demo"
            background-color="#F5F5F7"
            text-color="#000000"
            router
          >
            <el-menu-item
              class="menu-item"
              v-for="item in navList"
              :key="item.id"
              :index="item.path"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </div>
      <el-footer class="footer">
        <div class="player-container">
          <aplayer autoplay showLrc repeat="repeat-one" theme="#dd6d60" :music="music" id="aplayer"></aplayer>
        </div>
      </el-footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Aplayer from "vue-aplayer";
export default {
  name: "app",
  components: {
    Aplayer,
  },
  data() {
    return {
      navList: [
        {
          id: 1,
          title: "发现音乐",
          icon: "iconfont icon-discover",
          path: "/discover",
        },
        {
          id: 2,
          title: "推荐歌单",
          icon: "iconfont icon-songList",
          path: "/songList",
        },

        {
          id: 3,
          title: "最新音乐",
          icon: "iconfont icon-latest",
          path: "/latest",
        },
        {
          id: 4,
          title: "最新MV",
          icon: "iconfont icon-mv",
          path: "/mv",
        },
      ],
      keywords: "",
    };
  },
  computed: mapState({
    music: (state) => state.music,
  }),
  mounted() {
    const pl = document.getElementById("aplayer");
    pl.style.overflow = "hidden";
  },
  methods: {
    // 跳转搜索页搜索
    handleSearch() {
      if (this.keywords == "") return;
      this.$router.push({ path: `/search?keywords=${this.keywords}` });
    },
    // 后退
    backward() {
      this.$router.go(-1);
    },
    // 前进
    forward() {
      this.$router.go(1);
    },
    // 回到首页
    toHome() {
      this.$router.push({ path: "/" });
    },
  },
  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>

<style lang="scss">
@import "./assets/css/global.scss";
.home-container {
  height: 100%;
  .header {
    height: 60px;
    background-color: #fafafa;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .logo-container {
      margin-right: 40px;
      height: 60px;
      line-height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 25px;
      box-sizing: border-box;
      cursor: pointer;
      .iconfont {
        font-size: 20px;
        color: $theme-color;
      }
      .logo-title {
        padding-left: 10px;
        color: #333;
        font-size: 20px;
      }
    }
    .forward-container {
      width: 100px;
      margin: 0 20px;
      text-align: center;
      .iconfont {
        box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.1),
          -18px -18px 30px rgba(255, 255, 255, 1);
        color: $theme-color;
        font-size: 18px;
        padding: 10px;
        border-radius: 50%;
        // background-color: #fff;
        margin-right: 10px;
        box-sizing: border-box;
        cursor: pointer;
        transition: boxshadow 0.2s ease-in-out;
        &:hover {
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1),
            0px 0px 0px rgba(255, 255, 255, 1),
            inset 18px 18px 30px rgba(0, 0, 0, 0.1),
            inset -18px -18px 30px rgba(255, 255, 255, 1);
          transition: boxshadow 0.2s ease-in-out;
        }
      }
    }
    .search-input-container {
      width: 300px;
      margin: 0 20px;
    }
  }
  .content {
    padding: 60px 0 100px 0;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    .el-menu {
      height: 100%;
      .iconfont {
        padding-left: 22px;
        padding-right: 20px;
        font-size: 18px;
        font-weight: 600;
        &.icon-mv {
          padding-left: 18px;
        }
      }
      .menu-item {
        font-size: 18px;
        display: flex;
        // justify-content: center;
        align-items: center;
      }
    }
  }
  .footer {
    height: 100px !important;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    .tips-container {
      width: 300px;
      position: absolute;
      top: 5px;
      right: 25px;
      z-index: 999;
    }
  }
}
</style>
