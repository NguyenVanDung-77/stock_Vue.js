<template>
  <div class="stock-item" :class="priceChangeClass">
    <div class="stock-header">
      <div class="stock-code-section">
        <span class="stock-code">{{ stock.code }}</span>
        <span class="stock-exchange">{{ stock.exchange }}</span>
      </div>
      
      <!-- Demo Event emit và Style binding -->
      <button 
        @click="toggleFavorite"
        class="favorite-btn"
        :class="{ active: stock.favorite }"
        :title="stock.favorite ? 'Bỏ yêu thích' : 'Đánh dấu yêu thích'"
      >
        {{ stock.favorite ? '★' : '☆' }}
      </button>
    </div>
    
    <h3 class="stock-name">{{ stock.name }}</h3>
    
    <div class="stock-price-section">
      <div class="current-price">
        {{ formatPrice(stock.price) }}
        <!-- Demo Style binding: thay đổi màu theo giá tăng/giảm -->
        <span class="price-change" :style="priceChangeStyle">
          {{ priceChangeText }}
        </span>
      </div>
      <div class="price-info">
        <span class="label">Giá trước:</span>
        <span>{{ formatPrice(stock.previousPrice) }}</span>
      </div>
      <div class="price-info">
        <span class="label">Khối lượng:</span>
        <span>{{ formatVolume(stock.volume) }}</span>
      </div>
    </div>
    
    <!-- Demo v-if: Hiển thị badge nếu là cổ phiếu yêu thích -->
    <div v-if="stock.favorite" class="favorite-badge">
      💖 Yêu thích
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// Props - nhận dữ liệu stock từ component cha
const props = defineProps({
  stock: {
    type: Object,
    required: true
  }
});

// Emit - gửi sự kiện lên component cha
const emit = defineEmits(['toggle-favorite']);

// Computed properties - Minh họa tính toán tự động
// Tính phần trăm thay đổi giá
const priceChangePercent = computed(() => {
  if (props.stock.previousPrice === 0) return 0;
  return ((props.stock.price - props.stock.previousPrice) / props.stock.previousPrice * 100).toFixed(2);
});

// Computed: Text hiển thị sự thay đổi giá
const priceChangeText = computed(() => {
  const change = props.stock.price - props.stock.previousPrice;
  if (change > 0) return `+${formatPrice(change)} (+${priceChangePercent.value}%)`;
  if (change < 0) return `${formatPrice(change)} (${priceChangePercent.value}%)`;
  return '0 (0%)';
});

// Computed: CSS class động dựa trên giá tăng/giảm
// Minh họa Style binding
const priceChangeClass = computed(() => {
  if (props.stock.price > props.stock.previousPrice) return 'price-up';
  if (props.stock.price < props.stock.previousPrice) return 'price-down';
  return 'price-neutral';
});

// Computed: Style object cho màu sắc động
// Minh họa Style binding với object
const priceChangeStyle = computed(() => {
  const change = props.stock.price - props.stock.previousPrice;
  return {
    color: change > 0 ? '#27ae60' : change < 0 ? '#e74c3c' : '#95a5a6',
    fontWeight: 'bold'
  };
});

// Methods
function toggleFavorite() {
  // Emit event lên component cha để xử lý
  // Minh họa: Child -> Parent communication
  emit('toggle-favorite', props.stock.id);
}

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price);
}

function formatVolume(volume) {
  if (volume >= 1000000) {
    return (volume / 1000000).toFixed(1) + 'M';
  }
  if (volume >= 1000) {
    return (volume / 1000).toFixed(1) + 'K';
  }
  return volume.toString();
}
</script>

<style scoped>
.stock-item {
  background: white;
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border-left: 4px solid #e0e0e0;
}

.stock-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Style binding - màu border theo giá tăng/giảm */
.stock-item.price-up {
  border-left-color: #27ae60;
  background: linear-gradient(to right, #f0fff4 0%, white 10%);
}

.stock-item.price-down {
  border-left-color: #e74c3c;
  background: linear-gradient(to right, #fff5f5 0%, white 10%);
}

.stock-item.price-neutral {
  border-left-color: #95a5a6;
}

.stock-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stock-code-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stock-code {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

.stock-exchange {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  border-radius: 4px;
  font-weight: 600;
}

.favorite-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #bdc3c7;
  transition: all 0.3s ease;
  padding: 0.25rem;
}

.favorite-btn:hover {
  transform: scale(1.2);
}

.favorite-btn.active {
  color: #f39c12;
}

.stock-name {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: #34495e;
  font-weight: 600;
}

.stock-price-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.price-change {
  font-size: 0.9rem;
}

.price-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.price-info .label {
  font-weight: 600;
}

.favorite-badge {
  margin-top: 0.75rem;
  padding: 0.4rem 0.75rem;
  background: linear-gradient(135deg, #f2994a 0%, #f2c94c 100%);
  color: white;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}
</style>
