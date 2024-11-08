import { useState } from 'react';
import { supabase } from '../lib/supabase';
import type { SelectedTopic } from '../types';

interface SubmitRFPParams {
  topics: SelectedTopic[];
  email: string;
}

export function useRFPSubmission() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRFP = async ({ topics, email }: SubmitRFPParams) => {
    setSubmitting(true);
    setError(null);

    try {
      const { error: submitError } = await supabase
        .from('rfp_requests')
        .insert({
          topics: topics.map(t => t.id),
          contact_email: email,
          status: 'pending'
        });

      if (submitError) throw submitError;
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit RFP');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitRFP, submitting, error };
}