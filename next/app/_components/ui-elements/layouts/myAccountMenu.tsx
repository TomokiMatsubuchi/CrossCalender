import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { IconButton, Menu, MenuItem } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCurrentUser } from '../../context/currentUserContext'

const MyAccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()
  const currentUserContext = useCurrentUser()
  if (!currentUserContext) return null
  const { currentUser, setCurrentUser } = currentUserContext

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as any)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      const response = await axios.delete('/api/auth/sign-out', {})
      if (response.status === 200) {
        setCurrentUser(null)
        router.push('/')
      } else {
        alert('サインアウトに失敗しました')
      }
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  return (
    <>
      <IconButton color='inherit' onClick={handleMenu}>
        <AccountCircleIcon fontSize='large' />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link href='/my-page' style={{ textDecoration: 'none', color: 'inherit' }}>
            マイページ
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href='/change-password' style={{ textDecoration: 'none', color: 'inherit' }}>
            パスワード変更
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
      </Menu>
    </>
  )
}

export default MyAccountMenu
