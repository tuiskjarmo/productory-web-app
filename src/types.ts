export interface Topic {
  id: string;
  name: string;
  description: string;
  duration: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface SelectedTopic extends Topic {
  categoryId: string;
  categoryName: string;
}