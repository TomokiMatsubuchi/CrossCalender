import { Stack, Typography } from '@mui/material'

export default function PrivacyPolicy() {
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
        プライバシーポリシー
      </Typography>
      <Typography variant='body1' paragraph>
        当サービスは、お客様のプライバシーを尊重し、個人情報の保護に努めます。
      </Typography>
      <Typography variant='body1' paragraph>
        本ポリシーは、当サービスを利用する際に、当サービスがどのようにお客様の個人情報を収集、使用、管理するかについて説明します。
      </Typography>
      <Typography variant='body1' paragraph>
        1. 個人情報の収集と利用目的
      </Typography>
      <Typography variant='body1' paragraph>
        当サービスは、当サービスの提供に必要な範囲で、お客様の個人情報を収集することがあります。
        収集する個人情報の項目と利用目的は以下の通りです。
      </Typography>
      <Typography variant='body1' paragraph>
        ・お名前、メールアドレス：当サービスの利用登録、お問い合わせへの対応
      </Typography>
      <Typography variant='body1' paragraph>
        ・利用状況、アクセス情報：当サービスの品質向上、新サービスの開発
      </Typography>
      <Typography variant='body1' paragraph>
        2. 個人情報の第三者提供
      </Typography>
      <Typography variant='body1' paragraph>
        当サービスは、法令に基づく場合を除き、お客様の同意なくして個人情報を第三者に提供することはありません。
      </Typography>
      <Typography variant='body1' paragraph>
        3. 個人情報の管理
      </Typography>
      <Typography variant='body1' paragraph>
        当サービスは、お客様の個人情報の正確性を保ち、不正アクセス、紛失、破壊、改ざん、漏洩などを防ぐため、
        適切なセキュリティ対策を講じています。
      </Typography>
      <Typography variant='body1' paragraph>
        本プライバシーポリシーの内容は、法令等の変更に伴い、予告なく変更されることがあります。
        変更後のプライバシーポリシーについては、当サービス上で適宜公開します。
      </Typography>
    </Stack>
  )
}
