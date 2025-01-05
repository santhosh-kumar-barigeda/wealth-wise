import { useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios-client';
import { SummaryResponse } from '@/features/summary/types/index';

export const useGetSummary = () => {
  const params = useSearchParams();

  const accountId = params.get('accountId') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const url = qs.stringifyUrl(
    {
      url: '/summary',
      query: {
        accountId,
        from,
        to,
      },
    },
    { skipNull: true, skipEmptyString: true }
  );

  const query = useQuery({
    queryKey: ['summary', { accountId, from, to }],
    queryFn: async () => {
      const res = await axiosInstance.get<SummaryResponse>(url);
      return res.data;
    },
  });

  return {
    summary: query.data?.data,
    summaryError: query.error,
    isSummaryLoading: query.isLoading,
    isSummaryError: query.isError,
    accountId,
    from,
    to,
  };
};
