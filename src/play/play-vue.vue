<template>
<!-- :src="currentSong" autoplay="" controls="" @ended="nextsong()" -->
 <!-- <audio-player
      ref="audioPlayer"
      :audio-list="audioList.map(elm => elm.url)"
      :before-play="handleBeforePlay"
      theme-color="#ff2929"
    /> -->
    <!-- {{ musicList }} -->
     <!-- <audio controls :src="url"></audio> -->
     <div></div>

</template>

<script>
// router.currentRoute.value.params.id
import { useRoute } from 'vue-router'
import { ref, getCurrentInstance } from 'vue'
export default {

  setup () {
    const { proxy } = getCurrentInstance()
    const route = useRoute()
    const Id = ref('')
    const url = ref('')
    const musicList = ref([])
    const playMusic = async () => {
      musicList.value.push(JSON.parse(route.query.musicList))
      Id.value = musicList.value[0].id
      const { data: res } = await proxy.$http.get(`/song/url?id=${Id.value}`)
      url.value = res.data[0].url
    }
    playMusic()

    return { playMusic, Id, route, url }
  }

}
</script>

<style>

</style>
