<template>
  <div class="cart-page">
    <Header />
    <h1>购物车</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>您的购物车为空</p>
    </div>
    <div v-else class="cart-items">
      <table>
        <thead>
          <tr>
            <th>商品图片</th>
            <th>商品名称</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>
            <img 
              :src="item.imageUrl" 
              alt="商品图片" 
              class="product-image" 
              onerror="this.onerror=null; this.src='/path/to/default/image.jpg';" 
            />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price.toFixed(2) }}</td>
            <td>
              <button @click="decreaseQuantity(index)">-</button>
              {{ item.quantity }}
              <button @click="increaseQuantity(index)">+</button>
            </td>
            <td>{{ (item.price * item.quantity).toFixed(2) }}</td>
            <td>
              <button @click="removeFromCart(index)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total-price">
        <p>总价: {{ totalPrice.toFixed(2) }} 元</p>
      </div>
      <button class="checkout-button" @click="checkout">去结算</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { computed } from 'vue';
import { useStore } from 'vuex'

export default {
  data() {
    return {
      cartItems: [],
    };
  },
  setup() {
    const store = useStore()
    const userId = computed(() => store.getters.getUserId)

    return {
      userId,
    }
  },
  created() {
    this.fetchCartItems();
  },
  computed: {
  totalPrice() {
    return this.cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },
},
  methods: {
    async fetchCartItems() {
      try {
        console.log('User ID:', this.userId); // 打印用户 ID 以检查是否正确
        const response = await axios.get('/hello/cart/get', {
          params: { userId: this.userId }, 
        });

        console.log('Response Data:', response.data); // 打印数据以检查结构
        this.cartItems = response.data.map(item => ({
          name: item.product ? item.product.name : '未知商品',
          price: item.product ? item.product.price : 0,
          quantity: item.quantity,
          imageUrl: item.product ? item.product.imageUrl : '',
        }));
      } catch (error) {
        console.error('获取购物车数据失败:', error);
      }
    },
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        this.removeFromCart(index);
      }
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
    },
    checkout() {
      alert('结算功能待开发');
      // 这里可以添加跳转到结算页面的逻辑
    },
  },
};
</script>

<style scoped>
.cart-page {
  padding: 20px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.empty-cart {
  text-align: center;
  margin-top: 50px;
}

.cart-items table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.cart-items th, .cart-items td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.cart-items th {
  background-color: #f4f4f4;
}

.total-price {
  text-align: right;
  margin-bottom: 20px;
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

.checkout-button:hover {
  background-color: #218838;
}
</style>