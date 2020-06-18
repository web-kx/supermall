<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
      <div class="price">合计:{{ totalPrice }}</div>
      <div class="calculate" @click="calcClick">去计算:{{ checkLength }}</div>
    </div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkbutton/checkbutton.vue";
export default {
  name: "CartButtomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      /*if(this.$store.state.cartList.length ===0) return false
       return !(this.$store.state.cartList.filter(item => !item.checked).length) */
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
      /* for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true; */
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  width: 100%;
  height: 38px;
  background: #eee;
  position: absolute;
  bottom: 49px;
}
.check-content {
  line-height: 38px;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
}
.calculate {
  text-align: center;
  width: 80px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  position: absolute;
  right: 4px;
  background: #f97ca2;
  border-radius: 10px;
}
</style>
