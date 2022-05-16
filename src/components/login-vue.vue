<template>
  <div id="building">
  <van-form @failed="onFailed" @submit="subLogin">
  <van-cell-group inset>
    <!-- 通过 pattern 进行正则校验 -->
    <!-- v-model="value1" -->
    <van-field
     :rules="userphoneRules"
      name="userphone"
      placeholder="请输入手机号"
      v-model="userphone"
    />
      <van-field
      v-model="userpassword"
      type="password"
      name="userpassword"
      placeholder="请输入密码"
      :rules="userpasswordRules"
      v-if="isyam">

    </van-field>
      <van-field
      v-model="useryzm"
      type="number"
      name="useryzm"
      placeholder="请输入验证码"

      v-else>
 <template #button>
      <van-button size="small" type="primary" round @click="sendSmsCode" :disabled="SmsCode.isSmsSend">{{SmsCode.sendBtnText}}</van-button>
    </template>
    </van-field>

  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round  type="primary" native-type="submit" class="submitBtn" >
      登录
    </van-button>

  </div>
    <p v-if="isyam" @click="taglelogin">验证码登录</p>
    <p v-else @click="taglelogin">密码登录</p>
</van-form>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { Notify, Toast } from 'vant'
import router from '@/router'
import VueCookies from 'vue-cookies'
// import { Toast } from 'vant'
export default {
  setup () {
    const { proxy } = getCurrentInstance()
    const userphone = ref('15379726365')
    const userpassword = ref('wugang19981123')
    const useryzm = ref('')
    const isyam = ref('true')
    const SmsCode = ref({
      isSmsSend: false,
      // 文本
      sendBtnText: '点击发送验证码',
      // 计时器对象
      timer: null,
      // 倒数60秒
      counter: 5
    })

    const sendSmsCode = async () => {
      // 判断手机号是否已经输入
      if (!userphone.value) {
        Toast.fail('请输入手机号')
        return false
      }
      // 判断手机号是否符合要求
      if (userphone.value.length !== 11) {
        Toast.fail('请输入11位手机号')
        return false
      }
      // 调用接口，发送短信验证码
      const { data: res } = await proxy.$http.get(`/captcha/sent?phone=${userphone.value}`)
      // console.log('发送验证码')
      console.log(res)
      // 这部分放调用发送短信的接口，这里先不做任何功能，主要先把按钮倒计时的功能实现
      // 将按钮禁用，防止再次点击
      SmsCode.value.isSmsSend = true
      // 开始倒计时，60s之后才能再次点击
      countDown() // 这里实现倒计时的功能，文章下面开始介绍
    }
    // 验证码延时器
    const countDown = () => {
      // 将setInterval()方法赋值给前面定义的timer计时器对象，等用clearInterval()方法时方便清空这个计时器对象
      SmsCode.value.timer = setInterval(() => {
        // 替换文本，用es6里面的``这个来创建字符串模板，让秒实时改变
        SmsCode.value.sendBtnText = `(${SmsCode.value.counter}秒)后重新发送`
        SmsCode.value.counter--
        if (SmsCode.value.counter < 0) {
          // 当计时小于零时，取消该计时器
          clearInterval(SmsCode.value.timer)
          reset()
        }
      }, 1000)
    }
    // 启用验证码
    const reset = () => {
      // 重置按钮可用
      SmsCode.value.isSmsSend = false
      // 重置文本内容
      SmsCode.value.sendBtnText = '点击发送验证码'
      if (SmsCode.value.timer) {
        // 存在计时器对象，则清除
        clearInterval(SmsCode.value.timer)
        // 重置秒数，防止下次混乱
        SmsCode.value.counter = 5
        // 计时器对象重置为空
        SmsCode.value.timer = null
      }
    }

    // 控制验证码短信的显示
    const taglelogin = () => {
      isyam.value = !isyam.value
    }
    const onFailed = (errorInfo) => {
      console.log('failed', errorInfo)
    }
    const userpasswordRules = [
      { required: true, message: '请输入密码', trigger: 'onBlur' }
    ]
    const useryzmRules = [
      { required: true, message: '请输入验证码', trigger: 'onBlur' }
    ]
    const userphoneRules = [
      { required: true, message: '请输入手机号', trigger: 'onBlur' },
      { pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[13678]|18[0-9]|14[57])[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'onBlur' }
    ]

    // form检验通过后调用登录接口
    const subLogin = async () => {
      console.log(isyam.value)
      if (!isyam.value) {
        const { data: res } = await proxy.$http.post(`/captcha/verify?phone=${userphone.value}&captcha=${useryzm.value}`)
        console.log(res)
        if (res.code !== 200) return Notify({ type: 'warning', message: '登陆失败,请检查密码验证码是否正确' })
        // console.log(res)
        // console.log(useryzm.value)
        Notify({ type: 'success', message: '登陆成功' })
        // 将token保存到本地
        // VueCookies.set('token', res.token)
        // console.log();
        // 保存到本地之后跳转到新的后台首页
        router.push({ path: '/home' })
      } else {
        const { data: res } = await proxy.$http.get(`/login/cellphone?phone=${userphone.value}&password=${userpassword.value}`)
        if (res.code !== 200) return Notify({ type: 'warning', message: '登陆失败,请检查密码或用户名是否正确' })
        console.log(res)
        Notify({ type: 'success', message: '登陆成功' })
        // 将token保存到本地
        VueCookies.set('token', res.token)
        // console.log();
        // 保存到本地之后跳转到新的后台首页
        router.push({ path: '/home' })
      }
      // console.log(userphone.value, userpassword.value)

      // console.log(res.token)
    }

    // /login/cellphone?phone=xxx&password=yyy

    return { onFailed, subLogin, taglelogin, sendSmsCode, countDown, reset, userpasswordRules, userphoneRules, userphone, useryzm, isyam, userpassword, useryzmRules, SmsCode, Toast }
  }

}
</script>

<style lang="less" scoped>
.van-button {
  box-shadow: 0 0 5px rgba(0,0,0,.5);
}
#building {
   width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
  background-image: url(@/assets/images/src=http___img3.doubanio.com_view_group_topic_l_public_p153835304.jpg&refer=http___img3.doubanio.webp);
}
.van-form{
  margin-top:200px
}
.submitBtn{
  // margin-top:100px
  padding:10px 60px 10px 60px
}
.van-cell-group{
background-color: rgba(254, 254, 254,.5);
}
.van-cell{
  background-color: rgba(133, 181, 211, 0.5)!important;
}
</style>
