import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
}

export function CategoryCard({ category, onSelect }: CategoryCardProps) {
  return (
    <div 
      onClick={() => onSelect(category)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg border border-gray-100"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
          <p className="text-gray-600">{category.description}</p>
          <p className="text-sm text-gray-500 mt-2">{category.topics.length} topics available</p>
        </div>
        <ChevronRight className="text-gray-400 w-6 h-6" />
      </div>
    </div>
  );
}