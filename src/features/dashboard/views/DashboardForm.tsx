'use client'

import { 
  Box, 
  Grid, 
  Stack, 
  Typography, 
  Paper, 
  Divider, 
  Tooltip, 
  Card, 
  CardContent, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Button,
  IconButton,
  LinearProgress
} from '@mui/material'
import { useStatisticals } from '../hooks'
import CategoryIcon from '@mui/icons-material/Category'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import RadioIcon from '@mui/icons-material/Radio'
import NotificationsIcon from '@mui/icons-material/Notifications'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import StarIcon from '@mui/icons-material/Star'
import AddIcon from '@mui/icons-material/Add'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PersonIcon from '@mui/icons-material/Person'
import Link from 'next/link'

// Style definitions for card variations
const cardStyles = {
  base: {
    height: '100%',
    minHeight: 180, // Enforce minimum height
    padding: 0,
    borderRadius: 4,
    overflow: 'hidden',
    transition: 'transform 0.3s, box-shadow 0.3s',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 30px rgba(0,0,0,0.25)'
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '40%',
      height: '100%',
      background: 'rgba(255,255,255,0.08)',
      clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
    }
  },
  category: {
    background: 'linear-gradient(135deg, #08826D 0%, #0fb193 100%)'
  },
  book: {
    background: 'linear-gradient(135deg, #bd191c 0%, #e54043 100%)'
  },
  chapter: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #333333 100%)'
  },
  episode: {
    background: 'linear-gradient(135deg, #494949 0%, #777777 100%)'
  }
};

const DashboardForm = () => {
  const { data } = useStatisticals()

 
  // Get current time for greeting
  const currentHour = new Date().getHours();
  let greeting = 'Chào buổi sáng';
  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Chào buổi chiều';
  } else if (currentHour >= 18) {
    greeting = 'Chào buổi tối';
  }

  return (
    <Stack height="100%" gap={3}>
      {/* Welcome Section */}
      <Box 
        sx={{
          background: 'linear-gradient(90deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: 2,
          p: 3,
          mb: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            {greeting}, Admin
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Chào mừng quay trở lại với hệ thống quản lý Podcast
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button variant="contained" 
            href='/books/create'
              startIcon={<AddIcon />}
              sx={{ bgcolor: '#08826D', '&:hover': { bgcolor: '#06634f' } }}
            >
              Thêm Sách Mới
            </Button>
          </Box>
        </Box>
        <Avatar 
          sx={{ 
            width: 80, 
            height: 80,
            bgcolor: '#08826D',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>
      </Box>

      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, mt: 2 }}>
        Thống Kê Tổng Quan
      </Typography>
      
      {/* Statistics Cards */}
      <Grid container spacing={4}>
        {/* Category Card */}
        <Grid item xs={12} sm={6} md={3} component={Link} href='/categories'>
          <Tooltip title="Tổng số danh mục" arrow placement="top">
            <Paper elevation={6} sx={{ ...cardStyles.base, ...cardStyles.category }}>
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" fontWeight="medium" color="white">
                    Danh mục
                  </Typography>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 50, height: 50 }}>
                    <CategoryIcon sx={{ color: 'white', fontSize: 28 }} />
                  </Avatar>
                </Box>
                <Typography variant="h2" fontWeight="bold" color="white" sx={{ mt: 'auto' }}>
                  {data?.categoryCount || 0}
                </Typography>
                <Typography variant="subtitle1" color="rgba(255,255,255,0.7)" sx={{ mt: 1 }}>
                  Tổng số danh mục
                </Typography>
              </Box>
            </Paper>
          </Tooltip>
        </Grid>
        
        {/* Book Card */}
        <Grid item xs={12} sm={6} md={3} component={Link} href='/books'>
          <Tooltip title="Tổng số sách" arrow placement="top">
            <Paper elevation={6} sx={{ ...cardStyles.base, ...cardStyles.book }}>
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" fontWeight="medium" color="white">
                    Sách
                  </Typography>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 50, height: 50 }}>
                    <MenuBookIcon sx={{ color: 'white', fontSize: 28 }} />
                  </Avatar>
                </Box>
                <Typography variant="h2" fontWeight="bold" color="white" sx={{ mt: 'auto' }}>
                  {data?.bookCount || 0}
                </Typography>
                <Typography variant="subtitle1" color="rgba(255,255,255,0.7)" sx={{ mt: 1 }}>
                  Tổng số sách
                </Typography>
              </Box>
            </Paper>
          </Tooltip>
        </Grid>
        
        {/* Chapter Card */}
        <Grid item xs={12} sm={6} md={3} component={Link} href='/chapters'  >
          <Tooltip title="Tổng số chương" arrow placement="top">
            <Paper elevation={6} sx={{ ...cardStyles.base, ...cardStyles.chapter }}>
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" fontWeight="medium" color="white">
                    Chương
                  </Typography>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 50, height: 50 }}>
                    <BookmarkIcon sx={{ color: 'white', fontSize: 28 }} />
                  </Avatar>
                </Box>
                <Typography variant="h2" fontWeight="bold" color="white" sx={{ mt: 'auto' }}>
                  {data?.chapterCount || 0}
                </Typography>
                <Typography variant="subtitle1" color="rgba(255,255,255,0.7)" sx={{ mt: 1 }}>
                  Tổng số chương
                </Typography>
              </Box>
            </Paper>
          </Tooltip>
        </Grid>
        
        {/* Episode Card */}
        <Grid item xs={12} sm={6} md={3} component={Link} href='/episodes'  >
          <Tooltip title="Tổng số tập" arrow placement="top">
            <Paper elevation={6} sx={{ ...cardStyles.base, ...cardStyles.episode }}>
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" fontWeight="medium" color="white">
                    Tập
                  </Typography>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 50, height: 50 }}>
                    <RadioIcon sx={{ color: 'white', fontSize: 28 }} />
                  </Avatar>
                </Box>
                <Typography variant="h2" fontWeight="bold" color="white" sx={{ mt: 'auto' }}>
                  {data?.episodeCount || 0}
                </Typography>
                <Typography variant="subtitle1" color="rgba(255,255,255,0.7)" sx={{ mt: 1 }}>
                  Tổng số tập
                </Typography>
              </Box>
            </Paper>
          </Tooltip>
        </Grid>
      </Grid>
     
    </Stack>
  )
}

export { DashboardForm }
