import { base } from '@/libs/config/theme'
import { useAuth } from '@/libs/context'
import { Avatar, Box, Divider, IconButton, List, Stack, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AccountIcon from 'public/assets/svgs/account.svg'
import AccountActiveIcon from 'public/assets/svgs/account_active.svg'
import LogoutIcon from 'public/assets/svgs/logout.svg'
import PodcastIcon from '@mui/icons-material/Podcasts'
import { useState, useEffect } from 'react'
import { Modal } from '../../Modal'
import { ListItemButton } from './ItemSidebar'
import { menus } from './menu'

export const SIDE_BAR_WIDTH = 250

const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const handleOpenModal = () => setOpen(true)
  const handleCloseModal = () => setOpen(false)
  const { admin, loading, handleLogout } = useAuth()
  const pathName = usePathname()
  const selfInfoActive = pathName.includes('self-info')

  // Use useEffect to add a class to body when sidebar is mounted
  useEffect(() => {
    document.body.classList.add('has-sidebar');
    return () => {
      document.body.classList.remove('has-sidebar');
    };
  }, []);

  // Function to get time of day for greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  return (
    <Stack
      sx={{
        position: 'fixed',
        width: SIDE_BAR_WIDTH,
        height: '100%',
        background: base.white,
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        zIndex: 1200,
        '&:hover': {
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Logo and Brand Section */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          py: 3,
          px: 2,
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            '&:hover': {
              transform: 'scale(1.03)',
              transition: 'transform 0.2s ease',
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #08826D 0%, #0fb193 100%)',
              boxShadow: '0 4px 8px rgba(8, 130, 109, 0.25)',
            }}
          >
            <PodcastIcon sx={{ color: 'white', fontSize: 26 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#08826D',
              letterSpacing: '0.5px',
              mt: 0.5,
            }}
          >
            Podcast <Box component="span" sx={{ opacity: 0.8, fontWeight: 400 }}>CMS</Box>
          </Typography>
        </Stack>
      </Stack>

      {/* User Welcome Section */}
      <Box 
        sx={{ 
          px: 2, 
          py: 2.5, 
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
          background: 'linear-gradient(to right, rgba(8, 130, 109, 0.05), rgba(255, 255, 255, 0))',
        }}
      >
        
      </Box>

      {/* Navigation Menu */}
      <List
        sx={{
          width: '100%',
          py: 2,
          px: 1.5,
          flexGrow: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#a8a8a8',
          },
        }}
        component="nav"
      >
        {menus.map((menu) => (
          <ListItemButton key={menu.title} menu={menu} />
        ))}
      </List>

      {/* User Profile and Logout Section */}
      <Box
        sx={{
          mt: 'auto',
          width: '100%',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          bgcolor: base.primary,
          background: 'linear-gradient(135deg, #08826D 0%, #0fb193 100%)',
          p: 2,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            component={Link}
            href="/self-info"
            sx={{
              textDecoration: 'none',
              p: 1.5,
              borderRadius: 2,
              transition: 'all 0.2s ease',
              bgcolor: selfInfoActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.15)',
              },
              flexGrow: 1,
            }}
          >
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: 'rgba(255, 255, 255, 0.25)',
                color: '#fff',
                fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              }}
            >
              {admin?.name?.charAt(0)?.toUpperCase() || 'A'}
            </Avatar>

            <Typography
              variant="subtitle2"
              sx={{
                color: '#fff',
                fontWeight: selfInfoActive ? 600 : 400,
                opacity: selfInfoActive ? 1 : 0.9,
                maxWidth: 130,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {admin?.name || 'Admin'}
            </Typography>
          </Stack>

          <Tooltip title="Đăng xuất" placement="top">
            <IconButton 
              onClick={handleOpenModal}
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.1)', 
                color: '#fff',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
              size="small"
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        
        <Typography 
          sx={{ 
            fontSize: 10, 
            color: 'rgba(255, 255, 255, 0.7)', 
            textAlign: 'center', 
            mt: 1.5,
            letterSpacing: '0.5px',
          }}
        >
          © 2025 Podcast CMS. All rights reserved.
        </Typography>
      </Box>

      <Modal
        open={open}
        title="Đăng xuất"
        textSubmit="Xác nhận"
        handleSubmit={handleLogout}
        handleCloseModal={handleCloseModal}
        description="Bạn có chắc muốn đăng xuất chứ ?"
        isLoading={loading}
      />
    </Stack>
  )
}

export { Sidebar }
