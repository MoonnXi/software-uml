<template>
  <div id="login">
    <div class="container" :class="activeState">
      <!-- 登录界面 -->
      <div class="form-box login">
        <form action="">
          <h1>登录</h1>
          <!-- 用户名输入框 -->
          <div class="input-box">
            <input
              v-model="loginUsername"
              type="text"
              placeholder="用户名"
              required />
            <i class="bx bxs-user"></i>
          </div>

          <!-- 密码输入框 -->
          <div class="input-box">
            <input
              v-model="loginPassword"
              type="text"
              placeholder="密码"
              required />
            <i class="bx bxs-lock"></i>
          </div>

          <!-- 忘记密码 -->
          <div class="forgot-link">
            <a href="javascript:;" @click="goToFindPassword">忘记密码?</a>
          </div>

          <!-- 登录按钮 -->
          <button @click="handleLogin" type="button" class="btn">登录</button>

          <!-- 选择其它方式登录 -->
          <p>或者选择其它方式登录</p>
          <div class="social-icons">
            <a href="#"><i class="bx bxl-google-plus"></i></a>
            <a href="#"><i class="bx bxl-facebook-circle"></i></a>
            <a href="#"><i class="bx bxl-github"></i></a>
            <a href="#"><i class="bx bxl-linkedin-square"></i></a>
          </div>
        </form>
      </div>

      <!-- 注册界面 -->
      <div class="form-box register">
        <form action="">
          <h1>注册</h1>
          <!-- 用户名输入框 -->
          <div class="input-box">
            <input
              v-model="registerUsername"
              type="text"
              placeholder="用户名"
              required />
            <i class="bx bxs-user"></i>
          </div>

          <!-- 密码输入框 -->
          <div class="input-box">
            <input
              v-model="registerPassword"
              type="text"
              placeholder="密码"
              required />
            <i class="bx bxs-lock"></i>
          </div>

          <!-- 忘记密码时的提示词 -->
          <div class="input-box">
            <input
              v-model="findPasswordAnswer"
              type="text"
              placeholder="找回密码口令：喜爱的食物"
              required />
            <i class="bx bxs-lock"></i>
          </div>

          <!-- 注册按钮 -->
          <button type="button" class="btn" @click="handleRegister">
            注册
          </button>

          <!-- 选择其它方式注册 -->
          <p>或者选择其它方式登录</p>
          <div class="social-icons">
            <a href="#"><i class="bx bxl-google-plus"></i></a>
            <a href="#"><i class="bx bxl-facebook-circle"></i></a>
            <a href="#"><i class="bx bxl-github"></i></a>
            <a href="#"><i class="bx bxl-linkedin-square"></i></a>
          </div>
        </form>
      </div>

      <!-- 欢迎词盒子 -->
      <div class="toggle-box">
        <!-- 左 -->
        <div class="toggle-panel toggle-left">
          <h1>欢迎！✪ ω ✪</h1>
          <p>你想要一个账户吗？</p>
          <button @click="addActive" class="btn register-btn">前往注册</button>
        </div>

        <!-- 右边 -->
        <div class="toggle-panel toggle-right">
          <h1>欢迎回来(❁´◡`❁)</h1>
          <p>如果你有了账户</p>
          <button @click="removeActive" class="btn login-btn">前往登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import { useStore } from 'vuex';
  

  // 获取 store
  const store = useStore();
  // bro: 数据
  // 获取路由器
  const router = useRouter()
  // 登录相关
  let loginUsername = ref('')
  let loginPassword = ref('')
  // 注册相关
  let registerUsername = ref('')
  let registerPassword = ref('')
  let findPasswordAnswer = ref('')
  // 切换登录注册活动类名
  let activeState = ref('')

  // bro: 方法
  // todo: 登录注册页面切换
  function addActive() {
    activeState.value = 'active'
  }
  function removeActive() {
    activeState.value = ''
  }

  // todo: 登录方法
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:28080/user/login',
        `name=${loginUsername.value}&password=${loginPassword.value}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      console.log(response)

      if (response.status === 200) {
        const responseData = response.data; 
        const parts = responseData.split(',');
        const id = parts[1].trim(); 
        console.log(id);
        // 登录成功，跳转到主页
        router.push('/home')
        // 更新 Vuex store 中的 userId
        store.dispatch('updateUserId', id)
      }
    } catch (error) {
      if (error.response) {
        // 后端返回的错误信息
        alert(error.response.data.error || '登录失败')
      } else {
        // 网络或其他错误
        console.error('Login error:', error)
        alert('无法连接到服务器')
      }
    }
  }

  // todo: 注册方法
  const handleRegister = async () => {
    try {
      // 使用 axios 发送 POST 请求到注册接口
      const response = await axios.post(
        'http://localhost:28080/user/register',
        {
          name: registerUsername.value,
          password: registerPassword.value,
          findPasswordAnswer: findPasswordAnswer.value,
        },
        {
          headers: {
            'Content-Type': 'application/json', // 确保请求体为 JSON 格式
          },
        },
      )

      console.log(response.data) // 输出响应数据

      if (response.status === 200) {
        // 注册成功，跳转到登录页面
        alert('注册成功！')
      }
    } catch (error) {
      if (error.response) {
        // 后端返回的错误信息
        alert(error.response.data.error || '注册失败')
      } else {
        // 网络或其他错误
        console.error('Registration error:', error)
        alert('无法连接到服务器')
      }
    }
  }

  // todo: 跳转至找回密码界面
  function goToFindPassword() {
    router.push('/findPassword')
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  #login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(90deg, #e2e2e2, #c9d6);
  }

  /* 版心盒子 */
  .container {
    position: relative;
    width: 850px;
    height: 550px;
    margin: 20px;
    background: #fff;
    border-radius: 30px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }

  /* 包裹表单的盒子 */
  .container .form-box {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    padding: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    color: #333;
    text-align: center;
    transition: 0.6s ease-in-out 1.2s, visibility 0s 1s;
    z-index: 1;
  }
  .container.active .form-box {
    right: 50%;
  }

  .container .form-box.register {
    visibility: hidden;
  }

  .container.active .form-box.register {
    visibility: visible;
  }

  .container .form-box form {
    width: 100%;
    /* background-color: pink; */
  }

  .container .form-box h1 {
    font-style: 36px;
    margin: -10px 0;
  }

  .container .form-box .input-box {
    position: relative;
    margin: 30px 0;
  }

  /* 输入框 */
  .container .form-box .input-box input {
    width: 100%;
    padding: 13px 50px 13px 20px;
    background-color: #eee;
    border-radius: 8px;
    border: none;
    outline: none;
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }

  /* 输入框提示词 */
  .container .form-box .input-box input::placeholder {
    color: #888;
    font-weight: 500;
  }

  /* 设置输入框图标 */
  .container .form-box .input-box i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #888;
  }

  /* 忘记密码盒子 */
  .container .form-box .forgot-link {
    margin: -15px 0 10px;
  }

  /* 忘记密码链接 */
  .container .form-box .forgot-link a {
    font-size: 14.5px;
    color: #333;
    text-decoration: none;
  }

  /* 按钮 */
  .container .form-box .btn,
  .container .toggle-box .btn {
    display: block;
    width: 100%;
    height: 48px;
    /* background-color: #7494ec; */
    position: relative;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
  }

  /* 关键帧动画 */
  @keyframes animate {
    from {
      background-position: 0%;
    }
    to {
      background-position: 400%;
    }
  }

  /* 鼠标置于按钮上时显示动画 */
  .container .form-box .btn:hover,
  .container .toggle-box .btn:hover {
    animation: animate 8s linear infinite;
  }

  /* 按钮周围光晕 */
  .container .form-box .btn::before,
  .container .toggle-box .btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    border-radius: 40px;
    opacity: 0;
  }
  /* 按钮光晕滤镜 */
  .container .form-box.login .btn:hover::before,
  .container .form-box.register .btn:hover::before {
    filter: blur(10px);
    opacity: 1;
    animation: animate 8s linear infinite;
  }

  /* 选择其它方式登录字样 */
  .container .form-box p {
    font-size: 14.5px;
    margin: 15px 0;
  }

  /* 防止其它登录图标在页面宽度不够时自动换行 */
  .container .form-box .social-icons {
    display: flex;
    justify-content: center;
  }

  /* 其它登录图标外的a标签 */
  .container .form-box .social-icons a {
    display: inline-flex;
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 24px;
    color: #333;
    text-decoration: none;
    margin: 0 8px;
  }

  /* 欢迎界面 */
  /* 欢迎词盒子1 */
  .container .toggle-box {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .container .toggle-box h1 {
    color: white;
  }

  /* 欢迎词盒子1的为元素 */
  .container .toggle-box::before {
    content: '';
    position: absolute;
    width: 300%;
    height: 100%;
    left: -250%;
    /* 大圆角 */
    border-radius: 150px;
    background-color: #7494ec;
    z-index: 2;
    transition: 1.8s ease-in-out;
  }

  /* todo: 在container被添加.active时，让欢迎盒子向右边跑 */
  .container.active .toggle-box::before {
    left: 50%;
  }

  /* 欢迎词盒子2 */
  .container .toggle-panel {
    position: absolute;
    width: 50%;
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.6s ease-in-out;
    z-index: 2;
  }

  /* 左盒子 */
  .container .toggle-panel.toggle-left {
    left: 0;
    transition-delay: 1.2s;
  }

  /* todo: container盒子有active类名时，左盒子向左跑(蓝色伪元素向右跑时，左盒子向左跑) */
  .container.active .toggle-panel.toggle-left {
    left: -50%;
    transition-delay: 0.6s;
  }

  /* 右盒子 */
  .container .toggle-panel.toggle-right {
    right: -50%;
    transition-delay: 0.6s;
  }

  /* todo: container盒子有active类名时，右盒子向左跑，其右边边缘和container贴死 */
  /* 右盒子 */
  .container.active .toggle-panel.toggle-right {
    right: 0;
    transition-delay: 1.2s;
  }

  /* 提示词 */
  .container .toggle-panel p {
    margin-bottom: 20px;
  }

  /* 欢迎词中的注册按钮 */
  .container .toggle-panel .btn {
    width: 160px;
    height: 46px;
    /* 背景颜色设置为透明 */
    background: transparent;
    border: 2px solid #fff;
    box-shadow: none;
  }

  /* todo: 适配小屏幕移动端 */
  @media screen and (max-width: 650px) {
    .container {
      height: calc(100vh - 40px);
    }

    .container .form-box {
      bottom: 0;
      width: 100%;
      height: 70%;
    }
    .container.active .form-box {
      right: 0;
      bottom: 30%;
    }
    .container .toggle-box::before {
      left: 0;
      top: -270%;
      width: 100%;
      height: 300%;
      border-radius: 20vw;
    }
    .container.active .toggle-box::before {
      top: 70%;
      left: 0;
    }
    .container .toggle-box .toggle-panel {
      width: 100%;
      height: 30%;
    }
    .container .toggle-box .toggle-panel.toggle-left {
      top: 0;
    }
    .container.active .toggle-box .toggle-panel.toggle-left {
      left: 0;
      top: -30%;
    }
    .container .toggle-box .toggle-panel.toggle-right {
      right: 0;
      bottom: -30%;
    }
    .container.active .toggle-box .toggle-panel.toggle-right {
      bottom: 0;
    }
  }

  @media screen and (max-width: 400px) {
    .container .form-box {
      padding: 20px;
    }
    .container .toggle-box .toggle-panel h1 {
      font-size: 30px;
    }
  }
</style>
