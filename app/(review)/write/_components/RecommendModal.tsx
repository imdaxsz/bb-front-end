/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-undef */

'use client'

import { toggleRecommend } from '@/(member)/my/actions'
import BookInfoCard from '@/components/BookInfoCard'
import Modal from '@/components/Modal'
import useBoundStore from '@/stores'
import styles from '@/styles/modal.module.scss'

export default function RecommendModal() {
  const { book, resetBook, isRecommendModalVisible } = useBoundStore(
    (state) => ({
      book: state.recommendBook,
      resetBook: state.resetRecommendBook,
      isRecommendModalVisible: state.isModalVisible,
    }),
  )

  const onClickCancel = () => {
    resetBook()
  }

  const onNoMoreRec = async () => {
    await toggleRecommend()
    resetBook()
  }

  function Content() {
    return (
      <>
        <div className={styles.title}>당신을 위한 추천</div>
        <span className={styles.des}>
          다음엔 뭘 읽어볼까? 이런 책은 어때요?
        </span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '30px 0',
          }}
        >
          {book && <BookInfoCard book={book} onImageClick={onClickCancel} />}
        </div>
      </>
    )
  }

  function Bottom() {
    return (
      <>
        <button type="button" className="btn btn-light" onClick={onNoMoreRec}>
          추천 그만 받기
        </button>
        <button
          type="button"
          onClick={onClickCancel}
          className="btn btn-neutral"
        >
          닫기
        </button>
      </>
    )
  }

  if (!isRecommendModalVisible) return <></>

  return (
    <Modal
      onClickOutside={onClickCancel}
      content={<Content />}
      bottom={<Bottom />}
      size="md"
    />
  )
}
