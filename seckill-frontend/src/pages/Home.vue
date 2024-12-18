<template>
  <div class="page-container">
    <Header />
    <div class="container page-content">
      <div class="row mb-4">
        <div
          class="col-8 offset-2 col-sm-6 offset-sm-0 col-lg-4 mt-3"
          id="goods"
          v-for="product in products"
          :key="product.id">
          <b-card
            class="card-custom"
            :title="product.name"
            :sub-title="product.price"
            :img-src="product.imageUrl"
            img-alt="Card image"
            img-top
            :align="'center'">
            <hr />
            <a href="javascript:;" @click="goToitemDetails(product.id)">
              详细信息ヾ(•ω•`)o
            </a>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import Header from '@/components/Header.vue'
  import { useRouter } from 'vue-router'

  const products = ref([])
  const router = useRouter()

  const fetchProductList = async () => {
    try {
      const response = await axios.get('/hello/product/list')
      products.value = response.data // 假设返回的数据是数组
      console.log(response)
    } catch (error) {
      console.error('请求失败:', error)
    }
  }

  // 转跳至商品详情
  const goToitemDetails = (productId: number) => {
    // 路由跳转，并将 productId 传递给 /detail 路由
    router.push({ name: 'Detail', params: { id: productId } })
  }

  onMounted(() => {
    fetchProductList()
  })
</script>

<style scoped>
  .mb-4 {
    /* border: 1px solid black; */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f0eded;
  }
  .mb-4:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease-in-out;
    /* background-color: #ccc; */
  }

  .card-custom {
    display: flex;
    flex-direction: column;
    height: 100%; /* 确保卡片占满容器 */
  }

  .card-custom .card-body {
    flex-grow: 1; /* 卡片的主体内容占据剩余空间 */
  }

  .col-lg-4 {
    display: flex;
    flex-direction: column;
  }
</style>
