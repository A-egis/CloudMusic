<template>
  <div class="container" @click="toPlaylistDetail">
    <div class="coverContainer">
      <header v-if="copywriter">{{songList.copywriter}}</header>
      <div class="views" :class="copywriter?'viewsToggle':''">
        <i class="iconfont icon-earphone"></i>
        {{songList.playCount | views}}
      </div>
      <img :src="songList.picUrl || songList.coverImgUrl" :alt="songList.name" />
      <i class="iconfont icon-play"></i>
      <div class="creator" v-if="creator">
        <i class="iconfont icon-user"></i>
        {{songList.creator.nickname}}
      </div>
    </div>
    <div class="title">{{songList.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    songList: Object,
    copywriter: {
      type: Boolean,
      required: false,
      default: false
    },
    creator: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    // 跳转歌单详情
    toPlaylistDetail () {
      this.$router.push({ path: `/playlist?id=${this.songList.id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 20px;
  .coverContainer {
    width: 100%;
    height: 200px;
    position: relative;
    &:hover {
      header {
        top: 0;
        transition: 0.3s;
      }
      .icon-play {
        opacity: 1;
        transition: 0.2s;
      }
      .viewsToggle {
        opacity: 0;
        transition: 0.2s;
      }
    }
    header {
      position: absolute;
      left: 0;
      font-size: 14px;
      color: #fff;
      line-height: 25px;
      background: rgba(0, 0, 0, 0.5);
      height: 50px;
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      top: -50px;
      overflow: hidden;
      display: flex;
      align-items: center;
    }

    .views {
      position: absolute;
      color: #fff;
      top: 0;
      right: 0;
      height: 25px;
      line-height: 25px;
      width: 80px;
      text-align: right;
      padding-right: 10px;
      font-size: 14px;
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5)
      );
      opacity: 1;
      .iconfont.icon-views {
      }
    }
    img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
    }

    .icon-play {
      position: absolute;
      right: 10px;
      bottom: 13px;
      width: 40px;
      height: 40px;
      color: #fff;
      font-size: 46px;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
    }

    .creator {
      position: absolute;
      width: 100%;
      bottom: 0;
      height: 30px;
      line-height: 30px;
      color: #fff;
      font-size: 12px;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5)
      );
      display: flex;
      align-items: center;
      .icon-user {
        font-size: 12px;
        padding-left: 10px;
        padding-right: 5px;
      }
    }
  }

  .title {
    width: 100%;
    box-sizing: border-box;
    height: 50px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
