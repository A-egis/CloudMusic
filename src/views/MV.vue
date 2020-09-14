<template>
  <div class="page-container">
    <div class="filter-container">
      <div class="container area-container">
        <span class="label">地区:</span>
        <span
          :class="item===params.area?'tag-active':''"
          class="filter-item"
          v-for="(item,index) in area"
          :key="index"
          @click="areaChange(item)"
        >{{item}}</span>
      </div>
      <div class="container type-container">
        <span class="label">类型:</span>
        <span
          :class="item===params.type?'tag-active':''"
          class="filter-item"
          v-for="(item,index) in type"
          :key="index"
          @click="typeChange(item)"
        >{{item}}</span>
      </div>
      <div class="container order-container">
        <span class="label">排序:</span>
        <span
          :class="item===params.order?'tag-active':''"
          class="filter-item"
          v-for="(item,index) in order"
          :key="index"
          @click="orderChange(item)"
        >{{item}}</span>
      </div>
    </div>
    <div class="mv-container">
      <div class="MVList">
        <mv-item :mv="item" v-for="item in mvList" :key="item.id"></mv-item>
      </div>
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
import MVItem from '../components/MVItem'
export default {
  data () {
    return {
      mvList: [],
      total: 0,
      params: {
        area: '全部',
        type: '全部',
        order: '上升最快',
        limit: 12,
        offset: 0
      },
      currentPage: 1,
      area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      type: ['全部', '官方版', '原生', '现场版', '网易出品'],
      order: ['上升最快', '最热', '最新']
    }
  },
  created () {
    this.getLatestMV()
  },
  methods: {
    // 获取最新MV
    getLatestMV () {
      axios
        .get('/mv/all', { params: this.params })
        .then((res) => {
          // 接口问题 第二页的请求不再返回count 需先判断
          if (res.data.count) {
            this.total = res.data.count
          }
          this.mvList = res.data.data
        })
        .catch((err) => {
          this.$message.error('获取资源失败')
        })
    },
    // 切换地区
    areaChange (item) {
      this.params.area = item
      this.currentPage = 1
      this.params.offset = 0
      this.getLatestMV()
    },
    // 切换类型
    typeChange (item) {
      this.params.type = item
      this.currentPage = 1
      this.params.offset = 0
      this.getLatestMV()
    },
    // 切换排序
    orderChange (item) {
      this.params.order = item
      this.currentPage = 1
      this.params.offset = 0
      this.getLatestMV()
    },
    // 分页
    currentChange (page) {
      this.currentPage = page
      this.params.offset = (page - 1) * this.params.limit
      this.getLatestMV()
    }
  },
  components: {
    MvItem: MVItem
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  .container {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .label {
      padding-right: 30px;
    }
    .filter-item {
      padding: 5px 20px;
      margin: 0 20px;
      color: #808080;
      cursor: pointer;
      border-radius: 20px;
      &:not(.tag-active):hover {
        background-color: $bgcolor;
      }
    }

    .tag-active {
      color: #fff;
      background-color: $theme-color;
    }
    .tag-item {
      font-size: 18px;
      margin: 0 10px;
      cursor: pointer;
    }
  }
}
.mv-container {
  padding-top: 10px;
  .MVList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
