# 🎤 Hướng dẫn Demo cho Buổi Thuyết trình

## 📋 Checklist trước khi demo

- [ ] `npm install` đã chạy
- [ ] `npm run dev` đang chạy
- [ ] Mở http://localhost:5173
- [ ] Mở Console (F12) để show logs

---

## 🎯 Kịch bản Demo (15-20 phút)

### **1. Giới thiệu (1 phút)**
- "Đây là ứng dụng quản lý cổ phiếu đơn giản"
- "Mục đích: Demo TẤT CẢ tính năng quan trọng của Vue 3"

### **2. Demo UI & Reactivity (3 phút)**

**Thao tác:**
1. Tìm kiếm cổ phiếu (search box) → Demo **v-model**
2. Click filter buttons → Demo **computed** và **conditional rendering**
3. Click nút ⭐ (favorite) → Demo **reactivity** + **emit events**
4. Click "Mô phỏng thay đổi giá" → Demo **reactivity tự động update UI**
   - Màu đổi từ xanh/đỏ → Demo **style binding**

**Giải thích:**
- "Vue Reactivity: Data thay đổi → UI tự động cập nhật"
- "Không cần jQuery, không cần manual DOM manipulation"

### **3. Demo Component Architecture (3 phút)**

**Show code structure:**
```
App (cha)
  ├─ Header (con) ← nhận props
  ├─ UserPanel (con) ← nhận props, emit events
  └─ StockList (con)
       └─ StockItem (cháu) ← props, emit
```

**Giải thích:**
- **Props**: Cha truyền data xuống con
- **Emit**: Con gửi events lên cha
- **v-for**: Render list StockItem

### **4. Demo Vue Router (2 phút)**

**Thao tác:**
1. Click "Giới thiệu" → Chuyển trang KHÔNG reload
2. Show URL thay đổi: `/` → `/about`
3. Click "Trang chủ" → Quay lại

**Giải thích:**
- "SPA (Single Page Application)"
- "Router quản lý navigation"

### **5. Demo Slots (2 phút)**

**Ở trang About:**
- Show các FeatureCard
- Giải thích: "Mỗi card dùng chung 1 component với slots khác nhau"

**Show code FeatureCard.vue:**
```vue
<slot name="icon">❓</slot>
<slot name="title">Title</slot>
<slot name="description">Desc</slot>
```

### **6. Demo Lifecycle & Watch (2 phút)**

**Mở Console (F12):**
1. Refresh trang → Show logs từ `onMounted`
2. Đổi user (dropdown) → Show logs từ `watch`

**Giải thích:**
- "Lifecycle hooks: Code chạy ở các giai đoạn của component"
- "Watch: Tự động chạy khi data thay đổi"

### **7. Demo Custom Directive (1 phút)**

**Ở trang About:**
- Show text được highlight màu vàng
- Giải thích: "v-highlight là custom directive tự tạo"

### **8. Demo Composables (1 phút)**

**Show file useFilter.js:**
- "Logic tái sử dụng được"
- "Có thể dùng ở nhiều component khác nhau"

### **9. Tổng kết (2 phút)**

**List features đã demo:**
✅ Reactivity  
✅ Computed Properties  
✅ Components (5 cái)  
✅ Props & Emit  
✅ v-model, v-for, v-if, v-show  
✅ Style Binding  
✅ Vue Router  
✅ Lifecycle Hooks  
✅ Watch  
✅ Slots  
✅ Composables  
✅ Custom Directives  

**Kết:** "Vue 3 giúp build UI reactive, modular, và maintainable"

---

## 💡 Tips khi Demo

### Nên làm:
✅ Giải thích TRƯỚC khi click  
✅ Show console logs  
✅ Nói chậm, rõ ràng  
✅ Point vào màn hình khi giải thích  
✅ Có code snippets sẵn để show  

### Không nên:
❌ Click lung tung không giải thích  
❌ Nói quá nhanh  
❌ Giải thích quá kỹ thuật  
❌ Quên mở Console  

---

## 🔧 Troubleshooting

**Nếu app không chạy:**
```bash
npm install
npm run dev
```

**Nếu có lỗi:**
- Check Console (F12)
- Restart dev server (Ctrl+C → npm run dev)

---

## 📝 Q&A có thể gặp

**Q: Vue khác React như thế nào?**
A: Vue dễ học hơn, có template syntax, reactivity tự động hơn.

**Q: Composition API là gì?**
A: Cách mới để organize code trong Vue 3, thay thế Options API.

**Q: Khi nào dùng v-if vs v-show?**
A: v-if cho điều kiện ít thay đổi, v-show cho toggle nhiều.

**Q: Props vs Emit?**
A: Props = cha → con, Emit = con → cha.

---

**Good luck! 🚀**
