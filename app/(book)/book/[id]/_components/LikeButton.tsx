/* eslint-disable no-use-before-define */

'use client'

import { useMediaQuery } from 'react-responsive'

import styles from '@/styles/detail.module.scss'
import { Heart } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { toggleLike } from '../actions'

interface LikeProps {
  isbn: string
  isLiked: boolean
}

export default function LikeButton({ isbn, isLiked }: LikeProps) {
  const isMobile = useMediaQuery({ maxWidth: 450 })
  const router = useRouter()

  const onClick = async () => {
    await toggleLike(isbn)
    router.refresh()
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
