'use client'

import ReviewBookInfo from '@/components/ReviewBookInfo'
import styles from '@/styles/write.module.scss'
import { Plus } from '@phosphor-icons/react'

import useModal from '@/hooks/useModal'
import Loader from '@/components/Loader'
import { EditorProps } from '@/types'
import EditorTopBar from './_components/EditorTopBar'
import useEditor from './_hooks/useEditor'
import SearchModal from './_components/SearchModal'
import SavedList from './_components/SavedList'
import useGetSavedReviews from './_hooks/useGetSavedReviews'
import useCreateSavedReview from './_hooks/useCreateSavedReview'

export default function Editor({ token, mode, editItem }: EditorProps) {
  const {
    isLoading,
    textareaRef,
    date,
    today,
    review,
    onChangeReview,
    onSubmit,
  } = useEditor({
    editItem,
  })
  const { book, text, rating } = review

  const { isVisible: isSearchModalVisible, toggleModal: toggleSearchModal } =
    useModal()
  const { isVisible: isSavedModalVisible, toggleModal: toggleSavedModal } =
    useModal()

  const { data: savedReviews, savedReviewCount } = useGetSavedReviews(token)
  const { onClickSaveReview } = useCreateSavedReview()

  return (
    <>
      <EditorTopBar
        mode={mode}
        onSubmit={onSubmit}
        onSaveClick={() => onClickSaveReview(review, today)}
        onNumClick={toggleSavedModal}
        savedCount={savedReviewCount}
      />
      {isLoading && <Loader />}
      {isSearchModalVisible && (
        <SearchModal onClose={toggleSearchModal} setBook={onChangeReview} />
      )}
      {isSavedModalVisible && (
        <SavedList
          reviews={savedReviews ?? []}
          onClose={toggleSavedModal}
          setReview={onChangeReview}
        />
      )}
      <div className="wrapper">
        <div className={styles.wrapper}>
          <div className={styles.content}>
            {!book ? (
              <div className={styles['btn-add']} onClick={toggleSearchModal}>
                <span>책 추가&nbsp;&nbsp;</span>
                <Plus size={32} />
              </div>
            ) : (
              <ReviewBookInfo
                book={book}
                setRating={onChangeReview}
                rating={rating}
                isEdit={mode === 'edit'}
              />
            )}
            <form>
              <span className={styles.date}>{date}</span>
              <textarea
                ref={textareaRef}
                value={text}
                onChange={(e) => onChangeReview({ text: e.target.value })}
                placeholder="내용을 입력하세요"
                className={styles.textarea}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
