<template>
  <div id="app">
    <!-- Navigation - Demo Vue Router -->
    <nav class="app-nav">
      <div class="container">
        <div class="nav-links">
          <router-link to="/" class="nav-link">🏠 Trang chủ</router-link>
          <router-link to="/about" class="nav-link">ℹ️ Giới thiệu</router-link>
        </div>
      </div>
    </nav>

    <!-- Router View - Hiển thị component theo route -->
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

/**
 * LIFECYCLE HOOK - onMounted
 * Demo: Chạy code khi component được mount vào DOM
 */
onMounted(() => {
  console.log('✅ App mounted - Vue Router initialized!');
});
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-nav {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1rem 2rem;
}

.nav-links {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: #e0eafc;
  color: #2a5298;
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem 0.5rem;
  }
}
</style>
