# 📚 Giải thích các tính năng Vue 3 trong Demo

Tài liệu này giải thích chi tiết từng tính năng của Vue 3 được minh họa trong project, kèm theo vị trí code cụ thể.

---

## 1. 🔄 Reactivity System

### **Là gì?**
Reactivity là cơ chế tự động cập nhật UI khi dữ liệu thay đổi. Khi bạn thay đổi một biến, Vue tự động render lại các phần UI liên quan mà không cần code thêm.

### **Minh họa ở đâu?**

**File: `src/views/Home.vue`** (dòng 37-39)
```javascript
const stocks = ref([...mockStocks]);
// ref() tạo reactive reference
// Khi stocks.value thay đổi → UI tự động update
```

**File: `src/views/Home.vue`** (dòng 61-66)
```javascript
function handleToggleFavorite(stockId) {
  const stock = stocks.value.find(s => s.id === stockId);
  if (stock) {
    stock.favorite = !stock.favorite; // Thay đổi data
    // ✅ Vue tự động re-render UI ngay lập tức!
  }
}
```

**File: `src/views/Home.vue`** (dòng 69-72)
```javascript
function handleUpdateStocks(updatedStocks) {
  stocks.value = updatedStocks; // Cập nhật toàn bộ mảng
  // ✅ UI tự động update với giá mới và màu sắc mới
}
```

### **Cách test:**
1. Click nút ⭐ (favorite) → Icon đổi ngay
2. Click "Mô phỏng thay đổi giá" → Giá và màu đổi ngay
3. Không cần `setState()` hay `forceUpdate()`

---

## 2. 🧮 Computed Properties

### **Là gì?**
Computed properties là các giá trị được tính toán tự động từ reactive data. Chúng được cache và chỉ tính lại khi dependencies thay đổi, giúp tối ưu performance.

### **Minh họa ở đâu?**

**File: `src/views/Home.vue`** (dòng 48-50)
```javascript
const favoriteStocksCount = computed(() => {
  return stocks.value.filter(stock => stock.favorite).length;
});
// Tự động tính lại khi stocks thay đổi
```

**File: `src/components/StockItem.vue`** (dòng 56-59)
```javascript
const priceChangePercent = computed(() => {
  if (props.stock.previousPrice === 0) return 0;
  return ((props.stock.price - props.stock.previousPrice) / props.stock.previousPrice * 100).toFixed(2);
});
```

**File: `src/components/StockItem.vue`** (dòng 62-67)
```javascript
const priceChangeText = computed(() => {
  const change = props.stock.price - props.stock.previousPrice;
  if (change > 0) return `+${formatPrice(change)} (+${priceChangePercent.value}%)`;
  if (change < 0) return `${formatPrice(change)} (${priceChangePercent.value}%)`;
  return '0 (0%)';
});
```

**File: `src/components/StockList.vue`** (dòng 37-39)
```javascript
const favoriteStocks = computed(() => {
  return props.stocks.filter(stock => stock.favorite);
});
```

**File: `src/components/StockList.vue`** (dòng 44-63)
```javascript
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
```

### **Cách test:**
1. Toggle favorite → Header counter tự động cập nhật
2. Search stocks → Số lượng hiển thị tự động thay đổi
3. Click filter → List tự động lọc

---

## 3. 🧩 Component-Based Architecture

### **Là gì?**
Chia UI thành các component nhỏ, độc lập, có thể tái sử dụng. Mỗi component có template, logic và style riêng.

### **Minh họa ở đâu?**

**Cấu trúc component:**
```
AppWithRouter (root)
├── Navigation
└── Router View
    ├── Home.vue
    │   ├── Header.vue
    │   ├── UserPanel.vue
    │   └── StockList.vue
    │       └── StockItem.vue (x10)
    └── About.vue
        └── FeatureCard.vue (x8)
```

**File: `src/views/Home.vue`** (dòng 3-24)
```vue
<template>
  <div>
    <!-- Header Component -->
    <Header 
      :total-stocks="stocks.length"
      :favorite-count="favoriteStocksCount"
      :show-stats="true"
    />
    
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
</template>
```

### **Lợi ích:**
- ✅ Code dễ đọc, dễ bảo trì
- ✅ Component tái sử dụng được
- ✅ Test từng phần riêng biệt
- ✅ Nhiều người code song song

---

