import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
// import { createApp } from 'vue';
import { Tabbar, TabbarItem, Button, Search, SwipeItem, Swipe, Form, Field, CellGroup, Col, Row, Grid, GridItem, Image, List, Cell } from 'vant'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入Vuecookies
import VueCookies from 'vue-cookies'
// 导入播放器
import AudioPlayer from '@liripeng/vue-audio-player'

// 导入全局样式表
import './assets/css/global.css'
// 配置请求根路径
// axios
import axios from 'axios'
// 配置请求根路径
axios.defaults.baseURL = 'https://music-9mvqycm2d-necole-w.vercel.app'
// 挂载到vue
// Vue.prototype.$http = axios

const app = createApp(App)
app.use(AudioPlayer)
app.use(Swipe)
app.use(List)
app.use(Cell)
app.use(Image)
app.use(Grid)
app.use(GridItem)
app.use(Col)
app.use(Row)
app.use(VueCookies)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(SwipeItem)
app.use(Button).use(Tabbar).use(Search)
app.config.globalProperties.$http = axios
app.use(router)
app.use(TabbarItem).mount('#app')
