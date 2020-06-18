<template>
  <div class="wrapper">
    <swiper ref="mySwiper" :options="swiperOptions" v-if="showSwiper">
      <swiper-slide v-for="item in list" :key="item.index">
        <img class="swiper-img" :src="item.image923" @load="imageLoad" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: "HomeSwiper",
  data() {
    return {
      swiperOptions: {
        pagination: { el: ".swiper-pagination" } /* 导航圆点 */,
        loop: true /*  循环轮播 */,
        autoplay: true /* 自动轮播 */,
      },
      isLoad: false,
    };
  },
  computed: {
    /*  刷新显示第一张 */
    showSwiper() {
      return this.list.length;
    },
  },
  props: {
    list: Array,
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  height: 195px;
  overflow: hidden;
  background: #eee;
}

.swiper-img {
  width: 100%;
  height: 100%;
}
.wrapper >>> .swiper-pagination-bullet{
  background: #fff;
}
</style>
