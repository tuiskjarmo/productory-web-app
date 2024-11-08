import React, { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { CategoryCard } from './components/CategoryCard';
import { TopicCard } from './components/TopicCard';
import { SelectedTopics } from './components/SelectedTopics';
import { useCategories } from './hooks/useCategories';
import { useRFPSubmission } from './hooks/useRFPSubmission';
import type { Category, Topic, SelectedTopic } from './types';

function App() {
  const { categories, loading, error: loadError } = useCategories();
  const { submitRFP, submitting, error: submitError } = useRFPSubmission();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<SelectedTopic[]>([]);
  const [email, setEmail] = useState('');

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleTopicSelect = (topic: Topic) => {
    const isSelected = selectedTopics.some(
      (t) => t.id === topic.id && t.categoryId === selectedCategory?.id
    );

    if (isSelected) {
      setSelectedTopics(selectedTopics.filter(
        (t) => !(t.id === topic.id && t.categoryId === selectedCategory?.id)
      ));
    } else if (selectedCategory) {
      setSelectedTopics([
        ...selectedTopics,
        {
          ...topic,
          categoryId: selectedCategory.id,
          categoryName: selectedCategory.name,
        },
      ]);
    }
  };

  const handleTopicRemove = (topic: SelectedTopic) => {
    setSelectedTopics(selectedTopics.filter((t) => 
      !(t.id === topic.id && t.categoryId === topic.categoryId)
    ));
  };

  const handleSubmitRFP = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    const success = await submitRFP({
      topics: selectedTopics,
      email
    });

    if (success) {
      alert('RFP submitted successfully! We will contact you shortly with pricing details.');
      setSelectedTopics([]);
      setEmail('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading course catalog...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Error loading course catalog: {loadError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
        <header className="mb-8">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Sparkles className="w-5 h-5" />
            <h1 className="text-2xl font-bold">AI Training Catalog</h1>
          </div>
          <p className="text-gray-600">Select topics for your custom AI training program</p>
        </header>

        {selectedCategory ? (
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Categories
            </button>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {selectedCategory.name}
              </h2>
              <p className="text-gray-600 mb-6">{selectedCategory.description}</p>
              
              <div className="grid gap-4 md:grid-cols-2">
                {selectedCategory.topics.map((topic) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    isSelected={selectedTopics.some(
                      (t) => t.id === topic.id && t.categoryId === selectedCategory.id
                    )}
                    onSelect={handleTopicSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onSelect={handleCategorySelect}
              />
            ))}
          </div>
        )}
      </div>

      <SelectedTopics
        topics={selectedTopics}
        onRemove={handleTopicRemove}
        onSubmit={handleSubmitRFP}
        email={email}
        setEmail={setEmail}
        submitting={submitting}
        error={submitError}
      />
    </div>
  );
}

export default App;