import { renderHook, act, waitFor } from '@testing-library/react'
import { formatDate } from '@/utils/formatDate'
import { ReviewForm, Book } from '@/types'
import useEditor from './useEditor'
import useReview from './useReview'

jest.mock('@/utils/formatDate', () => ({
  formatDate: jest.fn().mockReturnValue('2024-08-30'),
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}))

jest.mock('@/(book)/services', () => ({
  getRecommendBook: jest.fn().mockResolvedValue({}),
}))

jest.mock('@/(book)/_utils/formatBookInfo', () => ({
  formatBooksInfo: jest.fn().mockReturnValue([
    {
      isbn: '9846489',
      title: '책 이름',
      author: '저자',
      publisher: 'OO 출판사',
      cover: 'img url',
    },
  ]),
}))

jest.mock('@/hooks/useBeforeRouteChange', () => jest.fn())

jest.mock('./useTextarea', () => ({
  __esModule: true,
  default: () => ({
    textareaRef: null,
    setTextareaHeight: jest.fn(),
  }),
}))

jest.mock('./useReview', () => ({
  __esModule: true,
  default: () => ({
    create: jest.fn().mockResolvedValue('createdId'),
    update: jest.fn(),
  }),
}))

jest.mock('./useRecommend', () => ({
  __esModule: true,
  default: () => ({
    categoryId: 'categoryId',
    setRecommendBook: jest.fn(),
    toggleRecommendModal: jest.fn(),
  }),
}))

const mockBook: Book = {
  isbn: '9846489',
  title: '책 이름',
  author: '저자',
  publisher: 'OO 출판사',
  cover: 'img url',
}

const testDate = new Date()
const editItem = {
  _id: '123456',
  user_id: 'user',
  book: mockBook,
  text: '기존 리뷰 내용',
  rating: 4,
  date: testDate,
}

describe('useEditor', () => {
  const InitialReview: ReviewForm = {
    book: null,
    text: '',
    rating: 3,
  }

  it('초기값이 올바르게 세팅되어 있어야 한다.', () => {
    const { result } = renderHook(() => useEditor({ editItem: undefined }))

    expect(result.current.review).toEqual(InitialReview)
  })

  it('후기 수정 시 후기 불러오기가 수행되는지 확인한다', () => {
    const { result } = renderHook(() => useEditor({ editItem }))
    const formattedDate = formatDate(testDate)

    expect(result.current.review.text).toBe('기존 리뷰 내용')
    expect(result.current.review.rating).toBe(4)
    expect(result.current.review.book).toEqual(editItem.book)
    expect(result.current.date).toBe(formattedDate)
  })

  it('onChangeReview가 잘 동작하는지 확인한다', () => {
    const { result } = renderHook(() => useEditor({ editItem: undefined }))

    act(() => {
      const { onChangeReview } = result.current
      onChangeReview({ text: '새로운 리뷰 내용' })
    })

    expect(result.current.review.text).toBe('새로운 리뷰 내용')
  })

  it('onSubmit에서 예외 처리(book, text 관련)가 동작하는지 확인한다', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

    const { result } = renderHook(() => useEditor({ editItem: undefined }))

    await act(async () => {
      await result.current.onSubmit()
    })

    expect(alertSpy).toHaveBeenCalledWith('리뷰를 작성할 책을 선택해주세요!')

    act(() => {
      result.current.onChangeReview({ book: mockBook })
    })

    await act(async () => {
      await result.current.onSubmit()
    })

    expect(alertSpy).toHaveBeenCalledWith('리뷰 내용을 입력해주세요!')

    alertSpy.mockRestore()
  })

  it('게시글 수정일 경우 수정 api가, 새 글 발행일 경우 발행 api가 실행되어야 한다.', async () => {
    const { result } = renderHook(() => useEditor({ editItem: undefined }))

    act(() => {
      result.current.onChangeReview({
        book: mockBook,
        text: '새 리뷰',
        rating: 5,
      })
    })

    await act(async () => {
      await result.current.onSubmit()
    })

    waitFor(() => {
      expect(useReview().update).not.toHaveBeenCalled()
      expect(useReview().create).toHaveBeenCalled()
    })

    const { result: result2 } = renderHook(() => useEditor({ editItem }))

    act(() => {
      result2.current.onChangeReview({
        text: '수정된 리뷰 내용',
        rating: 3,
      })
    })

    await act(async () => {
      await result2.current.onSubmit()
    })

    waitFor(() => {
      expect(useReview().update).toHaveBeenCalled()
      expect(useReview().create).not.toHaveBeenCalled()
    })
  })
})
