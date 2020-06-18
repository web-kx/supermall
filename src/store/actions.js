export default {
  addCart(context, payload) {
   return new Promise((resolve) => {
      /* 查找之前数组中是否有该商品 */
    let oldProduct = context.state.cartList.find(
      (item) => item.iid === payload.iid
    );
    /* 判断oldProduct */
    if (oldProduct) {
      context.commit("addCounter", oldProduct);
      resolve('当前商品数量+1')
    } else {
      payload.count = 1;
      context.commit("addToCart", payload);
      resolve('新商品添加')
    }
   })
  },
};
