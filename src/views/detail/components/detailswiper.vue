<template>
  <div class="wrapper">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide
        class="swiper-item"
        v-for="item in topImages"
        :key="item.index"
      >
        <img class="swiper-img" :src="item" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: "DetailSwiper",
  data() {
    return {
      swiperOptions: {
        pagination: { el: ".swiper-pagination" } /* 导航圆点 */,
        loop: true /*  循环轮播 */,
        autoplay:true
      },
    };
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 300px;
  overflow: hidden;
  background: #eee;
}
.swiper-img {
  width: 100%;
  height: 100%;
}
.swiper-pagination {
  bottom: 275px;
}
.wrapper >>> .swiper-pagination-bullet{
  background: #fff;
}
</style>
