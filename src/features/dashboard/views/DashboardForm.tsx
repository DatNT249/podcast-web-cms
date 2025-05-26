'use client'

import { Box, Grid, Stack, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import { BarChart } from '@mui/x-charts/BarChart'
import { useStatisticals } from '../hooks'

const DashboardForm = () => {
  const { data } = useStatisticals()
    
  return (
    <Stack height="100%" gap={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              bgcolor: '#08826D',
              color: '#fff',
              textAlign: 'center',
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            <Typography>Danh mục</Typography>
            <Typography>{data?.categoryCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              bgcolor: '#bd191c',
              color: '#fff',
              textAlign: 'center',
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            <Typography>Sách</Typography>
            <Typography>{data?.bookCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              bgcolor: '#000',
              color: '#fff',
              textAlign: 'center',
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            <Typography>Chương</Typography>
            <Typography>{data?.chapterCount}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              bgcolor: '#494949',
              color: '#fff',
              textAlign: 'center',
              padding: 2,
              borderRadius: 1,
              boxShadow: 3,
              fontWeight: 'bold',
              fontSize: '1.2rem',
            }}
          >
            <Typography>Tập</Typography>
            <Typography>{data?.episodeCount}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={6}>
          <BarChart
            colors={['#08826D', '#bd191c', '#494949']}
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            height={500}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart
            colors={['#08826D']}
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            height={500}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}

export { DashboardForm }
