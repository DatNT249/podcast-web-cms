import { getListChapters } from '@/libs/api/chapters'
import { useTableContext } from '@/libs/components/Table'
import { useQuery } from '@tanstack/react-query'
import { ChapterSearchInputType, ChapterType } from '../type'

export const useChapterListQuery = () => {
  const { input, getTableData, sortOptions } = useTableContext<
    ChapterType,
    ChapterSearchInputType
  >()
  const { page, limit, name, isPremium } = input
  const { sort_by, column } = sortOptions || {}

  const data = useQuery({
    queryKey: ['chapter-list', page, name, limit, sort_by, column, isPremium],
    queryFn: () => getListChapters({ ...input, limit, ...sortOptions }),
  })

  return {
    tableData: getTableData(data),
    totalPages: data.data?.pagination?.totalPages || 0,
  }
}
