import { renderHook, act, waitFor } from '@testing-library/react'
import member from '@/(member)/services'
import { Review } from '@/types'
import useBackUpData from './useBackUpData'

jest.mock('@/(auth)/_hooks/useHandleUnauthorized', () => ({
  __esModule: true,
  default: () => ({
    handleUnauthorized: jest.fn(),
  }),
}))

const mockReviews: Review[] = [
  {
    _id: '1',
    book: {
      isbn: '123',
      title: 'title',
      author: 'author',
      publisher: 'publisher',
      cover: 'cover',
    },
    user_id: 'something',
    rating: 5,
    text: 'test',
    date: new Date(),
  },
]

describe('useBackUpData', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url')
    global.URL.revokeObjectURL = jest.fn()
  })

  const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})
  const mockConfirm = jest
    .spyOn(window, 'confirm')
    .mockImplementation(() => true)

  const mockStringify = jest.spyOn(JSON, 'stringify')

  afterEach(() => {
    mockConfirm.mockRestore()
    mockAlert.mockRestore()
    jest.clearAllMocks()
  })

  it('리뷰가 0개일 때 alert가 표시되고 파일 다운로드 창이 뜨지 않아야 한다.', async () => {
    jest.spyOn(member, 'backUpReviews').mockResolvedValueOnce([])

    const { result } = renderHook(() => useBackUpData())
    await act(async () => {
      await result.current.onClickBackUp()
    })

    expect(mockAlert).toHaveBeenCalled()
    expect(mockStringify).not.toHaveBeenCalled()

    mockAlert.mockRestore()
    mockStringify.mockRestore()
  })

  it('리뷰가 0개가 아닐 때 파일 다운로드 창이 나타나야 한다.', async () => {
    jest.spyOn(member, 'backUpReviews').mockResolvedValueOnce(mockReviews)

    const { result } = renderHook(() => useBackUpData())
    await act(async () => {
      await result.current.onClickBackUp()
    })

    waitFor(() => {
      expect(mockAlert).not.toHaveBeenCalled()
      expect(mockStringify).toHaveBeenCalled()
      expect(URL.createObjectURL).toHaveBeenCalled()
      expect(URL.revokeObjectURL).toHaveBeenCalled()
    })
  })
})
