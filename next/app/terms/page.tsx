import { Stack, Typography } from '@mui/material'

export default function TermsOfService() {
  return (
    <Stack
      spacing={2}
      sx={{
        margin: 'auto',
        maxWidth: 800,
        padding: 4,
        bgcolor: 'background.default',
        boxShadow: 3,
        minHeight: '100vh',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant='h2' gutterBottom>
        利用規約
      </Typography>
      <Typography variant='body1' paragraph>
        この利用規約（以下、「本規約」といいます。）は、私たちが提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
      </Typography>
      <Typography variant='body1' paragraph>
        1. 登録
      </Typography>
      <Typography variant='body1' paragraph>
        ユーザーは、本サービスを利用するにあたり、登録が必要となる場合があります。登録の際には、正確かつ最新の情報を提供する必要があります。また、ユーザーは、ユーザー自身の責任において、アカウントとパスワードを管理するものとします。
      </Typography>
      <Typography variant='body1' paragraph>
        2. 禁止事項
      </Typography>
      <Typography variant='body1' paragraph>
        ユーザーは、以下の行為をしてはなりません。
      </Typography>
      <Typography variant='body1' paragraph>
        ・法令または公序良俗に違反する行為
      </Typography>
      <Typography variant='body1' paragraph>
        ・犯罪行為に関連する行為
      </Typography>
      <Typography variant='body1' paragraph>
        ・本サービスの運営を妨害する行為
      </Typography>
      <Typography variant='body1' paragraph>
        ・他のユーザーに迷惑をかける行為
      </Typography>
      <Typography variant='body1' paragraph>
        ・その他、私たちが不適切と判断する行為
      </Typography>
      <Typography variant='body1' paragraph>
        3. 免責事項
      </Typography>
      <Typography variant='body1' paragraph>
        私たちは、本サービスに関して、その完全性、正確性、確実性、有用性などについて、いかなる保証も行ないません。また、本サービスの利用から生じたいかなる損害に関しても、責任を負いません。
      </Typography>
      <Typography variant='body1' paragraph>
        4. 規約の変更
      </Typography>
      <Typography variant='body1' paragraph>
        私たちは、必要に応じて、本規約を変更することがあります。変更後の規約は、本サービス上での掲示、またはその他の適切な方法により、ユーザーに通知します。
      </Typography>
    </Stack>
  )
}
