import { render, screen, fireEvent } from '@testing-library/react'
import ScrollToTopButton from './ScrollToTopButton'

const mockScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', { value, writable: true })
}

const mockScrollBy = jest.fn()
window.scrollBy = mockScrollBy

describe('ScrollToTopButton', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockScrollY(0)
    mockScrollBy.mockClear()
  })

  it('초기 상태에서 버튼이 화면에 나타나지 않아야 한다.', () => {
    render(<ScrollToTopButton />)
    const button = screen.queryByRole('button', { name: '최상단 이동' })
    expect(button).not.toBeInTheDocument()
  })

  it('스크롤 위치가 충분히 내려가면 버튼이 나타나야 한다.', () => {
    render(<ScrollToTopButton />)

    mockScrollY(1000)
    fireEvent.scroll(window)

    expect(
      screen.getByRole('button', { name: '최상단 이동' }),
    ).toBeInTheDocument()
  })

  it('버튼 클릭 시 스크롤이 위로 이동해야 한다.', () => {
    render(<ScrollToTopButton />)

    mockScrollY(1000)
    fireEvent.scroll(window)

    const button = screen.getByRole('button', { name: '최상단 이동' })

    fireEvent.click(button)

    jest.advanceTimersByTime(15)
    expect(mockScrollBy).toHaveBeenCalled()
  })

  it('스크롤이 최상단에 도달하면 스크롤 이동이 중단되어야 한다.', () => {
    mockScrollBy.mockImplementation((y) => {
      window.scrollY += y
    })

    render(<ScrollToTopButton />)

    mockScrollY(1000)
    fireEvent.scroll(window)

    const button = screen.getByRole('button', { name: '최상단 이동' })

    fireEvent.click(button)

    mockScrollY(0)

    expect(mockScrollBy).not.toHaveBeenCalled()
    expect(window.scrollY).toBe(0)
  })
})
