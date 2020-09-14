<template>
  <div class="page-container">
    <div class="info-container">
      <div class="cover">
        <img :src="playlist.coverImgUrl" :alt="playlist.name" />
      </div>
      <div class="right-info">
        <div class="title">{{playlist.name}}</div>
        <div class="create-info">
          <img class="avatar" :src="playlist.creator.avatarUrl" :alt="playlist.creator.nickname" />
          <span class="nickname">{{playlist.creator.nickname}}</span>
          <span class="create-time">{{playlist.createTime | createTime}}创建</span>
        </div>
        <div class="tags">
          标签:
          <span v-for="(item,index) in playlist.tags" :key="index">{{item}}</span>
        </div>
        <div class="desc">
          <span class="label">简介:</span>
          {{playlist.description}}
        </div>
      </div>
    </div>
    <div class="type-container">
      <el-tabs v-model="type">
        <el-tab-pane label="歌曲列表" name="song">
          <el-card shadow="always">
            <div id="songlist-container">
              <song-table :songs="songs"></song-table>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment">
          <el-card shadow="always">
            <div class="hotc-container" v-if="hotComments.length>0">
              <header>精彩评论</header>
              <comment :comment="item" v-for="item in hotComments" :key="item.commentId"></comment>
            </div>
            <header>最新评论({{total}})</header>
            <comment :comment="item" v-for="item in latestComments" :key="item.commentId"></comment>
            <div class="pagination-container">
              <el-pagination
                @current-change="currentChange"
                background
                layout="prev, pager, next"
                :total="total"
                :current-page="currentPage"
              ></el-pagination>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SongTable from '../components/SongTable'
import Comment from '../components/Comment'
export default {
  components: {
    SongTable,
    Comment
  },
  data () {
    return {
      plid: 0,
      playlist: {},
      songs: [],
      type: 'song',
      hotCommentParams: {
        id: 0,
        type: 2,
        limit: 10,
        offset: 0
      },
      hotComments: [],
      latestCommentParams: {
        id: 0,
        limit: 10,
        offset: 0
      },
      latestComments: [],
      total: 0,
      currentPage: 0
    }
  },
  mounted () {
    const id = this.$route.query.id
    this.plid = id
    this.hotCommentParams.id = id
    this.latestCommentParams.id = id
    this.getHotComment()
    this.getLatestComment()
    this.getPlayListDetail()
  },
  methods: {
    // 获取歌单详情
    getPlayListDetail () {
      axios
        .get(`/playlist/detail?id=${this.plid}`)
        .then((res) => {
          this.playlist = res.data.playlist
          // 不登录只返回10条数据 接口返回所有歌曲id
          const trackIds = res.data.playlist.trackIds
          let ids = ''
          trackIds.forEach((item) => {
            ids = ids + item.id + ','
          })
          ids = ids.substring(0, ids.length - 1)
          // 根据id获取所有歌曲
          this.getSongs(ids)
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    },
    // 获取歌曲信息
    getSongs (ids) {
      this.$nextTick(() => {
        setTimeout(() => {
          var loading = this.$loading({
            fullscreen: false,
            text: '拼命加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0,0,0,.5)',
            target: document.getElementById('songlist-container')
          })
          axios
            .get(`/song/detail?ids=${ids}`)
            .then((res) => {
              this.songs = res.data.songs.filter((item) => {
                return item.fee !== 1
              })
              this.total = this.songs.length
            })
            .finally(() => {
              // 关闭loading动画
              loading.close()
            })
            .catch((err) => {
              this.$message.error('获取资源失败')
            })
        }, 1)
      })
    },
    // 获取热评
    getHotComment () {
      axios
        .get('/comment/hot', {
          params: this.hotCommentParams
        })
        .then((res) => {
          this.hotComments = res.data.hotComments
        })
    },
    // 获取最新评论
    getLatestComment () {
      axios
        .get('/comment/playlist', {
          params: this.latestCommentParams
        })
        .then((res) => {
          this.total = res.data.total
          this.latestComments = res.data.comments
        })
    },
    // 分页
    currentChange (page) {
      this.currentPage = page
      this.latestCommentParams.offset =
        (page - 1) * this.latestCommentParams.limit
      this.getLatestComment()
    }
  }
}
</script>

<style lang="scss" scoped>
.info-container {
  display: flex;
  align-items: center;
  height: 230px;
  .cover {
    width: 230px;
    height: 230px;
    margin-right: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .right-info {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
    }

    .create-info {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .avatar {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
      .nickname {
        margin: 0 15px 0 10px;
      }
      .create-time {
        font-size: 12px;
        color: #aaa;
      }
    }

    .tags {
      margin-bottom: 10px;
      span {
        font-size: 14px;
        color: #409eff;
        padding: 0 10px;
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
      word-break: break-all;
      .label {
        color: #000;
        font-size: 16px;
        padding-right: 10px;
      }
    }
  }
}
.type-container {
  margin: 20px 0;
  header {
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
