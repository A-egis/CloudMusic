<template>
  <div class="container">
    <div class="cover" @click="playMusic">
      <img :src="music.picUrl" :alt="music.name" />
      <i class="iconfont icon-play"></i>
    </div>
    <div class="info">
      <div class="top-info">
        <span class="name">{{music.name}}
          <span class="alias">{{(music.song.alias)|alias}}</span>
        </span>
        <span class="mv" v-if="music.song.mvid!==0">
          <router-link :class="'mvlink'" :to="`/mvplay?id=${music.song.mvid}`">
            <i class="iconfont icon-mv"></i>
          </router-link>
        </span>
      </div>
      <div class="artists">{{music.song.artists | artists}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    music: Object
  },
  methods: {
    // 播放音乐
    playMusic () {
      this.getMusic(this.music).then((music) => {
        // commit mutation
        this.$store.commit('updateMusic', { music })
      })
    },
    // 获取音乐详情
    getMusic (item) {
      return new Promise((resolve) => {
        const id = item.id
        var music = {
          title: item.name,
          artist: this.$options.filters.artists(item.song.artists),
          src: '',
          pic: item.picUrl,
          lrc: ''
        }
        axios
          .get(`/lyric?id=${id}`)
          .then((res) => {
            // 获取歌词
            if (res.data.lrc && res.data.lrc.lyric) { music.lrc = res.data.lrc.lyric } else music.lrc = '暂无歌词'
            return axios.get(`/song/url?id=${id}`)
          })
          .then((res) => {
            // 获取资源url
            music.src = res.data.data[0].url
            resolve(music)
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('获取资源失败')
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100px;
  width: 50%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  box-sizing: border-box;

  &:hover {
    background-color: #e3e3e5;
    .cover .icon-play {
      opacity: 1;
      transition: 0.2s;
    }
  }
  .cover {
    width: 80px;
    height: 80px;
    position: relative;
    cursor: pointer;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
    }
    .icon-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      border-radius: 50%;
      font-size: 36px;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
    }
  }

  .info {
    display: flex;
    padding: 10px;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    .top-info {
      display: flex;
      align-items: center;
      .name {
        font-size: 16px;
        .alias {
      padding-left: 5px;
      font-size: 12px;
      color: #aaa;
    }
      }
      .mv {
        padding-left: 5px;
        .mvlink {
          text-decoration: none !important;
          color: $theme-color;
        }
      }
    }

    .artists {
      color: #888888;
      font-size: 12px;
    }
  }
}
</style>
