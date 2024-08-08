/* eslint-disable no-use-before-define */

'use client'

import { useMediaQuery } from 'react-responsive'

import styles from '@/styles/detail.module.scss'
import { Heart } from '@phosphor-icons/react'
import useGetIsLiked from '../_hooks/useGetIsLiked'
import useToggleLike from '../_hooks/useToggleLike'

interface LikeProps {
  token: string | null
  isbn: string
}

export default function LikeButton({ token, isbn }: LikeProps) {
  const isMobile = useMediaQuery({ maxWidth: 450 })

  const data = useGetIsLiked({ isbn, token })
  const isLiked = token ? Boolean(data) : false
  const likeMutation = useToggleLike({ isbn, token })

  const onClick = async () => {
    if (!token) {
      window.alert('관심 도서 추가는 로그인 후 가능합니다!')
    }
    likeMutation.mutate()
  }

  return (
    <>
      {isMobile ? (
        <button type="button" onClick={onClick} className={styles.like}>
          <span>관심도서</span>
          <Icon isLiked={isLiked} />
        </button>
      ) : (
        <button
          type="button"
          onClick={onClick}
          className={styles.like}
          aria-label="관심 도서"
        >
          <Icon isLiked={isLiked} />
        </button>
      )}
    </>
  )
}

function Icon({ isLiked }: { isLiked: boolean }) {
  return (
    <>
      {isLiked ? (
        <Heart color="#f94a7b" weight="fill" size={32} />
      ) : (
        <Heart size={32} />
      )}
    </>
  )
}
