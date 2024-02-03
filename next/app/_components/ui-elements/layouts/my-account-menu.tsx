import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { IconButton, Menu, MenuItem } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import axios from '../../../_lib/axios'

const MyAccountMenu = ({ session }: { session: Session }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget as any)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    if (!session) return
    const endpoint = '/api/v1/auth/sign_out'
    const headers = {
      'access-token': session.accessToken as string,
      client: session.client as string,
      uid: session.uid as string,
    }
    try {
      const response = await axios.delete(endpoint, { headers: headers })
      if (response.status === 200) {
        signOut({ redirect: false })
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
          vertical: 'bottom', // ここを 'top' から 'bottom' に変更しました
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top', // ここを 'bottom' から 'top' に変更しました
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
