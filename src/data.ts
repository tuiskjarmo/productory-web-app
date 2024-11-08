import { Category } from './types';

export const courseData: Category[] = [
  {
    id: 'fundamentals',
    name: 'AI Fundamentals',
    description: 'Core concepts and foundations of artificial intelligence',
    topics: [
      {
        id: 'intro-ai',
        name: 'Introduction to AI',
        description: 'Basic concepts, history, and current state of AI',
        duration: '4 hours'
      },
      {
        id: 'ml-basics',
        name: 'Machine Learning Fundamentals',
        description: 'Core concepts of machine learning and its applications',
        duration: '8 hours'
      },
      {
        id: 'dl-basics',
        name: 'Deep Learning Essentials',
        description: 'Neural networks and deep learning foundations',
        duration: '12 hours'
      }
    ]
  },
  {
    id: 'applications',
    name: 'AI Applications',
    description: 'Practical applications and use cases of AI',
    topics: [
      {
        id: 'nlp',
        name: 'Natural Language Processing',
        description: 'Text analysis, generation, and language understanding',
        duration: '16 hours'
      },
      {
        id: 'cv',
        name: 'Computer Vision',
        description: 'Image recognition, object detection, and visual AI',
        duration: '16 hours'
      },
      {
        id: 'rl',
        name: 'Reinforcement Learning',
        description: 'Decision making and autonomous systems',
        duration: '12 hours'
      }
    ]
  },
  {
    id: 'business',
    name: 'AI in Business',
    description: 'Business applications and implementation strategies',
    topics: [
      {
        id: 'ai-strategy',
        name: 'AI Strategy',
        description: 'Developing and implementing AI initiatives',
        duration: '8 hours'
      },
      {
        id: 'ai-ethics',
        name: 'AI Ethics and Governance',
        description: 'Ethical considerations and responsible AI practices',
        duration: '6 hours'
      },
      {
        id: 'ai-transformation',
        name: 'Digital Transformation with AI',
        description: 'Organizational change and AI adoption',
        duration: '8 hours'
      }
    ]
  }
];