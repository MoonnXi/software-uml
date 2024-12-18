import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import FindPassword from '@/pages/FindPassword.vue'
import ProductDetails from '@/pages/ProductDetails.vue'
import Cart from '@/pages/Cart.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Login },
    // 主页
    {
      path: '/home',
      component: Home,
    },
    // 找回密码
    {
      path: '/findPassword',
      component: FindPassword,
    },
    // 商品详情
    {
      path: '/detail/:id',
      name: 'Detail',
      component: ProductDetails,
      props: true,
    },
    //购物车
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,  
    }
  ],
})
