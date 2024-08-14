'use client'

import { Star } from '@phosphor-icons/react'
import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import styles from '@/styles/rating.module.scss'

interface RatingProps {
  size?: 'sm' | 'lg'
  value: number
  readonly: boolean
  onRate?: (i: number) => void
}

export default function Rating({
  size = 'sm',
  value,
  readonly,
  onRate,
}: RatingProps) {
  const [rating, setRating] = useState(value)

  const onClick = (i: number) => {
    if (readonly) return
    setRating(i + 1)
    if (onRate) onRate(i + 1)
  }

  return (
    <div className={`${!readonly && 'pointer'}`}>
      {[...Array(rating)].map((_, i) => (
        <Star
          weight="fill"
          className={styles[`star-${size}`]}
          key={uuidv4()}
          onClick={() => onClick(i)}
        />
      ))}
      {[...Array(5 - rating)].map((_, i) => (
        <Star
          className={styles[`star-${size}`]}
          key={uuidv4()}
          onClick={() => onClick(rating + i)}
        />
      ))}
    </div>
  )
}
