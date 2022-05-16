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
  <van-grid-item :text="item.name" v-for="(item ,index) in Recommended" :key="index" class="recommendedHighItem">
   <van-image :src="item.picUrl" />
   <p class="recommendedText">{{item.name}}</p>
   </van-grid-item>
</van-grid>
  <!-- 音乐推荐 -->
  <h4 class="recommended">音乐推荐</h4>
  <van-grid direction="horizontal" class="musicRecommendedGrid" column-num="1">
  <van-grid-item :text="item.name" v-for="(item ,index) in list" :key="index" class="musicRecommendedList" @click="playMusic(item)">
   <van-image :src="item.picUrl"  width="50"
  height="50" fit="contain" class="musicRecommendedPic"/>
   <p class="musicRecommendedNmae">{{item.name}}</p>
   </van-grid-item>
</van-grid>

</template>

<script>
// import toRaw  from 'vue'
// import { useRouter } from 'vue-router'
// import router from '../../router'
import { ref, getCurrentInstance, onBeforeMount, reactive, toRefs, toRaw } from 'vue'
// const VanNotify = Notify.Component
import { Notify } from 'vant'
import { useRouter } from 'vue-router'

export default {

  setup () {
    const router = useRouter()
    const value = ref('')
    const { proxy } = getCurrentInstance()
    const data = reactive({
      // 轮播图
      banners: '',
      Recommended: [],
      // 推荐歌曲
      list: []
    })
    // 播放音乐
    const playMusic = (musicList) => {
      router.push({ path: '/play', query: { musicList: JSON.stringify(musicList) } })
      // console.log(id)
    }
    // 加载推荐歌曲

    const onLoad = async () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data: res } = await proxy.$http.get('/personalized/newsong')
      if (res.code !== 200) return Notify({ type: 'warning', message: '歌曲获取失败,请检查网络或重启' })
      data.list = res.result
      console.log(data.list)
      // console.log(res)

      // 加载状态结束
      data.loading = false

      // 数据全部加载完成
      if (data.list.length >= 6) {
        data.finished = true
      }
    }
    onLoad()

    // 获取轮播图数据
    const getBanner = async () => {
      const { data: res } = await proxy.$http.get('/banner?type=1')
      data.banners = res.banners
      // console.log(data.banners)
      // console.log(document.cookie)
    }
    // 点击banner
    const getBannersTargetId = async (id) => {
      // 获取成功之后跳转页面
      // console.log('11')
      router.push({ path: '/play' })
    }
    getBanner()
    // 歌单推荐
    const getRecommended = async () => {
      const { data: res } = await proxy.$http.get('/personalized?limit=4')
      if (res.code !== 200) return Notify({ type: 'warning', message: '推荐歌单获取失败' })
      data.Recommended.push(...res.result)
      // console.log(data.Recommended)
    }
    getRecommended()

    onBeforeMount(() => {

    }
    )

    return { value, getBannersTargetId, getBanner, getRecommended, onLoad, ...toRefs(data), toRaw, playMusic }
  }

}
</script>

<style lang="less" scoped>
/deep/.van-grid-item__content--horizontal{
  margin:5px 10px 5px 10px!important;
  padding:0 20px 0 0
}
/deep/.musicRecommendedNmae{
  margin-left: 20px!important;
}
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
.recommendedHigh{
  display: flex;
  flex-wrap: nowrap;
  // overflow: hidden
}
.recommendedHighItem{
  // float: left
 min-width: 93.8px;
}

</style>
