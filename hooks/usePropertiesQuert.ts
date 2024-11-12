import { useQuery } from 'react-query';

const fetchProperties = async (queryParams: string) => {
  const response = await fetch(`/api/properties${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch properties');
  }
  return response.json();
};

export const usePropertiesQuery = (queryParams: string, initialData: any) => {
  return useQuery(
    ['properties', queryParams],
    () => fetchProperties(`?${queryParams}`),
    {
      initialData,  // Hydrate with the initial data fetched from SSR
      staleTime: 60000,  // Cache data for 1 minute
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};