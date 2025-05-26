'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { EpisodeSearchInputType } from '../type'

const EpisodeFilter = () => {
  const filterColumn: FilterColumn<ExVoid<EpisodeSearchInputType>>[] = [
    {
      field: 'name',
      type: 'text',
      placeholder: 'Tìm kiếm theo tên tập',
      defaultValue: '',
      sx: { width: 240 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: 'author',
      type: 'text',
      placeholder: 'Tìm kiếm theo tác giả',
      defaultValue: '',
      sx: { width: 240 },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Danh sách tập
      </Typography>

      <FilterBar
        columns={filterColumn}
        createPath="episodes/create"
        buttonSearchUnderButtonCreate
      />
    </Stack>
  )
}

export { EpisodeFilter }
