<template>
  <div class="page-container">
    <div class="hq-container">
      <div class="cover">
        <img :src="HQSongList.coverImgUrl" :alt="HQSongList.copywriter" />
      </div>
      <div class="info">
        <div class="head">
          <div class="tag"></div>
          <div class="title">{{HQSongList.name}}</div>
        </div>
        <div class="desc">{{HQSongList.description}}</div>
      </div>
      <div class="bg">
        <img :src="HQSongList.coverImgUrl" :alt="HQSongList.copywriter" />
      </div>
      <div class="mask"></div>
    </div>
    <div class="tag-container">
      <div class="tag-item" v-for="(item,index) in tags" :key="index" @click="tagChange(item)">
        <span :class="item===cat?'tag-active':''">{{item}}</span>
      </div>
    </div>
    <div class="songlist-container">
      <song-list-item creator :songList="item" v-for="item in songList" :key="item.id"></song-list-item>
    </div>
    <div class="pagination-container">
      <el-pagination
        @current-change="currentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="currentPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import SongListItem from '../components/SongListItem'
export default {
  data () {
    return {
      HQSongList: {},
      songList: [],
      limit: 10,
      cat: '全部',
      offset: 0,
      total: 0,
      currentPage: 1,
      tags: [
        '全部',
        '欧美',
        '华语',
        '流行',
        '说唱',
        '摇滚',
        '民谣',
        '电子',
        '轻音乐',
        '影视原声',
        'ACG',
        '怀旧',
        '治愈',
        '旅行'
      ]
    }
  },
  methods: {
    // 获取精品歌单信息
    getHQSongList () {
      axios
        .get('/top/playlist/highquality', {
          params: {
            limit: 1,
            cat: this.cat
          }
        })
        .then((res) => {
          this.HQSongList = res.data.playlists[0]
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    },
    // 获取分类歌单信息
    getSongList () {
      axios
        .get('/top/playlist/', {
          params: {
            limit: this.limit,
            cat: this.cat,
            offset: this.offset
          }
        })
        .then((res) => {
          this.songList = res.data.playlists
          this.total = res.data.total
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    },
    // 切换分类
    tagChange (item) {
      this.cat = item
      this.currentPage = 1
      this.offset = 0
      this.getHQSongList()
      this.getSongList()
    },
    // 分页
    currentChange (page) {
      this.currentPage = page
      this.offset = (page - 1) * this.limit
      this.getSongList()
    }
  },
  created () {
    this.getHQSongList()
    this.getSongList()
  },
  components: {
    SongListItem
  }
}
</script>

<style lang="scss" scoped>
.hq-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  height: 200px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  .cover {
    width: 160px;
    height: 160px;
    margin-right: 20px;
    z-index: 1;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    .head {
      height: 30px;
      line-height: 30px;
      .tag {
      }

      .title {
        color: #fff;
      }
    }

    .desc {
      color: #888482;
      font-size: 14px;
      padding-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
  }

  .bg {
    img {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      filter: blur(20px);
      z-index: 0;
    }
  }
  .mask {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.tag-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  .tag-active {
    color: $theme-color;
  }
  .tag-item {
    font-size: 18px;
    margin: 0 10px;
    cursor: pointer;
  }
}

.songlist-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
