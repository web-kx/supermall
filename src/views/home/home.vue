<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullUpLoad="loadMore"
    >
      <home-swiper
        :list="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <home-icons :icons="icons"></home-icons>
      <home-feature></home-feature>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBacktop"></back-top>
  </div>
</template>

<script>
import getHomeMultidata from "network/home";
import { getHomeGoods } from "network/home";
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/tabControl.vue";
import GoodsList from "components/content/goods/goodslist.vue";
import Scroll from "components/common/scroll/scroll.vue";
import BackTop from "components/content/backtop/backtop.vue";
import { debounce} from "common/untils.js";

import HomeSwiper from "./components/swiper.vue";
import HomeIcons from "./components/icons.vue";
import HomeFeature from "./components/feature.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeIcons,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      icons: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBacktop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /* 事件监听 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    /*  网络请求 */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        /*  console.log(res); */
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        this.icons = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        /* console.log(res);  */
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp(); /* 解决只加载一次 */
      });
    },
    /* 返回顶部的点击事件 */
    backClick() {
      /* console.log("点击回到顶部"); */
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    /* 返回按钮的显示与隐藏 */
    contentScroll(options) {
      /* 顶部导航栏的显示与隐藏 */
      if ((this.isShowBacktop = -options.y > 800)) {
        this.isShowBacktop = true;
      }
      /*  商品列表导航栏的显示与隐藏 */
      if ((this.isTabFixed = -options.y > this.tabOffsetTop)) {
        this.isTabFixed = true;
      }
    },
    /* 下拉加载更多 */
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      /* 获取tabOffsetTop的offsetTop所有的组件都有一个$el,用于获取组件中的元素 */
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  created() {
    /* 请求多个数据 */
    this.getHomeMultidata();
    /* 请求商品数据 */
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    /* 图片加载完成的事件监听 */
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImgeLoad", () => {
      refresh();
    });
  },
};
</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.home-nav {
  position: relative;
  z-index: 9;
  background: #f97ca2;
  color: #fff;
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control1 {
  position: relative;
  /*  margin-top: 44px; */
  z-index: 9;
}
</style>
