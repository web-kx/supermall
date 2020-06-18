<template>
  <div>
    <div v-if="Object.keys(commonInfo).length !== 0" class="common-info">
      <div class="info-header">
        <div class="header-title">用户评价</div>
        <div class="header-more">
          更多
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="info-user">
        <img :src="commonInfo.user.avatar" alt="" />
        <span>{{ commonInfo.user.uname }}</span>
      </div>
      <div class="info-detail">
        <p>{{ commonInfo.content }}</p>
        <div class="info-other">
          <span class="data">{{ commonInfo.created | showDate }}</span>
          <span>{{ commonInfo.style }}</span>
        </div>
        <div class="info-imgs">
          <img
            v-for="(item, index) in commonInfo.images"
            :key="index"
            :src="item"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { formatDate } from "common/formatDate.js";
export default {
  name: "DetailCommonInfo",
  props: {
    commonInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  /* 过滤器 */
  filters: {
    /* 时间戳的转换 */
    showDate: function(value) {
      let date = new Date(value * 1000);
      /* 将date格式化 */
      return formatDate(date, "yyyy-MM-dd");
    },
  },
};
</script>
<style scoped>
.common-info{
    padding: 5px 12px;
    color: #333;
    border-bottom: 5px solid #f2f5f8;
}
.info-header{
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.header-title{
    float: left;
    margin-right: 10px;
    font-size: 15px;
}
.info-user{
    padding: 10px 0 5px;
}
.info-user img{
    width: 42px;
    height: 42px;
    border-radius: 50%;
}
.info-user span{
    position: relative;
    font-size: 15px;
    top: -15px;
    margin-left: 10px;
}
.info-detail p{
    font-size: 14px;
    color: #777;
    line-height: 1.5;
}
.info-detail .info-other{
    font-size: 12px;
    color: #999;
    margin-top: 10px;
}
.info-other .date{
    margin-right: 8px;
}
.info-imgs{
    margin-top: 10px
}
.info-imgs imgs{
    width: 70px;
    height: 70px;
    margin-right: 5px;
}
</style>
