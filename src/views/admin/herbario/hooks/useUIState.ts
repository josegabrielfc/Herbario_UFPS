import { useState } from 'react';
import { BaseFormState } from '../types';

export const useUIState = (initialState?: Partial<BaseFormState>) => {
  const [state, setState] = useState<BaseFormState>({
    loading: false,
    error: null,
    success: false,
    ...initialState
  });

  const setError = (error: string | null) => setState(prev => ({ ...prev, error }));
  const setSuccess = (success: boolean) => setState(prev => ({ ...prev, success }));
  const setLoading = (loading: boolean) => setState(prev => ({ ...prev, loading }));
  const resetState = () => setState({ loading: false, error: null, success: false });

  return {
    ...state,
    setError,
    setSuccess,
    setLoading,
    resetState
  };
};