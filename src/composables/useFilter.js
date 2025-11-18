import { ref, computed } from 'vue';

/**
 * COMPOSABLE - Reusable logic
 * Demo: Logic có thể tái sử dụng ở nhiều component
 */

export function useFilter(items) {
  const filterType = ref('all');
  
  // Computed: filtered items dựa trên filterType
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