## 4. 📥 Props (Parent → Child)

### **Là gì?**
Props là cách truyền dữ liệu từ component cha xuống component con. Con chỉ đọc props, không được sửa trực tiếp.

### **Minh họa ở đâu?**

**Cha truyền props - File: `src/views/Home.vue`** (dòng 5-8)
```vue
<Header 
  :total-stocks="stocks.length"
  :favorite-count="favoriteStocksCount"
  :show-stats="true"
/>
```

**Con nhận props - File: `src/components/Header.vue`** (dòng 33-44)
```javascript
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
```

**Dùng props - File: `src/components/Header.vue`** (dòng 10-17)
```vue
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
```

**Ví dụ khác - File: `src/components/StockItem.vue`** (dòng 51-55)
```javascript
const props = defineProps({
  stock: {
    type: Object,
    required: true
  }
});
```

### **Quy tắc:**
- ✅ Props là **read-only** (chỉ đọc)
- ✅ Có type checking
- ✅ Có default value
- ✅ Có validation

---

## 5. 📤 Emit (Child → Parent)

### **Là gì?**
Emit là cách component con gửi sự kiện (events) lên component cha. Con không trực tiếp sửa props, mà báo cho cha biết để cha tự xử lý.

### **Minh họa ở đâu?**

**Con emit event - File: `src/components/StockItem.vue`** (dòng 87-93)
```javascript
// Khai báo emit
const emit = defineEmits(['toggle-favorite']);

// Gọi emit
function toggleFavorite() {
  emit('toggle-favorite', props.stock.id);
}
```

**Cha lắng nghe event - File: `src/components/StockList.vue`** (dòng 28-31)
```vue
<StockItem
  v-for="stock in filteredStocks"
  :key="stock.id"
  :stock="stock"
  @toggle-favorite="handleToggleFavorite"
/>
```

**Cha xử lý event - File: `src/components/StockList.vue`** (dòng 70-72)
```javascript
function handleToggleFavorite(stockId) {
  emit('toggle-favorite', stockId); // Emit tiếp lên cha nữa
}
```

**Cha cao nhất xử lý - File: `src/views/Home.vue`** (dòng 61-66)
```javascript
function handleToggleFavorite(stockId) {
  const stock = stocks.value.find(s => s.id === stockId);
  if (stock) {
    stock.favorite = !stock.favorite; // Sửa data
  }
}
```

### **Flow:**
```
StockItem (emit) 
  → StockList (re-emit) 
    → Home (xử lý thay đổi data)
      → Vue Reactivity update UI
```

---

## 6. 🔄 v-model (Two-way Binding)

### **Là gì?**
v-model tạo liên kết hai chiều giữa input và data. Khi user nhập → data thay đổi. Khi data thay đổi → input cập nhật.

### **Minh họa ở đâu?**

**File: `src/components/StockList.vue`** (dòng 8-13)
```vue
<input 
  v-model="searchQuery"
  type="text"
  placeholder="Tìm kiếm theo mã hoặc tên cổ phiếu..."
  class="search-input"
/>
```

**File: `src/components/StockList.vue`** (dòng 32-33)
```javascript
const searchQuery = ref('');
// Khi user gõ → searchQuery tự động update
// Khi searchQuery thay đổi → input tự động update
```

**File: `src/components/UserPanel.vue`** (dòng 16-24)
```vue
<select 
  id="user-select"
  v-model="selectedUserId"
  @change="handleUserChange"
  class="user-dropdown"
>
  <option 
    v-for="user in users" 
    :key="user.id" 
    :value="user.id"
  >
    {{ user.name }} ({{ user.role }})
  </option>
</select>
```

### **Tương đương với:**
```vue
<!-- v-model="searchQuery" -->
<input 
  :value="searchQuery"
  @input="searchQuery = $event.target.value"
/>
```

---

## 7. 📋 v-for (List Rendering)

### **Là gì?**
v-for dùng để render một mảng thành nhiều elements. Mỗi item cần có `key` unique để Vue track được.

### **Minh họa ở đâu?**

**File: `src/components/StockList.vue`** (dòng 26-31)
```vue
<div v-if="filteredStocks.length > 0" class="stock-grid">
  <StockItem
    v-for="stock in filteredStocks"
    :key="stock.id"
    :stock="stock"
    @toggle-favorite="handleToggleFavorite"
  />
</div>
```

