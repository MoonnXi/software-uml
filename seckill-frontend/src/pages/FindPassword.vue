<template>
  <div id="findPassword">
    <div class="container">
      <!-- 登录界面 -->
      <div class="form-box login">
        <form action="">
          <h1>找回密码</h1>
          <!-- 用户名输入框 -->
          <div class="input-box">
            <input
              v-model="loginUsername"
              type="text"
              placeholder="用户名"
              required />
            <i class="bx bxs-user"></i>
          </div>

          <!-- 口令输入框 -->
          <div class="input-box">
            <input
              v-model="findPasswordAnswer"
              type="text"
              placeholder="您最喜欢的食物"
              required />
            <i class="bx bxs-baguette"></i>
          </div>

          <!-- 登录按钮 -->
          <button @click="findPassword" type="button" class="btn">提交</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'

  // 路由器
  const router = useRouter()
  // 用户名
  let loginUsername = ref('')
  // 口令
  let findPasswordAnswer = ref('')

  // todo: 找回密码
  const findPassword = async () => {
    try {
      // 使用 axios 发送 GET 请求
      const response = await axios.post(
        'http://localhost:28080/user/retrievePassword',
        null,
        {
          params: {
            name: loginUsername.value,
            answer: findPasswordAnswer.value,
          },
        },
      )

      console.log(response.data) // 输出响应数据

      if (response.status === 200) {
        // 找回密码成功，处理成功逻辑
        alert('密码找回成功！您的密码是' + response.data)

        router.push('/')
      }
    } catch (error) {
      if (error.response) {
        // 后端返回的错误信息
        alert(error.response.data.error || '找回密码失败')
      } else {
        // 网络或其他错误
        console.error('Find Password error:', error)
        alert('无法连接到服务器')
      }
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  #findPassword {
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
    width: 100%;
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
</style>
