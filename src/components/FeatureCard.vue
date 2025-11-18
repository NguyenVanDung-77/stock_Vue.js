<template>
  <div class="feature-card">
    <div class="feature-icon">
      <!-- SLOT - Named slot cho icon -->
      <slot name="icon">❓</slot>
    </div>
    <div class="feature-content">
      <h3>
        <!-- SLOT - Named slot cho title -->
        <slot name="title">Feature Title</slot>
      </h3>
      <p>
        <!-- SLOT - Named slot cho description -->
        <slot name="description">Feature description</slot>
      </p>
    </div>
  </div>
</template>

<script setup>
/**
 * SLOTS - Demo component linh hoạt
 * Component cha có thể truyền nội dung vào slots
 */
</script>

<style scoped>
.feature-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 2rem;
  min-width: 50px;
  text-align: center;
}

.feature-content h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.feature-content p {
  margin: 0;
  color: #7f8c8d;
  font-size: 0.95rem;
}
</style>