**File: `src/components/UserPanel.vue`** (dòng 20-27)
```vue
<option 
  v-for="user in users" 
  :key="user.id" 
  :value="user.id"
>
  {{ user.name }} ({{ user.role }})
</option>
```

**File: `src/views/About.vue`** (dòng 16-68)
```vue
<FeatureCard>...</FeatureCard>
<FeatureCard>...</FeatureCard>
<FeatureCard>...</FeatureCard>
<!-- Repeat nhiều lần -->
```

### **Lưu ý:**
- ✅ Luôn dùng `:key` với giá trị unique
- ✅ Không dùng index làm key nếu list có thể thay đổi thứ tự
- ✅ Key giúp Vue track và optimize re-render

---

## 8. 🎯 v-if / v-show (Conditional Rendering)

### **Là gì?**
- **v-if**: Element bị remove khỏi DOM khi false
- **v-show**: Element vẫn trong DOM, chỉ toggle CSS `display: none`

### **Minh họa ở đâu?**

**v-if - File: `src/components/Header.vue`** (dòng 10)
```vue
<div v-if="showStats" class="stats-section">
  <!-- Chỉ render khi showStats = true -->
</div>
```

**v-if - File: `src/components/StockItem.vue`** (dòng 46-48)
```vue
<div v-if="stock.favorite" class="favorite-badge">
  💖 Yêu thích
</div>
```

**v-if/v-else - File: `src/components/StockList.vue`** (dòng 26-43)
```vue
<div v-if="filteredStocks.length > 0" class="stock-grid">
  <!-- List stocks -->
</div>

<div v-else class="no-results">
  <!-- No results message -->
</div>
```

**v-show - File: `src/components/StockList.vue`** (dòng 15-19)
```vue
<button 
  v-show="searchQuery.length > 0"
  @click="clearSearch"
  class="clear-btn"
>
  ✕
</button>
```

### **Khi nào dùng cái nào?**
- **v-if**: Điều kiện ít thay đổi (vd: user role, permissions)
- **v-show**: Toggle nhiều lần (vd: dropdown, modal, tooltip)

---

## 9. 🎨 Style Binding

### **Là gì?**
Bind CSS class hoặc inline style động dựa trên data. Style thay đổi theo reactivity.

### **Minh họa ở đâu?**

**Class Binding - File: `src/components/StockItem.vue`** (dòng 1)
```vue
<div class="stock-item" :class="priceChangeClass">
  <!-- class động thêm vào -->
</div>
```

**File: `src/components/StockItem.vue`** (dòng 70-74)
```javascript
const priceChangeClass = computed(() => {
  if (props.stock.price > props.stock.previousPrice) return 'price-up';
  if (props.stock.price < props.stock.previousPrice) return 'price-down';
  return 'price-neutral';
});
```

**CSS - File: `src/components/StockItem.vue`** (dòng 111-124)
```css
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
```

**Inline Style Binding - File: `src/components/StockItem.vue`** (dòng 30-31)
```vue
<span class="price-change" :style="priceChangeStyle">
  {{ priceChangeText }}
</span>
```

**File: `src/components/StockItem.vue`** (dòng 77-83)
```javascript
const priceChangeStyle = computed(() => {
  const change = props.stock.price - props.stock.previousPrice;
  return {
    color: change > 0 ? '#27ae60' : change < 0 ? '#e74c3c' : '#95a5a6',
    fontWeight: 'bold'
  };
});
```

**Class Binding khác - File: `src/components/StockItem.vue`** (dòng 11-15)
```vue
<button 
  @click="toggleFavorite"
  class="favorite-btn"
  :class="{ active: stock.favorite }"
>
```

### **Kết quả:**
- 📈 Giá tăng → Border xanh, background xanh nhạt
- 📉 Giá giảm → Border đỏ, background đỏ nhạt
- ⭐ Favorite → Icon màu vàng

---

## 10. 🔀 Vue Router

### **Là gì?**
Vue Router quản lý navigation trong SPA (Single Page Application). Chuyển trang không reload browser, chỉ thay đổi component hiển thị.

### **Minh họa ở đâu?**

**Config Router - File: `src/router/index.js`**
```javascript
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
```

