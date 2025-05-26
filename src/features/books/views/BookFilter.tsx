'use client'

import { FilterBar, FilterColumn } from '@/libs/components/Table/FilterBar'
import { ExVoid } from '@/libs/types/utils'
import { Stack, Typography } from '@mui/material'
import { BookSearchInputType } from '../type'

const BookFilter = () => {
  const filterColumn: FilterColumn<ExVoid<BookSearchInputType>>[] = [
    {
      field: 'name',
      type: 'text',
      placeholder: 'Tìm kiếm theo tên sách',
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
      placeholder: 'Tìm kiếm theo tên tác giả',
      defaultValue: '',
      sx: { width: 240 },

    },
    {
      field: 'isTop10Year',
      type: 'select',
      options: [
        { label: 'Top 10 năm', value: "true" },
        { label: 'Không top 10 năm', value: "false" },
      ],
      placeholder: 'Tìm kiếm theo top 10 năm',
      defaultValue: '',
      sx: { width: 240 },
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
        Danh sách
      </Typography>

      <FilterBar columns={filterColumn} createPath="books/create" buttonSearchUnderButtonCreate />
    </Stack>
  )
}

export { BookFilter }
