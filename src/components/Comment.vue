<template>
  <div class="container">
    <div class="avatar-container">
      <img :src="comment.user.avatarUrl" :alt="comment.user.nickname" />
    </div>
    <div class="right-info">
      <div class="comment-container">
        <span class="username">{{comment.user.nickname}}:</span>
        {{comment.content}}
      </div>
      <div class="reply-container" v-if="comment.beReplied.length>0">
        <span class="username">@{{comment.beReplied[0].user.nickname}}:</span>
        {{comment.beReplied[0].content}}
      </div>
      <div class="time-info">{{comment.time | commentTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid #eee;
  .avatar-container {
    width: 50px;
    height: 50px;
    margin-right: 15px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .right-info {
    flex: 1;
    .comment-container {
      font-size: 14px;
      margin-bottom: 10px;
    }
    .username {
      color: #409eff;
      padding-right: 10px;
    }
    .reply-container {
      padding: 10px;
      font-size: 14px;
      background-color: #f1f1f4;
      margin-bottom: 10px;
    }
    .time-info {
      font-size: 12px;
      color: #ccc;
    }
  }
}
</style>
