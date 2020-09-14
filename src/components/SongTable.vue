<template>
  <el-table :data="songs" style="width: 100%" stripe border>
    <el-table-column type="index"></el-table-column>
    <el-table-column label="歌曲" min-width="300px" show-overflow-tooltip>
      <template slot-scope="scope">
        <div class="song-container">
          <div class="album-cover" v-if="album" @click="playMusic(scope.row)">
            <img class="album-cover" :src="scope.row.album.picUrl" :alt="scope.row.name" />
            <i class="iconfont icon-play"></i>
          </div>
          <span class="name" @click="playMusic(scope.row)">
            {{scope.row.name}}
            <span class="alias">{{(scope.row.alias||scope.row.alia)|alias}}</span>
          </span>
          <span class="mv" v-if="scope.row.mvid!==0&&scope.row.mv!==0">
            <router-link :class="'mvlink'" :to="`/mvplay?id=${scope.row.mvid||scope.row.mv}`">
              <i class="iconfont icon-mv"></i>
            </router-link>
          </span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="歌手" width="200px" show-overflow-tooltip>
      <template slot-scope="scope">
        <span>{{(scope.row.artists || scope.row.ar )|artists}}</span>
      </template>
    </el-table-column>
    <el-table-column label="专辑" width="300px" show-overflow-tooltip>
      <template slot-scope="scope">
        <span>{{(scope.row.album||scope.row.al)|album}}</span>
      </template>
    </el-table-column>
    <el-table-column label="时长" min-width="70px" show-overflow-tooltip>
      <template slot-scope="scope">
        <span>{{(scope.row.duration||scope.row.dt) | duration}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      required: true
    },
    album: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    // 播放音乐
    playMusic (row) {
      this.getMusic(row).then((music) => {
        // commit mutation
        this.$store.commit('updateMusic', { music })
      })
    },
    // 获取音乐详情
    getMusic (item) {
      return new Promise((resolve) => {
        const id = item.id
        const album = item.album || item.al
        const albumId = album.id
        var music = {
          title: item.name,
          artist: this.$options.filters.artists(item.artists || item.ar),
          src: '',
          pic: '',
          lrc: ''
        }
        axios
          .get(`/album?id=${albumId}`)
          .then((res) => {
            // 获取专辑封面
            music.pic = res.data.album.picUrl || ''
            return axios.get(`/lyric?id=${id}`)
          })
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
.song-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  .album-cover {
    width: 70px;
    height: 70px;
    position: relative;
    margin-right: 15px;
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
      width: 25px;
      height: 25px;
      color: #fff;
      text-align: center;
      line-height: 25px;
      border-radius: 50%;
      font-size: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      // opacity: 0;
    }
  }
  .name {
    text-overflow: ellipsis;
    overflow: hidden;
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
</style>
