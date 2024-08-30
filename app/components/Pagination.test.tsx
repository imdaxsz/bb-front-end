/* eslint-disable no-plusplus */
import { render, screen } from '@testing-library/react'
import Pagination from './Pagination'

const mockUsePathname = jest.fn().mockReturnValue('/test')
const mockUseSearchParams = jest.fn().mockReturnValue({
  toString: () => 'page=1',
  get: (key: string) => {
    const params = new URLSearchParams('page=1')
    return params.get(key)
  },
})

jest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname()
  },
  useSearchParams() {
    return mockUseSearchParams()
  },
}))

describe('Pagination', () => {
  it('컴포넌트가 올바르게 렌더링 되어야 한다.', () => {
    render(
      <Pagination
        totalItems={50}
        itemCountPerPage={10}
        pageCount={5}
        currentPage={1}
      />,
    )

    expect(screen.getByText('이전')).toBeInTheDocument()

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument()
    }

    expect(screen.getByText('다음')).toBeInTheDocument()
  })

  it('"이전" 링크가 첫 페이지에서 숨겨져야 한다.', () => {
    render(
      <Pagination
        totalItems={50}
        itemCountPerPage={10}
        pageCount={5}
        currentPage={1}
      />,
    )

    const prevLink = screen.getByText('이전').closest('li')
    expect(prevLink).toHaveClass('invisible')
  })

  it('"다음" 링크가 마지막 페이지에서 숨겨져야 한다.', () => {
    render(
      <Pagination
        totalItems={50}
        itemCountPerPage={10}
        pageCount={5}
        currentPage={5}
      />,
    )

    const nextLink = screen.getByText('다음').closest('li')
    expect(nextLink).toHaveClass('invisible')
  })

  it('query string이 없는 경우 link는 "?page=페이지번호"가 현재 pathname 뒤에 붙은 URL을 가져야 한다.', () => {
    render(
      <Pagination
        totalItems={50}
        itemCountPerPage={10}
        pageCount={5}
        currentPage={1}
      />,
    )

    const page2Link = screen.getByText('2')
    const href = (page2Link as HTMLAnchorElement).getAttribute('href')
    expect(href).toBe('/test?page=2')
  })

  it('query string이 있는 경우 link는 "&page=페이지번호"가 현재 pathname 뒤에 붙은 URL을 가져야 한다.', () => {
    mockUseSearchParams.mockClear()
    mockUseSearchParams.mockReturnValue({
      toString: () => 'sort=date_asc&page=1', // 기본 쿼리 파라미터 설정
      get: (key: string) => {
        const params = new URLSearchParams('sort=date_asc&page=1')
        return params.get(key)
      },
    })

    render(
      <Pagination
        totalItems={50}
        itemCountPerPage={10}
        pageCount={5}
        currentPage={1}
      />,
    )

    const page2Link = screen.getByText('2')
    const href = (page2Link as HTMLAnchorElement).getAttribute('href')
    expect(href).toBe('/test?sort=date_asc&page=2')
  })

  it('이전 link는 현재 보이는 페이지 숫자 목록에서 첫번째 숫자-1로 이동하는 URL을 가져야 한다.', () => {
    mockUseSearchParams.mockClear()
    mockUseSearchParams.mockReturnValue({
      toString: () => 'page=8', // 기본 쿼리 파라미터 설정
      get: (key: string) => {
        const params = new URLSearchParams('page=8')
        return params.get(key)
      },
    })

    render(
      <Pagination
        totalItems={50}
        itemCountPerPage={10}
        pageCount={5}
        currentPage={8}
      />,
    )

    const prevLink = screen.getByText('이전')
    const href = (prevLink as HTMLAnchorElement).getAttribute('href')
    expect(href).toBe('/test?page=5')
  })

  it('다음 link는 현재 보이는 페이지 숫자 목록에서 마지막 숫자+1로 이동하는 URL을 가져야 한다.', () => {
    mockUseSearchParams.mockClear()
    mockUseSearchParams.mockReturnValue({
      toString: () => 'page=8', // 기본 쿼리 파라미터 설정
      get: (key: string) => {
        const params = new URLSearchParams('page=8')
        return params.get(key)
      },
    })

    render(
      <Pagination
        totalItems={50}
        itemCountPerPage={10}
        pageCount={5}
        currentPage={8}
      />,
    )

    const prevLink = screen.getByText('다음')
    const href = (prevLink as HTMLAnchorElement).getAttribute('href')
    expect(href).toBe('/test?page=11')
  })
})
