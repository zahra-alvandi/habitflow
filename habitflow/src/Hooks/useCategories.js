import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_CATEGORIES = [
  {
    id: "study",
    name: "Study",
    icon: "book",
    color: "#6366F1",
    isDefault: true,
  },
  {
    id: "workout",
    name: "Workout",
    icon: "dumbbell",
    color: "#F97316",
    isDefault: true,
  },
];

export function useCategories() {
  const [categories, setCategories] = useLocalStorage(
    "habitflow-categories",
    DEFAULT_CATEGORIES,
  );

  const addCategory = (category) => {
    const newCategory = {
      id: crypto.randomUUID(),
      name: category.name.trim(),
      icon: category.icon || "target",
      color: category.color || "#6366F1",
      isDefault: false,
    };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id, updates) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  };

  const deleteCategory = (id) => {
    const category = categories.find((c) => c.id === id);
    if (category?.isDefault) return; // پیش‌فرض‌ها حذف نشن
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const getCategory = (id) => {
    return categories.find((c) => c.id === id) || categories[0];
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
  };
}
