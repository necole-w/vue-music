<template>
<!-- :src="currentSong" autoplay="" controls="" @ended="nextsong()" -->
 <audio >    </audio>
        <ul>
         <!-- v-for="(item,index) in songs" @click="clickHandle(index)" -->
            <li>
                <h3></h3>
                <!-- 歌手:{{item.name}}====
                歌名:{{item.title}} -->
            </li>
        </ul>
</template>

<script>
// router.currentRoute.value.params.id
import router from '@/router'
import { onBeforeMount } from 'vue'
export default {
  setup () {
    const getBanner = () => {
      console.log(router.currentRoute.value.query)
    }

    onBeforeMount(() => {
      getBanner()
    })
    return { getBanner }
  }

}
</script>

<style>

</style>
