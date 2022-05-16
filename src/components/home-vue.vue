<template>
<Index></Index>
  <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#ccc" :placeholder="true" >
  <van-tabbar-item class="iconfont icon-SanMiAppglyphico15" to="/index">首页</van-tabbar-item>
  <!-- <van-tabbar-item class="iconfont icon-SanMiAppglyphico13">播客</van-tabbar-item> -->
  <van-tabbar-item class="iconfont icon-SanMiAppglyphico16">我的</van-tabbar-item>
  <!-- <van-tabbar-item class="iconfont icon-ziyuanldpi6">首页</van-tabbar-item> -->
  <!-- <van-tabbar-item class="iconfont icon-ziyuanldpi">云村</van-tabbar-item> -->
</van-tabbar>
</template>

<script>
// import '@/res/fonts/iconfont.css'
import Index from '@/view/index/index-vue.vue'
import { ref } from 'vue'
export default {
  setup () {
    const active = ref(0)
    const icon = {
      active: 'https://cdn.jsdelivr.net/npm/@vant/assets/user-active.png',
      inactive: 'https://cdn.jsdelivr.net/npm/@vant/assets/user-inactive.png'
    }
    return {
      icon,
      active
    }
  },
  components: {
    Index
  }

}
</script>

<style lang="less" scoped>

html {
  background-color: rgb(163, 93, 93);
}
</style>
