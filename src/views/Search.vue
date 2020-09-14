<template>
  <div class="page-container">
    <header class="tips">
      搜索
      <span class="keywords">"{{this.params.keywords}}"</span>
      , 找到 {{total}} {{type}}
    </header>
    <div class="type-container">
      <el-tabs v-model="params.type" @tab-click="typeChange">
        <el-tab-pane label="歌曲" name="1">
          <el-card shadow="always">
            <song-table :songs="songs"></song-table>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="1000">
          <el-card shadow="always">
            <div class="songlist-container">
              <song-list-item creator :songList="item" v-for="item in playLists" :key="item.id"></song-list-item>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="MV" name="1004">
          <el-card shadow="always">
            <div class="MVList">
              <mv-item duration :mv="item" v-for="item in mvs" :key="item.id"></mv-item>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
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
import SongTable from "../components/SongTable";
import SongListItem from "../components/SongListItem";
import MVItem from "../components/MVItem";
export default {
  data() {
    return {
      total: 0,
      type: "单曲",
      params: {
        keywords: "",
        limit: 20,
        offset: 0,
        type: "1",
      },
      songs: [],
      playLists: [],
      mvs: [],
      currentPage: 1,
    };
  },
  components: {
    SongTable,
    SongListItem,
    MvItem: MVItem,
  },
  created() {
    this.params.keywords = this.$route.query.keywords;
    this.getSearchResult();
  },
  methods: {
    // 获取搜索结果
    getSearchResult() {
      axios
        .get("/search", { params: this.params })
        .then((res) => {
          const type = this.params.type;
          if (type == "1") {
            this.songs = res.data.result.songs.filter((item) => {
              return item.fee !== 1;
            });
            this.total = this.songs.length;
          } else if (type == "1000") {
            this.total = res.data.result.playlistCount;
            this.playLists = res.data.result.playlists;
          } else if (type == "1004") {
            this.total = res.data.result.mvCount;
            this.mvs = res.data.result.mvs;
          }
        })
        .catch((err) => {
          this.$message.error("获取资源失败");
        });
    },
    // 切换搜索类型
    typeChange(tab) {
      this.params.type = tab.name;
      this.currentPage = 1;
      this.params.offset = 0;
      const type = tab.name;
      if (type == "1") {
        this.type = "首歌曲";
        this.params.limit = 20;
      } else if (type == "1000") {
        this.type = "个歌单";
        this.params.limit = 15;
      } else if (type == "1004") {
        this.type = "个MV";
        this.params.limit = 12;
      }
      this.getSearchResult();
    },
    // 分页
    currentChange(page) {
      this.currentPage = page;
      this.params.offset = (page - 1) * this.params.limit;
      this.getSearchResult();
    },
  },
  // 组件导航守卫
  beforeRouteUpdate(to, from, next) {
    if (to.name === from.name && to.query.keyword !== from.query.keyword) {
      this.params.keywords = to.query.keyword;
      this.params.limit = 20;
      this.params.offset = 0;
      this.params.type = "1";
      this.total = 0;
      this.type = "单曲";
      this.currentPage = 1;
      this.songs = [];
      this.getSearchResult();
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
.tips {
  //   height: 60px;
  padding-left: 10px;
  font-size: 14px;
  .keywords {
    color: $theme-color;
  }
}
.type-container {
  margin: 20px 0;
}
.songlist-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.MVList {
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
