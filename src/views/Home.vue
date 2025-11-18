<template>
  <div>
    <!-- Header Component -->
    <Header 
      :total-stocks="stocks.length"
      :favorite-count="favoriteStocksCount"
      :show-stats="true"
    />
    
    <main class="main-content">
      <div class="container">
        <!-- UserPanel Component -->
        <UserPanel 
          :users="users"
          :current-user="currentUser"
          @update:current-user="handleUserChange"
        />
        
        <!-- StockList Component -->
        <StockList 
          :stocks="stocks"
          @toggle-favorite="handleToggleFavorite"
          @update-stocks="handleUpdateStocks"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Header from '../components/Header.vue';
import UserPanel from '../components/UserPanel.vue';
import StockList from '../components/StockList.vue';
import { users as mockUsers, stocks as mockStocks } from '../data/mockData.js';

// Reactive state
const users = ref(mockUsers);
const currentUser = ref(mockUsers[0]);
const stocks = ref([...mockStocks]);            

/**
 * LIFECYCLE HOOK - onMounted
 * Demo: Chạy khi component được mount
 */
onMounted(() => {
  console.log('✅ Home page mounted!');
  console.log('📊 Loaded', stocks.value.length, 'stocks');
});

/**
 * WATCH - Theo dõi thay đổi
 * Demo: Watch tự động chạy khi currentUser thay đổi
 */
watch(currentUser, (newUser, oldUser) => {
  console.log('🔍 Watch: User changed from', oldUser?.name, 'to', newUser.name);
});

// Computed
const favoriteStocksCount = computed(() => {
  return stocks.value.filter(stock => stock.favorite).length;
});

// Methods
function handleUserChange(newUser) {
  currentUser.value = newUser;
}

function handleToggleFavorite(stockId) {
  const stock = stocks.value.find(s => s.id === stockId);
  if (stock) {
    stock.favorite = !stock.favorite;
  }
}

function handleUpdateStocks(updatedStocks) {
  stocks.value = updatedStocks;
}
</script>
