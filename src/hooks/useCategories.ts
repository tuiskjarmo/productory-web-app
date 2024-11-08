import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Category, Topic } from '../types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*');

        if (categoriesError) throw categoriesError;

        // Fetch topics for all categories
        const { data: topicsData, error: topicsError } = await supabase
          .from('topics')
          .select('*');

        if (topicsError) throw topicsError;

        // Organize topics by category
        const categoriesWithTopics = categoriesData.map(category => ({
          ...category,
          topics: topicsData.filter(topic => topic.category_id === category.id)
        }));

        setCategories(categoriesWithTopics);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}