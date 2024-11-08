import React from 'react';
import { X, Clock, Send } from 'lucide-react';
import { SelectedTopic } from '../types';

interface SelectedTopicsProps {
  topics: SelectedTopic[];
  onRemove: (topic: SelectedTopic) => void;
  onSubmit: () => void;
  email: string;
  setEmail: (email: string) => void;
  submitting: boolean;
  error: string | null;
}

export function SelectedTopics({ 
  topics, 
  onRemove, 
  onSubmit,
  email,
  setEmail,
  submitting,
  error
}: SelectedTopicsProps) {
  const totalDuration = topics.reduce((acc, topic) => {
    const hours = parseInt(topic.duration);
    return acc + hours;
  }, 0);

  if (topics.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Selected Topics</h3>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>Total Duration: {totalDuration} hours</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.map((topic) => (
            <div 
              key={`${topic.categoryId}-${topic.id}`}
              className="flex items-center bg-gray-100 rounded-full px-4 py-2 text-sm"
            >
              <span className="text-gray-600 mr-2">{topic.name}</span>
              <button
                onClick={() => onRemove(topic)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email to receive the quote"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <button
          onClick={onSubmit}
          disabled={submitting}
          className="w-full bg-blue-600 text-white rounded-lg py-3 px-6 flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
          {submitting ? 'Submitting...' : 'Submit RFP Request'}
        </button>
      </div>
    </div>
  );
}