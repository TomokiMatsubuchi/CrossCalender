import { Box, Container, Typography, Link } from '@mui/material'

const Footer = () => {
  return (
    <Box component='footer' sx={{ bgcolor: 'background.paper', py: 6, textAlign: 'center' }}>
      <Container maxWidth='lg'>
        <Typography variant='body1'>Cross Calendar &copy; {new Date().getFullYear()}</Typography>
        <Typography variant='body2' color='text.secondary' mt={2}>
          <Link color='inherit' href='/privacy'>
            プライバシーポリシー
          </Link>
          {' | '}
          <Link color='inherit' href='/terms'>
            利用規約
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
