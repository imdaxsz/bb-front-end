'use client'

import ReviewBookInfo from '@/components/ReviewBookInfo'
import styles from '@/styles/write.module.scss'
import { Plus } from '@phosphor-icons/react'

import useModal from '@/hooks/useModal'
import { WriteMode } from '@/types'
import Loader from '@/components/Loader'
import EditorTopBar from './_components/EditorTopBar'
import useEditor from './_hooks/useEditor'
import SearchModal from './_components/SearchModal'
import SavedList from './_components/SavedList'

interface EditorProps {
  mode: WriteMode
  id?: string
}

export default function Write({ mode, id }: EditorProps) {
  const {
    isLoading,
    textareaRef,
    savedCount,
    date,
    review,
    onChangeReview,
    onSubmit,
  } = useEditor({
    id,
    mode,
  })
  const { book, text, rating } = review

  const { isVisible: isSearchModalVisible, toggleModal: toggleSearchModal } =
    useModal()
  const { isVisible: isSavedModalVisible, toggleModal: toggleSavedModal } =
    useModal()

  return (
    <>
      <EditorTopBar
        mode={mode}
        onClick={onSubmit}
        onNumClick={toggleSavedModal}
        savedCount={savedCount}
      />
      {isLoading && <Loader />}
      {isSearchModalVisible && (
        <SearchModal onClose={toggleSearchModal} setBook={onChangeReview} />
      )}
      {isSavedModalVisible && (
        <SavedList onClose={toggleSavedModal} setReview={onChangeReview} />
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
              <div className={styles.date}>{date}</div>
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
