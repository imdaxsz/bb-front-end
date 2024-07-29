'use client'

import Image from 'next/image'
import styles from '@/styles/item.module.scss'
import Link from 'next/link'

interface Props {
  type: string
  id: string
  title: string
  cover: string
  children?: React.ReactNode
  onImageClick?: () => void
}

export default function BookCard({
  type,
  id,
  title,
  cover,
  children,
  onImageClick,
}: Props) {
  return (
    <Link
      href={`/${type}/${id}`}
      onClick={onImageClick}
      className={styles.wrapper}
      prefetch={false}
    >
      <div className={styles.thumnail}>
        <Image fill src={cover} alt={title.split('-')[0]} />
      </div>
      <div className={`${styles.title} ellipsis`}>{title}</div>
      {children && children}
    </Link>
  )
}