**Setup Router - File: `src/main.js`**
```javascript
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

**Navigation - File: `src/AppWithRouter.vue`** (dòng 6-8)
```vue
<nav class="app-nav">
  <router-link to="/" class="nav-link">🏠 Trang chủ</router-link>
  <router-link to="/about" class="nav-link">ℹ️ Giới thiệu</router-link>
</nav>
```

**Router View - File: `src/AppWithRouter.vue`** (dòng 13)
```vue
<router-view />
<!-- Component (Home hoặc About) được render ở đây -->
```

**Router Link Active Class - File: `src/AppWithRouter.vue`** (dòng 58-62)
```css
.nav-link.router-link-active {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
}
```

### **Cách test:**
1. Click "Giới thiệu" → URL đổi thành `/about`
2. Browser KHÔNG reload
3. Component About.vue được render
4. Click "Trang chủ" → URL đổi thành `/`
5. Component Home.vue được render

---

## 11. ⏰ Lifecycle Hooks

### **Là gì?**
Lifecycle hooks là các hàm chạy ở các giai đoạn khác nhau của component (tạo, mount, update, destroy).

### **Minh họa ở đâu?**

**onMounted - File: `src/views/Home.vue`** (dòng 41-44)
```javascript
onMounted(() => {
  console.log('✅ Home page mounted!');
  console.log('📊 Loaded', stocks.value.length, 'stocks');
});
```

**onMounted - File: `src/views/About.vue`** (dòng 97-99)
```javascript
onMounted(() => {
  console.log('✅ About page mounted!');
});
```

**onMounted - File: `src/AppWithRouter.vue`** (dòng 18-20)
```javascript
onMounted(() => {
  console.log('✅ App mounted - Vue Router initialized!');
});
```

### **Cách test:**
1. Mở Console (F12)
2. Refresh trang → Thấy "✅ App mounted"
3. Click "Giới thiệu" → Thấy "✅ About page mounted"
4. Click "Trang chủ" → Thấy "✅ Home page mounted"

### **Các hooks khác (không dùng trong demo):**
- `onBeforeMount` - Trước khi mount
- `onUpdated` - Sau khi component update
- `onBeforeUnmount` - Trước khi component bị destroy
- `onUnmounted` - Sau khi destroy

---

## 12. 🔍 Watch

### **Là gì?**
Watch theo dõi sự thay đổi của một reactive value và chạy callback function. Khác computed, watch thực hiện side effects (API call, log, etc).

### **Minh họa ở đâu?**

**File: `src/views/Home.vue`** (dòng 46-49)
```javascript
watch(currentUser, (newUser, oldUser) => {
  console.log('🔍 Watch: User changed from', oldUser?.name, 'to', newUser.name);
});
```

**File: `src/components/UserPanel.vue`** (dòng 46-49)
```javascript
watch(() => props.currentUser.id, (newId) => {
  selectedUserId.value = newId;
});
```

### **Cách test:**
1. Mở Console (F12)
2. Đổi user trong dropdown
3. Thấy log "🔍 Watch: User changed from ... to ..."

### **Computed vs Watch:**
| Computed | Watch |
|----------|-------|
| Return value | Không return |
| Dùng cho UI | Dùng cho side effects |
| Cached | Không cached |
| Sync | Có thể async |

---

## 13. 📦 Slots

### **Là gì?**
Slots cho phép component cha truyền nội dung (content) vào component con. Giúp component con linh hoạt hơn.

### **Minh họa ở đâu?**

**Định nghĩa slots - File: `src/components/FeatureCard.vue`** (dòng 2-16)
```vue
<template>
  <div class="feature-card">
    <div class="feature-icon">
      <slot name="icon">❓</slot>
    </div>
    <div class="feature-content">
      <h3>
        <slot name="title">Feature Title</slot>
      </h3>
      <p>
        <slot name="description">Feature description</slot>
      </p>
    </div>
  </div>
</template>
```

**Sử dụng slots - File: `src/views/About.vue`** (dòng 16-21)
```vue
<FeatureCard>
  <template #icon>🔄</template>
  <template #title>Reactivity</template>
  <template #description>Data thay đổi tự động cập nhật UI</template>
</FeatureCard>
```

**Sử dụng khác - File: `src/views/About.vue`** (dòng 23-28)
```vue
<FeatureCard>
  <template #icon>🧮</template>
  <template #title>Computed Properties</template>
  <template #description>Tính toán tự động từ reactive data</template>
