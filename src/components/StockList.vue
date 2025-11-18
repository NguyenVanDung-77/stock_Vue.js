<template>
  <div class="stock-list-container">
    <!-- Search box - Demo v-model (two-way binding) -->
    <div class="search-section">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Tìm kiếm theo mã hoặc tên cổ phiếu..."
          class="search-input"
        />
        <!-- Demo v-show: hiển thị nút clear khi có text -->
        <button 
          v-show="searchQuery.length > 0"
          @click="clearSearch"
          class="clear-btn"
        >
          ✕
        </button>
      </div>
      
      <!-- Filter buttons -->
      <div class="filter-buttons">
        <button 
          @click="filterType = 'all'"
          :class="['filter-btn', { active: filterType === 'all' }]"
        >
          Tất cả ({{ stocks.length }})
        </button>
        <button 
          @click="filterType = 'favorite'"
          :class="['filter-btn', { active: filterType === 'favorite' }]"
        >
          ⭐ Yêu thích ({{ favoriteStocks.length }})
        </button>
        <button 
          @click="filterType = 'up'"
          :class="['filter-btn', { active: filterType === 'up' }]"
        >
          📈 Tăng giá
        </button>
        <button 
          @click="filterType = 'down'"
          :class="['filter-btn', { active: filterType === 'down' }]"
        >
          📉 Giảm giá
        </button>
      </div>
    </div>
    
    <!-- Stats info -->
    <div class="stats-info">
      <p>
        Hiển thị <strong>{{ filteredStocks.length }}</strong> / {{ stocks.length }} cổ phiếu
        <span v-if="searchQuery"> - Tìm kiếm: "{{ searchQuery }}"</span>
      </p>
    </div>
    
    <!-- Stock grid - Demo v-for và component composition -->
    <!-- Minh họa: Render list với component con -->
    <div v-if="filteredStocks.length > 0" class="stock-grid">
      <StockItem
        v-for="stock in filteredStocks"
        :key="stock.id"
        :stock="stock"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>
    
    <!-- Demo v-else: hiển thị khi không có kết quả -->
    <div v-else class="no-results">
      <div class="no-results-icon">🔍</div>
      <h3>Không tìm thấy cổ phiếu</h3>
      <p>Thử tìm kiếm với từ khóa khác hoặc thay đổi bộ lọc</p>
      <button @click="clearSearch" class="reset-btn">
        Xóa tìm kiếm
      </button>
    </div>
    
    <!-- Demo button: simulate price changes để thấy reactivity -->
    <div class="demo-section">
      <button @click="simulatePriceChanges" class="demo-btn">
        🔄 Mô phỏng thay đổi giá (Demo Reactivity)
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import StockItem from './StockItem.vue';

// Props - nhận danh sách cổ phiếu từ component cha
const props = defineProps({
  stocks: {
    type: Array,
    required: true
  }
});

// Emit - gửi sự kiện lên component cha
const emit = defineEmits(['toggle-favorite', 'update-stocks']);

// Reactive state - minh họa Vue Reactivity
// Khi searchQuery thay đổi, computed filteredStocks tự động cập nhật
const searchQuery = ref('');
const filterType = ref('all'); // 'all', 'favorite', 'up', 'down'

// Computed property - Danh sách cổ phiếu yêu thích
// Tự động cập nhật khi stocks thay đổi
const favoriteStocks = computed(() => {
  return props.stocks.filter(stock => stock.favorite);
});

// Computed property - Lọc và tìm kiếm cổ phiếu
// Minh họa: Computed tự động tính toán lại khi dependencies thay đổi
const filteredStocks = computed(() => {
  let result = props.stocks;
  
  // Filter by type
  if (filterType.value === 'favorite') {
    result = result.filter(stock => stock.favorite);
  } else if (filterType.value === 'up') {
    result = result.filter(stock => stock.price > stock.previousPrice);
  } else if (filterType.value === 'down') {
    result = result.filter(stock => stock.price < stock.previousPrice);
  }
  
  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim();
    result = result.filter(stock => 
      stock.code.toLowerCase().includes(query) ||
      stock.name.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// Methods
function clearSearch() {
  searchQuery.value = '';
}

function handleToggleFavorite(stockId) {
  // Emit event lên component cha
  emit('toggle-favorite', stockId);
}

// Simulate price changes để demo Reactivity
function simulatePriceChanges() {
  const updatedStocks = props.stocks.map(stock => {
    // Random change +/- 2%
    const changePercent = (Math.random() - 0.5) * 0.04;
    const newPrice = Math.round(stock.price * (1 + changePercent) / 100) * 100;
    
    return {
      ...stock,
      previousPrice: stock.price,
      price: newPrice
    };
  });
  
  // Emit updated stocks lên component cha
  // Vue sẽ tự động re-render UI với dữ liệu mới (Reactivity!)
  emit('update-stocks', updatedStocks);
}
</script>

<style scoped>
.stock-list-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.search-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: #f8f9fa;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.search-box:focus-within {
  border-color: #2a5298;
  background: white;
  box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
}

.search-icon {
  font-size: 1.2rem;
}

.search-input {
  flex: 1;
  border: none;
  background: none;
  font-size: 1rem;
  outline: none;
  color: #2c3e50;
}

.search-input::placeholder {
  color: #95a5a6;
}

.clear-btn {
  background: #e0e0e0;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.clear-btn:hover {
  background: #bdc3c7;
}

.filter-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #2c3e50;
}

.filter-btn:hover {
  border-color: #2a5298;
  background: #e8f0f7;
}

.filter-btn.active {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border-color: #2a5298;
}

.stats-info {
  padding: 0.75rem 1.25rem;
  background: #f8f9fa;
  border-radius: 8px;
  color: #2c3e50;
}

.stats-info p {
  margin: 0;
  font-size: 0.95rem;
}

.stats-info strong {
  color: #2a5298;
  font-size: 1.1rem;
}

.stock-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.25rem;
}

.no-results {
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.no-results h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.no-results p {
  margin: 0 0 1.5rem 0;
  color: #7f8c8d;
}

.reset-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: linear-gradient(135deg, #1a3464 0%, #245080 100%);
  transform: translateY(-2px);
}

.demo-section {
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(15, 32, 39, 0.4);
}

.demo-btn {
  padding: 0.875rem 2rem;
  background: white;
  color: #2a5298;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.3s ease;
  margin-bottom: 0.75rem;
}

.demo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

@media (max-width: 768px) {
  .stock-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    flex-direction: column;
  }
  
  .filter-btn {
    width: 100%;
  }
}
</style>
