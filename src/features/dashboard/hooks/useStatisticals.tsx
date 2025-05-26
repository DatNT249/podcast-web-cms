import { getStatistics } from '@/libs/api/statisticals'
import { useQuery } from '@tanstack/react-query'

export const useStatisticals = () => {
  const data = useQuery({
    queryKey: ['statisticals'],
    queryFn: () => getStatistics(),
  })

  return data
}
