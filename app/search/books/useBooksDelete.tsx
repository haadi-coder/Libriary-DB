import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const useBooksDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-books'],
    mutationFn: async (id: string) => await axios.delete('/api/books', { params: { id } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  });
};