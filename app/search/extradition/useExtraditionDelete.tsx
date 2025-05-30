import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useExtraditionDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-extradition'],
    mutationFn: async (id: string) => await axios.delete('/api/extraditions', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['extraditions'] }),
  });
};