'use client'

import styles from '@/styles/auth.module.scss'
import EmailCertification from '../_components/EmailCertification'

export default function FindPassword() {
  return (
    <>
      <h4 className={styles['label-sm']}>
        본인 확인을 위해 이메일 인증을 해주세요.
      </h4>
      <EmailCertification purpose="resetPw" />
    </>
  )
}
