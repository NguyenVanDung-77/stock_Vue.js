<template>
  <div class="user-panel">
    <div class="user-info">
      <div class="avatar">{{ userInitial }}</div>
      <div class="user-details">
        <h3>{{ currentUser.name }}</h3>
        <p class="user-role">{{ currentUser.role }}</p>
        <p class="user-email">{{ currentUser.email }}</p>
      </div>
    </div>
    
    <!-- Demo v-model: Two-way binding -->
    <div class="user-selector">
      <label for="user-select">Chọn người dùng:</label>
      <select 
        id="user-select"
        v-model="selectedUserId"
        @change="handleUserChange"
        class="user-dropdown"
      >
        <!-- Demo v-for: Render danh sách -->
        <option 
          v-for="user in users" 
          :key="user.id" 
          :value="user.id"
        >
          {{ user.name }} ({{ user.role }})
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

// Props - nhận danh sách users và current user từ component cha
const props = defineProps({
  users: {
    type: Array,
    required: true
  },
  currentUser: {
    type: Object,
    required: true
  }
});

// Emit - gửi sự kiện lên component cha
// Minh họa: Component communication (Child -> Parent)
const emit = defineEmits(['update:currentUser']);

// Reactive state - minh họa Vue Reactivity
// Khi selectedUserId thay đổi, UI tự động cập nhật
const selectedUserId = ref(props.currentUser.id);

// Computed property - tính toán dữ liệu từ state
// Tự động cập nhật khi currentUser thay đổi
const userInitial = computed(() => {
  return props.currentUser.name.charAt(0).toUpperCase();
});

// Watch - theo dõi sự thay đổi của props
// Minh họa: Reactivity system
watch(() => props.currentUser.id, (newId) => {
  selectedUserId.value = newId;
});

// Event handler - xử lý khi user thay đổi
function handleUserChange() {
  const newUser = props.users.find(u => u.id === selectedUserId.value);
  if (newUser) {
    // Emit event lên component cha
    emit('update:currentUser', newUser);
  }
}
</script>

<style scoped>
.user-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
}

.user-details h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #2c3e50;
}

.user-role {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  color: #2a5298;
  font-weight: 600;
}

.user-email {
  margin: 0;
  font-size: 0.85rem;
  color: #7f8c8d;
}

.user-selector {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.user-selector label {
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 600;
}

.user-dropdown {
  padding: 0.6rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  min-width: 250px;
}

.user-dropdown:hover {
  border-color: #2a5298;
}

.user-dropdown:focus {
  outline: none;
  border-color: #2a5298;
  box-shadow: 0 0 0 3px rgba(42, 82, 152, 0.1);
}

@media (max-width: 768px) {
  .user-panel {
    flex-direction: column;
    align-items: stretch;
  }
  
  .user-dropdown {
    min-width: 100%;
  }
}
</style>
