<template>
  <main class="main-content">
    <div class="container">
      <div class="about-card">
        <h1>📚 Giới thiệu về Demo</h1>
        
        <section class="section">
          <h2>🎯 Mục đích</h2>
          <p>Demo ứng dụng quản lý cổ phiếu để minh họa <span v-highlight="'#fffacd'">các tính năng của Vue 3</span></p>
        </section>

        <section class="section">
          <h2>✨ Các tính năng Vue đã demo:</h2>
          
          <!-- Demo SLOT - Simple slot usage -->
          <FeatureCard>
            <template #icon>🔄</template>
            <template #title>Reactivity</template>
            <template #description>Data thay đổi tự động cập nhật UI</template>
          </FeatureCard>

          <FeatureCard>
            <template #icon>🧮</template>
            <template #title>Computed Properties</template>
            <template #description>Tính toán tự động từ reactive data</template>
          </FeatureCard>

          <FeatureCard>
            <template #icon>🧩</template>
            <template #title>Components</template>
            <template #description>Chia nhỏ UI thành các phần tái sử dụng</template>
          </FeatureCard>

          <FeatureCard>
            <template #icon>🔌</template>
            <template #title>Composables</template>
            <template #description>Logic tái sử dụng (useFilter)</template>
          </FeatureCard>

          <FeatureCard>
            <template #icon>🔀</template>
            <template #title>Vue Router</template>
            <template #description>Điều hướng SPA không reload trang</template>
          </FeatureCard>

          <FeatureCard>
            <template #icon>📦</template>
            <template #title>Slots</template>
            <template #description>Component linh hoạt với slots</template>
          </FeatureCard>

          <FeatureCard>
            <template #icon>✨</template>
            <template #title>Custom Directives</template>
            <template #description>Tạo directive riêng (v-highlight)</template>
          </FeatureCard>

          <FeatureCard>
            <template #icon>⏰</template>
            <template #title>Lifecycle Hooks</template>
            <template #description>onMounted, watch (xem console log)</template>
          </FeatureCard>
        </section>

        <section class="section">
          <h2>🛠️ Công nghệ</h2>
          <ul>
            <li>Vue 3 (Composition API)</li>
            <li>Vue Router 4</li>
            <li>Vite</li>
          </ul>
        </section>

        <div class="back-button">
          <router-link to="/" class="btn-primary">
            ← Quay lại trang chủ
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import FeatureCard from '../components/FeatureCard.vue';
import { vHighlight } from '../directives/highlight.js';

/**
 * LIFECYCLE HOOK - onMounted
 */
onMounted(() => {
  console.log('✅ About page mounted!');
});
</script>

<style scoped>
.about-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.section {
  margin: 2rem 0;
}

.section h2 {
  color: #2a5298;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.section p {
  color: #2c3e50;
  line-height: 1.8;
  font-size: 1.1rem;
}

.section ul {
  list-style: none;
  padding: 0;
}

.section ul li {
  padding: 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.section ul li:before {
  content: "✓ ";
  color: #27ae60;
  font-weight: bold;
  margin-right: 0.5rem;
}

.back-button {
  margin-top: 2rem;
  text-align: center;
}

.btn-primary {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 60, 114, 0.3);
}
</style>
