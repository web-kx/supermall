<template>
    <div class="icons">
        <div class="icons-item" v-for="item in icons" :key="item.index">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
        </div>
    </div>
</template>
<script>
export default {
    name:'HomeIcons',
    props: {
        icons:Array
    }

}
</script>
<style scoped>
.icons{
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px 0;
    border-bottom: 8px solid #eee;
}
.icons-item{
    flex: 1;

}
.icons-item a{
    text-decoration: none;
    color: #999;
    font-weight: 600;
}
.icons-item img{
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
}
</style>