import useBoundStore from '@/stores'

export default function useRecommend() {
  const { categoryId, setRecommendBook, toggleRecommendModal } = useBoundStore(
    (state) => ({
      categoryId: state.categoryId,
      setRecommendBook: state.setRecommendBook,
      toggleRecommendModal: state.toggleModal,
    }),
  )

  return { categoryId, setRecommendBook, toggleRecommendModal }
}
