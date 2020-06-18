<template>
    <div class="tab-control">
        <div class="tab-control-item" 
        v-for="(item,index) in titles" 
        :key="index" 
        :class="{active: index === currentIndex}"
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:'TabControl',
    data () {
        return {
           currentIndex: 0 
        }
    },
    props: {
        titles:Array,
    },
    methods: {
        itemClick(index){
            this.currentIndex = index
            this.$emit('tabClick',index)
        }
    }
}
</script>
<style scoped>
.tab-control{
    display: flex;
    justify-content: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
}
.tab-control-item{
    flex: 1;
    text-align: center;
    color: #666;
}
.tab-control-item span{
    padding: 5px;
}
.active{
    color: #f97ca2;
}
.active span{
    border-bottom: 3px solid #f97ca2;
}
</style>