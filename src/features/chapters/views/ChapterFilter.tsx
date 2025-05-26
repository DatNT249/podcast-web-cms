'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { ChapterSearchInputType } from '../type'

const ChapterFilter = () => {
  const filterColumn: FilterColumn<ExVoid<ChapterSearchInputType>>[] = [
    {
      field: 'name',
      type: 'text',
      placeholder: 'Tìm kiếm theo tên chương',
      defaultValue: '',
      sx: { width: 240 },
      fieldOptions: {
        searchIcon: true,
        hasLine: true,
      },
    },
    {
      field: 'isPremium',
      type: 'select',
      options: [
        { label: 'Trả phí', value: "true" },
        { label: 'Miễn phí', value: "false" },
      ],
      placeholder: 'Tìm kiếm theo trả phí',
      defaultValue: '',
      sx: { width: 240 },
    },
  ]

  return (
    <Stack spacing={3}>
      <Typography color="mono.600" variant="h2">
        Danh sách chương
      </Typography>

      <FilterBar
        columns={filterColumn}
        createPath="chapters/create"
        buttonSearchUnderButtonCreate
      />
    </Stack>
  )
}

export { ChapterFilter }
