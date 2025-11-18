/**
 * CUSTOM DIRECTIVE - v-highlight
 * Demo: Tạo directive tùy chỉnh
 * Usage: <div v-highlight="'yellow'">Text</div>
 */

export const vHighlight = {
  mounted(el, binding) {
    el.style.backgroundColor = binding.value || 'yellow';
    el.style.padding = '4px 8px';
    el.style.borderRadius = '4px';
  }
};
