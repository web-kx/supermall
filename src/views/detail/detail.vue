<template>
  <div id="detail">
    <detail-navbar
      class="detail-nav"
      @titleclick="titleclick"
      ref="nav"
    ></detail-navbar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailinfo"></detail-goods-info>
      <detail-param-info
        ref="params"
        class="paramInfo"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-common-info
        ref="common"
        :commonInfo="commonInfo"
      ></detail-common-info>
      <goods-list-item ref="recommend" :goods="recommends"> </goods-list-item>
    </scroll>

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>
<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import Scroll from "components/common/scroll/scroll.vue";
/* import Toast from "components/common/toast/toast.vue" */
import GoodsListItem from "components/content/goods/goodslist.vue";
import { debounce } from "common/untils.js";

import DetailNavbar from "./components/detailnavbar";
import DetailSwiper from "./components/detailswiper";
import DetailBaseInfo from "./components/detailbaseinfo";
import DetailShopInfo from "./components/detailshopinfo";
import DetailGoodsInfo from "./components/detailgoodsinfo";
import DetailParamInfo from "./components/detailparaminfo";
import DetailCommonInfo from "./components/detailcommentinfo";
import DetailBottomBar from "./components/detailbottombar";

import { mapActions } from "vuex";
export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommonInfo,
    GoodsListItem,
    DetailBottomBar,
    /* Toast */
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailinfo: {},
      paramInfo: {},
      commonInfo: {},
      recommends: [],
      themeTopYs: [],
      getthemeTopY: null,
      currentIndex: 0,
      /*  message:'',
      show:false */
    };
  },
  methods: {
    ...mapActions(["addCart"]),
    titleclick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(options) {
      /* 获取y值 */
      const optionsY = -options.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          optionsY >= this.themeTopYs[i] &&
          optionsY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      /* 获取购物车要展示的信息 */
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      /* 将商品添加到购物车里 mapActions引入 */
      this.addCart(product).then((res) => {
        this.$toast.show(res, 1500);
      });
    },
  },
  created() {
    /* 保存传入的id */
    this.iid = this.$route.params.iid;
    /* 根据id请求详情数据 */
    getDetail(this.iid).then((res) => {
      /* console.log(res) */
      /*  获取轮播数据 */
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;

      /* 获取商品信息 */
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      /* 创建店铺信息对象 */
      this.shop = new Shop(data.shopInfo);

      /* 商品详情数据 */
      this.detailinfo = data.detailInfo;

      /* 商品参数信息 */
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      /* 商品评论信息 */
      if (data.rate.cRate !== 0) {
        this.commonInfo = data.rate.list[0];
      }
    });

    /* 详情页推荐数据 */
    getRecommend().then((res) => {
      /* console.log(res) */
      this.recommends = res.data.list;
    });
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImgeLoad", () => {
      refresh();

      /* 获取点击跳转 */
      this.getthemeTopY();
    });
    /* 点击跳转位置及防抖 */
    this.getthemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.common.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      /* console.log(this.themeTopYs);  */
    }, 50);
  },
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background: #fff;
  overflow: hidden;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
