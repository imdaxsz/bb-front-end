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
      href={`/${type}/detail/${id}`}
      onClick={onImageClick}
      className={styles.wrapper}
    >
      <div className={styles.thumnail}>
        <Image width={150} height={210} src={cover} alt={title.split('-')[0]} />
      </div>
      <div className={`${styles.title} ellipsis`}>{title}</div>
      {children && children}
    </Link>
  )
}
