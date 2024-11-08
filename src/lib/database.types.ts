export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          created_at?: string;
        };
      };
      topics: {
        Row: {
          id: string;
          category_id: string;
          name: string;
          description: string;
          duration: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          category_id: string;
          name: string;
          description: string;
          duration: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          category_id?: string;
          name?: string;
          description?: string;
          duration?: string;
          created_at?: string;
        };
      };
      rfp_requests: {
        Row: {
          id: string;
          topics: string[];
          contact_email: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          topics: string[];
          contact_email: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          topics?: string[];
          contact_email?: string;
          status?: string;
          created_at?: string;
        };
      };
    };
  };
}