<template>
  <div class="page-container">
    <el-carousel class="banner" :interval="4000" type="card" height="230px">
      <el-carousel-item class="bannerItem" v-for="item in banners" :key="item.imageUrl">
        <a class="bannerLink" :href="item.url">
          <img :src="item.imageUrl" :alt="item.typeTitle" />
        </a>
      </el-carousel-item>
    </el-carousel>
    <div class="recommendSonglist">
      <h3>
        推荐歌单
        <span class="more">
          <router-link to="/songList" class="morelink">
            更多
            <i class="iconfont icon-forward"></i>
          </router-link>
        </span>
      </h3>
      <div class="songList">
        <song-list-item
          copywriter
          :songList="item"
          v-for="item in recommendSongList"
          :key="item.id"
        ></song-list-item>
      </div>
    </div>
    <div class="newMusic">
      <h3>
        最新音乐
        <span class="more">
          <router-link to="/latest" class="morelink">
            更多
            <i class="iconfont icon-forward"></i>
          </router-link>
        </span>
      </h3>
      <div class="musicList">
        <song-item :music="item" v-for="item in newMusic" :key="item.id"></song-item>
      </div>
    </div>
    <div class="newMV">
      <h3>
        最新MV
        <span class="more">
          <router-link to="/mv" class="morelink">
            更多
            <i class="iconfont icon-forward"></i>
          </router-link>
        </span>
      </h3>
      <div class="MVList">
        <mv-item copywriter :mv="item" v-for="item in newMV" :key="item.id"></mv-item>
      </div>
    </div>
  </div>
</template>

<script>
import SongListItem from '../components/SongListItem'
import SongItem from '../components/SongItem'
import MvItem from '../components/MVItem'
export default {
  data () {
    return {
      banners: [],
      recommendSongList: [],
      newMusic: [],
      newMV: []
    }
  },
  created () {
    this.getBanners()
    this.getRcmPlaylist()
    this.getNewSong()
    this.getMV()
  },
  components: {
    SongListItem,
    SongItem,
    MvItem
  },
  methods: {
    // 获取轮播图
    getBanners () {
      axios
        .get('/banner')
        .then((res) => {
          this.banners = res.data.banners
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    },
    // 获取推荐歌单
    getRcmPlaylist () {
      axios
        .get('/personalized?limit=10')
        .then((res) => {
          this.recommendSongList = res.data.result
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    },
    // 获取新歌
    getNewSong () {
      axios
        .get('/personalized/newsong')
        .then((res) => {
          this.newMusic = res.data.result
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    },
    // 获取最新MV
    getMV () {
      axios
        .get('/personalized/mv')
        .then((res) => {
          this.newMV = res.data.result
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  .bannerItem {
    .bannerLink {
      display: inline-block;
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
h3 {
  margin: 10px 0;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .more {
    display: flex;
    align-items: center;
    .morelink {
      font-size: 13px;
      text-decoration: none !important;
      color: #444;
      i {
        color: #444;
        font-size: 13px;
      }
    }
  }
}
.recommendSonglist {
  .songList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
.newMusic {
  .musicList {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
.newMV {
  .MVList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
