'use client'

import { useRef } from 'react'

export default function useTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const setTextareaHeight = () => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const { scrollHeight } = textareaRef.current
      textareaRef.current.style.height = `${scrollHeight}px`
    }
  }

  return { textareaRef, setTextareaHeight }
}
