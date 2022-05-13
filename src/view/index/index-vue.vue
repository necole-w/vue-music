<template>
<!-- 搜索栏 -->
    <van-search class="search" v-model="value" placeholder="请输入搜索关键词"  show-action>
    <template #left>
    <span class="iconfont icon-SanMiAppglyphico18"></span>
  </template>
     <template #action>
    <span class="iconfont icon-ziyuanldpi2"></span>
  </template>
    </van-search>
    <!-- 轮播图 -->
    <van-swipe >
  <van-swipe-item v-for="image in banners" :key="image.targetId" @click="getBannersTargetId(image.targetId)" square>
    <img :src="image.pic" />
  </van-swipe-item>
  </van-swipe>
  <!-- 歌单推荐 -->
  <h4 class="recommended">歌单推荐</h4>
  <van-grid  :border="false" class="recommendedHigh">
  <van-grid-item :text="item.name" v-for="(item ,index) in Recommended" :key="index">
   <van-image :src="item.picUrl" />
   <p class="recommendedText">{{item.name}}</p>
   </van-grid-item>
</van-grid>
</template>

<script>
// import toRaw  from 'vue'
// import { useRouter } from 'vue-router'
import router from '../../router'
import { ref, getCurrentInstance, onBeforeMount, reactive, toRefs, toRaw } from 'vue'
// const VanNotify = Notify.Component
import { Notify } from 'vant'

export default {

  setup () {
    const value = ref('')
    const { proxy } = getCurrentInstance()
    const data = reactive({
      // 轮播图
      banners: '',
      Recommended: []
    })
    const getBannersTargetId = async (id) => {
      const { data: res } = await proxy.$http.get(`/song/detail?ids=${id}`)
      console.log(res)
      if (res.code !== 200) return Notify({ type: 'warning', message: '歌曲获取失败,请检查网络或重启' })

      // 获取成功之后跳转页面

      // 获取成功之后跳转页面
      router.push({ path: '/play', query: { id: res.songs[0].id } })
    }

    // 获取轮播图数据
    const getBanner = async () => {
      const { data: res } = await proxy.$http.get('/banner?type=1')
      data.banners = res.banners
      // console.log(data.banners)
      // console.log(document.cookie)
    }
    getBanner()
    // 歌单推荐
    const getRecommended = async () => {
      const { data: res } = await proxy.$http.get('/personalized?limit=4')
      if (res.code !== 200) return Notify({ type: 'warning', message: '推荐歌单获取失败' })
      data.Recommended.push(...res.result)
      console.log(data.Recommended)
    }
    getRecommended()

    onBeforeMount(() => {

    }
    )

    return { value, getBannersTargetId, getBanner, getRecommended, ...toRefs(data), toRaw }
  }

}
</script>

<style lang="less" scoped>
.icon-SanMiAppglyphico18{
  float: left;
  width: 40px;
  height: 40px;
  font-size: 30px;
  text-align: center;
  line-height: 40px;
}
.search{
  display:inline-flex;
 width: 400px;
  // float: left;
  height: 40px;
}
.icon-ziyuanldpi2{
  float: right;
  width: 40px;
  height: 40px;
  font-size: 25px;
  text-align: center;
  line-height: 40px;
}
.van-swipe{
  height: 170px;
  // width: 100%;

}
.van-swipe-item>img{
width: 100%;
}
.recommended{
  text-align: left;
  padding:0 0 0 10px ;
  margin:0;
}
.van-image{
  width: 100%;
  border-radius:10px;
  overflow: hidden
}
.recommendedText{
  font-size:10px;
  display: inline-block;
  height: 48px;
  overflow: hidden
}

</style>
