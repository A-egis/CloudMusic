<template>
  <div class="page-container mv-container">
    <div class="left-container">
      <div class="video-container">
        <header>
          <span class="title">{{mvInfo.name}}</span>
          <span class="artists">{{mvInfo.artistName}}</span>
        </header>
        <video :src="mvUrl" controls autoplay></video>
        <div class="comment-container">
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
        </div>
      </div>
    </div>
    <div class="right-container">
      <div class="mv-info">
        <header>MV介绍</header>
        <div class="basic-info">
          <span class="publishtime">发布时间: {{mvInfo.publishTime}}</span>
          <span class="views">播放次数: {{mvInfo.playCount | views}}次</span>
        </div>
        <div class="desc">简介: {{mvInfo.desc}}</div>
        <div class="tags">
          标签:
          <span v-for="item in mvInfo.videoGroup" :key="item.id" class="tag">{{item.name}}</span>
        </div>
      </div>
      <div class="rcm-container">
        <header>相关推荐</header>
        <div class="rcm-items">
          <mv-item class="mv-item" :mv="item" v-for="item in rcmMV" :key="item.id"></mv-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MVItem from '../components/MVItem'
import Comment from '../components/Comment'
export default {
  components: {
    MvItem: MVItem,
    Comment
  },
  data () {
    return {
      mvid: 0,
      mvUrl: '',
      mvInfo: {},
      rcmMV: [],
      commentParams: {
        id: 0,
        limit: 10,
        offset: 0
      },
      hotComments: [],
      latestComments: [],
      total: 0,
      currentPage: 0
    }
  },
  created () {
    this.mvid = this.$route.query.id
    this.commentParams.id = this.$route.query.id
    this.getMVURL()
    this.getMVInfo()
    this.getRcmMV()
    this.getComment()
  },
  // 组件路由守卫
  beforeRouteUpdate (to, from, next) {
    if (to.name === from.name && to.query.id !== from.query.id) {
      this.mvid = to.query.id
      this.commentParams.limit = 10
      this.commentParams.offset = 0
      this.commentParams.id = to.query.id
      this.total = 0
      this.hotComments = []
      this.latestComments = []
      this.mvUrl = ''
      this.mvInfo = {}
      this.rcmMV = []
      this.currentPage = 1
      this.getMVURL()
      this.getMVInfo()
      this.getRcmMV()
      this.getComment()
    }
    next()
  },
  methods: {
    // 获取URL
    getMVURL () {
      axios.get(`/mv/url?id=${this.mvid}`).then((res) => {
        this.mvUrl = res.data.data.url
      })
    },
    // 获取基本信息
    getMVInfo () {
      axios.get(`/mv/detail?mvid=${this.mvid}`).then((res) => {
        this.mvInfo = res.data.data
      })
    },
    // 获取相关推荐
    getRcmMV () {
      axios.get(`/simi/mv?mvid=${this.mvid}`).then((res) => {
        this.rcmMV = res.data.mvs
      })
    },
    // 获取评论
    getComment () {
      axios
        .get('/comment/mv', {
          params: this.commentParams
        })
        .then((res) => {
          this.total = res.data.total
          if (res.data.hotComments) {
            this.hotComments = res.data.hotComments
          }
          this.latestComments = res.data.comments
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    },
    // 分页
    currentChange (page) {
      this.currentPage = page
      this.commentParams.offset = (page - 1) * this.commentParams.limit
      this.getComment()
    }
  }
}
</script>

<style lang="scss" scoped>
.mv-container {
  display: flex;
  .left-container {
    width: 700px;
    // flex: 1;
    margin-right: 35px;
    .video-container {
      width: 100%;
      height: 390px;
      header {
        height: 50px;
        line-height: 50px;
        .title {
          font-size: 18px;
        }

        .artists {
          padding-left: 20px;
          font-size: 12px;
        }
      }

      video {
        outline: none;
        width: 100%;
        height: 100%;
      }
      .comment-container {
        margin: 20px 0;
        header {
          height: 40px;
          line-height: 40px;
          font-size: 18px;
        }
        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .right-container {
    width: 250px;

    header {
      font-size: 18px;
      color: #000;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 10px;
    }
    .mv-info {
      font-size: 12px;
      color: #808080;

      .basic-info {
        padding-bottom: 10px;

        display: flex;
        justify-content: space-between;
      }

      .desc {
        padding: 10px 0;
      }

      .tags {
        display: flex;
        align-items: center;
        padding: 10px 0;
        flex-wrap: wrap;
        .tag {
          font-size: 14px;
          color: #409eff;
          padding: 3px 10px;
        }
      }
    }

    .rcm-container {
      .rcm-items {
        display: flex;
        flex-direction: column;
        align-items: center;

        .mv-item {
          margin: 5px 0;
        }
      }
    }
  }
}
</style>
