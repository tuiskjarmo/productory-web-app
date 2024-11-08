import React from 'react';
import { Clock, Plus, Check } from 'lucide-react';
import { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  isSelected: boolean;
  onSelect: (topic: Topic) => void;
}

export function TopicCard({ topic, isSelected, onSelect }: TopicCardProps) {
  return (
    <div 
      onClick={() => onSelect(topic)}
      className={`bg-white rounded-lg p-6 cursor-pointer transform transition-all duration-300 hover:shadow-lg border ${
        isSelected ? 'border-blue-500 shadow-md' : 'border-gray-100'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{topic.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
          <div className="flex items-center text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{topic.duration}</span>
          </div>
        </div>
        <div className={`rounded-full p-2 ${
          isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
        }`}>
          {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </div>
    </div>
  );
}