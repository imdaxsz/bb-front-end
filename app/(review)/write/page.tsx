import { PageSearchParams, WriteMode } from '@/types'
import { Metadata } from 'next'
import Editor from './Editor'

export const metadata: Metadata = {
  title: '에디터',
}

export default function WritePage({ searchParams }: PageSearchParams) {
  const mode = (searchParams.mode as string) ?? 'new'
  const logNo = (searchParams.mode as string) ?? ''

  return <Editor mode={mode as WriteMode} id={logNo} />
}
