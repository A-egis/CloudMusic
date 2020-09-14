<template>
  <div class="mvi-container" @click="toMVDetail">
    <div class="cover">
      <header v-if="copywriter">{{mv.copywriter}}</header>
      <div class="views" :class="copywriter?'viewsToggle':''">
        <i class="iconfont icon-views"></i>
        {{mv.playCount | views}}
      </div>
      <img :src="mv.picUrl || mv.cover" :alt="mv.name" />
      <div class="duration" v-if="duration">{{mv.duration|duration}}</div>
    </div>
    <div class="info">
      <div class="title">{{mv.name}}</div>
      <div class="artist">{{mv.artistName}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mv: Object,
    copywriter: {
      type: Boolean,
      required: false,
      default: false
    },
    duration: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    // 跳转MV详情
    toMVDetail () {
      this.$router.push({ path: `/mvplay?id=${this.mv.id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.mvi-container {
  width: 250px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 20px;
  .cover {
    position: relative;
    &:hover {
      header {
        top: 0;
        transition: 0.3s;
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
      line-height: 30px;
      background: rgba(0, 0, 0, 0.5);
      height: 30px;
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      top: -30px;
      overflow: hidden;
      align-items: center;
      text-overflow: ellipsis;
      white-space: nowrap;
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
    .duration {
      position: absolute;
      width: 100%;
      bottom: 4px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      font-size: 12px;
      padding-left: 10px;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5)
      );
    }

    img {
      width: 100%;
    }
  }

  .info {
    .title {
      height: 20px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }

    .artist {
      font-size: 12px;
      color: #888888;
    }
  }
}
</style>