</FeatureCard>
```

### **Kết quả:**
- 1 component FeatureCard
- Dùng 8 lần với nội dung khác nhau
- Không cần tạo 8 component riêng

### **Loại slots:**
- **Named slots**: `<slot name="icon">`
- **Default slot**: `<slot>` (không có name)
- **Scoped slots**: Truyền data từ child lên parent (không demo)

---

## 14. 🔌 Composables

### **Là gì?**
Composables là functions chứa logic tái sử dụng được. Giống React Hooks. Giúp tách logic ra khỏi component.

### **Minh họa ở đâu?**

**File: `src/composables/useFilter.js`**
```javascript
import { ref, computed } from 'vue';

export function useFilter(items) {
  const filterType = ref('all');
  
  const filteredItems = computed(() => {
    if (filterType.value === 'favorite') {
      return items.value.filter(item => item.favorite);
    }
    return items.value;
  });
  
  return {
    filterType,
    filteredItems
  };
}
```

### **Cách dùng (ví dụ):**
```javascript
// Trong component
import { useFilter } from '@/composables/useFilter';

const stocks = ref([...mockStocks]);
const { filterType, filteredItems } = useFilter(stocks);

// Giờ có thể dùng filterType và filteredItems
```

### **Lợi ích:**
- ✅ Logic tách biệt khỏi UI
- ✅ Tái sử dụng ở nhiều component
- ✅ Dễ test
- ✅ Code cleaner

### **Composables phổ biến:**
- `useRoute`, `useRouter` (Vue Router)
- `useMouse`, `useWindowSize` (VueUse library)
- `useFetch`, `useLocalStorage` (custom)

---

## 15. ✨ Custom Directives

### **Là gì?**
Custom directives là các directive tự tạo (như v-if, v-for). Dùng để thao tác DOM trực tiếp.

### **Minh họa ở đâu?**

**Định nghĩa directive - File: `src/directives/highlight.js`**
```javascript
export const vHighlight = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow';
    el.style.padding = '4px 8px';
    el.style.borderRadius = '4px';
  }
};
```

**Import directive - File: `src/views/About.vue`** (dòng 3)
```javascript
import { vHighlight } from '../directives/highlight.js';
```

**Sử dụng directive - File: `src/views/About.vue`** (dòng 11)
```vue
<p>
  Demo ứng dụng quản lý cổ phiếu để minh họa 
  <span v-highlight="'#fffacd'">các tính năng của Vue 3</span>
</p>
```

### **Kết quả:**
Text "các tính năng của Vue 3" có background màu vàng nhạt (#fffacd).

### **Lifecycle hooks của directive:**
- `created` - Trước khi attrs được bind
- `beforeMount` - Trước khi element được insert vào DOM
- `mounted` - Element đã trong DOM
- `beforeUpdate` - Trước khi component update
- `updated` - Sau khi component update
- `beforeUnmount` - Trước khi element bị remove
- `unmounted` - Element đã bị remove

---

## 📊 Tổng kết

| Tính năng | File chính | Dòng code |
|-----------|-----------|-----------|
| Reactivity | `Home.vue` | 37-39, 61-72 |
| Computed | `Home.vue`, `StockItem.vue`, `StockList.vue` | 48-50, 56-83, 37-63 |
| Components | Tất cả `.vue` files | - |
| Props | `Header.vue`, `StockItem.vue` | 33-44, 51-55 |
| Emit | `StockItem.vue`, `StockList.vue` | 87-93, 70-72 |
| v-model | `StockList.vue`, `UserPanel.vue` | 8-13, 16-24 |
| v-for | `StockList.vue`, `UserPanel.vue` | 26-31, 20-27 |
| v-if/v-show | `Header.vue`, `StockItem.vue`, `StockList.vue` | 10, 46-48, 15-43 |
| Style Binding | `StockItem.vue` | 1, 30-31, 70-83 |
| Vue Router | `router/index.js`, `AppWithRouter.vue` | Toàn bộ |
| Lifecycle | `Home.vue`, `About.vue` | 41-44, 97-99 |
| Watch | `Home.vue`, `UserPanel.vue` | 46-49, 46-49 |
| Slots | `FeatureCard.vue`, `About.vue` | 2-16, 16-68 |
| Composables | `composables/useFilter.js` | Toàn bộ |
| Directives | `directives/highlight.js`, `About.vue` | Toàn bộ, line 11 |