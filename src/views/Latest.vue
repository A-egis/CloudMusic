<template>
  <div class="page-container">
    <div class="tag-container">
      <div class="tag-item" v-for="item in tags" :key="item.id" @click="tagChange(item)">
        <span :class="item.id===type?'tag-active':''">{{item.name}}</span>
      </div>
    </div>
    <div class="list-container" id="list-container">
      <song-table album :songs="songs"></song-table>
    </div>
  </div>
</template>

<script>
import SongTable from '../components/SongTable'
export default {
  data () {
    return {
      songs: [],
      tags: [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 7,
          name: '华语'
        },
        {
          id: 96,
          name: '欧美'
        },
        {
          id: 8,
          name: '日本'
        },
        {
          id: 16,
          name: '韩国'
        }
      ],
      type: 0
    }
  },
  mounted () {
    this.getLatestMusic()
  },
  components: {
    SongTable
  },
  methods: {
    // 获取最新音乐
    getLatestMusic () {
      // 加载loading动画
      var loading = this.$loading({
        fullscreen: false,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0,0,0,.5)',
        target: document.getElementById('list-container')
      })
      axios
        .get(`/top/song?type=${this.type}`)
        .then((res) => {
          this.songs = res.data.data
        })
        .finally(() => {
          // 关闭loading动画
          loading.close()
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    },
    // 切换标签
    tagChange (item) {
      this.type = item.id
      this.getLatestMusic()
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
