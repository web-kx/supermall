<template>
<div>
<nav-bar class="navbar"><div slot="center">购物车({{length}})</div></nav-bar>
<cart-list class="cart-list"></cart-list>
<cart-buttom-bar></cart-buttom-bar>
</div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue"; 
import {mapGetters} from 'vuex'

import CartList from './components/cartlist'
import CartButtomBar from './components/cartbottombar'
export default {
    name:'Cart',
    components: {
        NavBar,
        CartList,
        CartButtomBar
    },
    computed: {
        /*  两种语法 */
        /* ...mapGetters(['cartLength']) */
        ...mapGetters({
            length:'cartLength'
        })

    }
    
}
</script>
<style scoped>
.navbar{
    background: #f97ca2;
    color: #fff;
    overflow: hidden;
}
</style>
