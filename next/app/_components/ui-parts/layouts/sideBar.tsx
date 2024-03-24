'use client'

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/_components/context/currentUserContext'
import { ReactNode } from 'react'

const SideBar = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const currentUser = useCurrentUser()?.currentUser
  const isAuthenticated = Boolean(currentUser)

  const menuItems = [
    { text: 'ホーム', icon: <HomeIcon />, path: '/' },
    { text: 'カレンダー', icon: <CalendarTodayIcon />, path: '/calendar' },
    { text: 'マイページ', icon: <AccountCircleIcon />, path: '/my-page' },
  ]

  return (
    <Box display='flex'>
      {isAuthenticated ? (
        <Drawer
          variant='permanent'
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              marginTop: '67px',
            },
            display: {
              xs: 'none',
              sm: 'block',
            },
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem disablePadding key={item.text} onClick={() => router.push(item.path)}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      ) : null}
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  )
}

export default SideBar
