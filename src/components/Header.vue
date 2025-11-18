<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo-section">
        <h1>� Stock Manager VueJS</h1>
        <p class="subtitle">Demo các tính năng Vue 3: Reactivity, Components, Props, Emit</p>
      </div>
      
      <!-- Demo v-if: hiển thị có điều kiện -->
      <div v-if="showStats" class="stats-section">
        <div class="stat-item">
          <span class="stat-label">Tổng CP:</span>
          <span class="stat-value">{{ totalStocks }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Yêu thích:</span>
          <span class="stat-value">{{ favoriteCount }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';

// Props - nhận dữ liệu từ component cha
// Minh họa: Component communication (Parent -> Child)
const props = defineProps({
  totalStocks: {
    type: Number,
    default: 0
  },
  favoriteCount: {
    type: Number,
    default: 0
  },
  showStats: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo-section h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.subtitle {
  margin: 0.3rem 0 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.stats-section {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255,255,255,0.15);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

.stat-value {
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 0.2rem;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .stats-section {
    width: 100%;
    justify-content: space-around;
  }
}
</style>
