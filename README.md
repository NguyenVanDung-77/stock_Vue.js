# 📈 Demo Stock VueJS

Ứng dụng quản lý cổ phiếu đơn giản được xây dựng với **Vue 3** và **Vite** để minh họa các tính năng chính của VueJS.

## 🎯 Mục đích

Project này được tạo ra để **minh họa và trình bày các đặc điểm lý thuyết của VueJS** thông qua một ứng dụng thực tế:

### ✨ Các tính năng VueJS được demo:

1. **Reactivity System** 🔄
   - Dữ liệu thay đổi tự động cập nhật UI
   - Sử dụng `ref()` để tạo reactive state
   - Demo rõ trong button "Mô phỏng thay đổi giá"

2. **Computed Properties** 🧮
   - Tính toán tự động từ reactive data
   - Được cache và chỉ tính lại khi dependencies thay đổi
   - Ví dụ: `favoriteStocksCount`, `priceChangePercent`

3. **Component-Based Architecture** 🧩
   - Chia nhỏ UI thành các component tái sử dụng
   - Components: `Header`, `UserPanel`, `StockList`, `StockItem`

4. **Props (Parent → Child)** 📥
   - Truyền dữ liệu từ component cha xuống con
   - Type checking và validation
   - Ví dụ: `App` → `StockList` → `StockItem`

5. **Emit (Child → Parent)** 📤
   - Gửi events từ component con lên cha
   - Ví dụ: `StockItem` emit `toggle-favorite` lên `StockList`

6. **v-model (Two-way Binding)** 🔄
   - Liên kết hai chiều cho form inputs
   - Demo trong search box và user selector

7. **v-for (List Rendering)** 📋
   - Render danh sách động
   - Render danh sách stocks với key unique

8. **v-if / v-show (Conditional Rendering)** 🎯
   - Hiển thị có điều kiện
   - `v-if`: favorite badge, no results message
   - `v-show`: clear button trong search

9. **Style Binding** 🎨
   - CSS động dựa trên data
   - Màu sắc thay đổi theo giá tăng/giảm
   - Class binding và inline style binding

10. **Vue Router** 🔀
    - SPA navigation (Home, About)
    - Router links và router-view
    - Không reload trang khi chuyển route

11. **Lifecycle Hooks** ⏰
    - onMounted trong các components
    - Log ra console khi component mount

12. **Watch** 🔍
    - Theo dõi sự thay đổi của reactive data
    - Watch currentUser trong Home.vue

13. **Slots** 📦
    - Named slots trong FeatureCard
    - Component linh hoạt và tái sử dụng

14. **Composables** 🔌
    - useFilter.js - reusable logic
    - Tách logic ra khỏi component

15. **Custom Directives** ✨
    - v-highlight directive
    - Tô màu background cho text

## 🗂️ Cấu trúc Project

```
DemoStockVuejs/
├── src/
│   ├── components/
│   │   ├── Header.vue          # Header với thống kê
│   │   ├── UserPanel.vue       # Panel chọn user
│   │   ├── StockList.vue       # Danh sách cổ phiếu
│   │   ├── StockItem.vue       # Item cổ phiếu
│   │   └── FeatureCard.vue     # Card với slots
│   ├── views/
│   │   ├── Home.vue            # Trang chủ
│   │   └── About.vue           # Trang giới thiệu
│   ├── router/
│   │   └── index.js            # Vue Router config
│   ├── composables/
│   │   └── useFilter.js        # Composable example
│   ├── directives/
│   │   └── highlight.js        # Custom directive
│   ├── data/
│   │   └── mockData.js         # Mock data
│   ├── AppWithRouter.vue       # Root component
│   ├── main.js                 # Entry point
│   └── style.css               # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Cài đặt và Chạy

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### 3. Build cho production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## 💡 Các tính năng chính

### 🔍 Tìm kiếm cổ phiếu
- Tìm kiếm theo mã hoặc tên cổ phiếu
- Real-time search với v-model
- Hiển thị số kết quả tìm được

### 🔖 Lọc cổ phiếu
- Tất cả cổ phiếu
- Chỉ cổ phiếu yêu thích
- Cổ phiếu tăng giá
- Cổ phiếu giảm giá

### ⭐ Đánh dấu yêu thích
- Click vào icon sao để toggle favorite
- UI tự động cập nhật nhờ Vue Reactivity
- Hiển thị badge cho cổ phiếu yêu thích

### 📊 Hiển thị giá động
- Màu xanh: giá tăng 📈
- Màu đỏ: giá giảm 📉
- Màu xám: giá không đổi
- Border và background thay đổi theo style binding

### 🔄 Mô phỏng thay đổi giá
- Button "Mô phỏng thay đổi giá" để demo Reactivity
- Random thay đổi giá ±2%
- Vue tự động re-render tất cả UI liên quan

### 👤 Quản lý người dùng
- Chọn user hiện tại
- Hiển thị avatar, tên, role, email
- Demo v-model và emit events

## 📚 Kiến thức Vue được minh họa

### Reactivity System
```javascript
// ref() tạo reactive reference
const stocks = ref([...mockStocks]);

// Khi thay đổi, UI tự động update
function handleToggleFavorite(stockId) {
  const stock = stocks.value.find(s => s.id === stockId);
  stock.favorite = !stock.favorite; // ✅ Vue tự động re-render
}
```

### Computed Properties
```javascript
// Computed tự động tính lại khi dependencies thay đổi
const favoriteStocksCount = computed(() => {
  return stocks.value.filter(stock => stock.favorite).length;
});
```

### Props & Emit
```javascript
// Component con nhận props
const props = defineProps({
  stock: { type: Object, required: true }
});

// Component con emit event lên cha
const emit = defineEmits(['toggle-favorite']);
emit('toggle-favorite', props.stock.id);
```

### v-model (Two-way Binding)
```vue
<input v-model="searchQuery" />
<!-- Equivalent to: -->
<input 
  :value="searchQuery"
  @input="searchQuery = $event.target.value" 
/>
```

### v-for (List Rendering)
```vue
<StockItem
  v-for="stock in filteredStocks"
  :key="stock.id"
  :stock="stock"
/>
```

### v-if / v-show
```vue
<!-- v-if: element bị remove khỏi DOM -->
<div v-if="stock.favorite">💖 Yêu thích</div>

<!-- v-show: element vẫn trong DOM, chỉ đổi display -->
<button v-show="searchQuery.length > 0">Clear</button>
```

### Style Binding
```vue
<!-- Class binding -->
<div :class="['stock-item', priceChangeClass]">

<!-- Inline style binding -->
<span :style="{ color: priceColor, fontWeight: 'bold' }">
```

## 🎨 Giao diện

- **Modern Design**: Gradient backgrounds, shadows, rounded corners
- **Responsive**: Hoạt động tốt trên mobile và desktop
- **Color Coding**: Màu sắc trực quan cho giá tăng/giảm
- **Smooth Transitions**: Animations mượt mà
- **User-Friendly**: Dễ sử dụng và hiểu

## 📝 Ghi chú

- Dữ liệu lấy từ `mockData.js` (không có backend/database)
- Không sử dụng MongoDB hay API
- Tập trung vào việc minh họa các concepts của Vue
- Code có chú thích chi tiết để dễ học tập

## 🛠️ Công nghệ sử dụng

- **Vue 3** - Progressive JavaScript Framework
- **Vite** - Next Generation Frontend Tooling
- **Composition API** - `<script setup>` syntax
- **CSS3** - Modern styling với gradients, flexbox, grid