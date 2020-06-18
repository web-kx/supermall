<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div class="title-item" 
        v-for="(item,index) in titles" 
        :key="index"
        :class="{active: index === currentIndex}"
        @click="titleClick(index)">
        {{ item }}
        </div>
      </div></nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavbar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
      titleClick(index){
          this.currentIndex = index
          /* 传给父组件点击监听跳转 */
          this.$emit('titleclick',index)
      },
      backClick(){
          this.$router.back()
      }
  }
};
</script>
<style scoped>
.title{
    display: flex;
    font-size: 13px;
}
.title-item{
    flex: 1;
}
.active{
    color:#f97ca2;
}
.back img{
    margin-top: 11px;
}
</style>
