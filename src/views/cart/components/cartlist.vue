<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/scroll.vue";
import CartListItem from "./cartlistitem";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    /*  两种语法 */
    /* ...mapGetters(['cartLength']) */
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>
<style scoped>
.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
  overflow: hidden;
}
.content {
  position: absolute;
  height: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
