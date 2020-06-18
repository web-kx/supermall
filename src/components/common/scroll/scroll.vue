<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      /* console.log("---"); */
      this.scroll && this.scroll.refresh();
    },
  },
  mounted() {
    /* 创建BScroll对象 */
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true /* scroll组件里的内容可点击 */,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    /* 监听滚动位置 */
    this.scroll.on("scroll", (options) => {
      /* console.log(options) */
      this.$emit("scroll", options);
    });
    /*  监听上拉事件 */
    this.scroll.on("pullingUp", () => {
      this.$emit("pullUpLoad");
    });
  },
};
</script>
<style scoped></style>
