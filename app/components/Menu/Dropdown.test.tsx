/* eslint-disable react/jsx-props-no-spreading */
import { render, screen, fireEvent } from '@testing-library/react'
import Dropdown, { DropdownProps } from '@/components/Menu/Dropdown'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

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

describe('Dropdown', () => {
  const props: DropdownProps = {
    selectedValue: 'Option 1',
    items: ['Option 1', 'Option 2', 'Option 3'],
    keys: ['sort=asc', 'sort=desc', 'sort=random'],
  }

  beforeEach(() => {
    mockUsePathname.mockClear()
    mockUseSearchParams.mockClear()
  })

  it('클릭 시 드롭다운 메뉴가 토글되어야 한다.', () => {
    const { container } = render(<Dropdown {...props} />)

    const ulElement = container.querySelector('ul')
    const itemLinks = screen.getAllByText(/Option 1/i)
    const visibleLink = itemLinks.filter(
      (link) => link.getAttribute('href') === '#',
    )

    expect(ulElement?.className).not.toContain('block')
    expect(visibleLink[0]).toBeInTheDocument()

    fireEvent.click(visibleLink[0])
    expect(ulElement?.className).toContain('block')
    expect(screen.getByText(/Option 2/i)).toBeVisible()
  })

  it('드롭다운의 각 항목은 올바른 URL을 href로 가지고 있어야 한다.', () => {
    render(<Dropdown {...props} />)

    const links = screen
      .getAllByRole('button')
      .filter((link) => link.getAttribute('href') !== '#')

    const itemHref = (links[1] as HTMLAnchorElement).getAttribute('href')

    expect(itemHref).toBe('/test?page=1&sort=desc')
  })

  it('드롭다운 항목을 클릭하면 선택된 값이 업데이트 되어야 한다.', () => {
    const { unmount } = render(<Dropdown {...props} />)

    const links = screen.getAllByText(/Option 1/i)
    const visibleLink = links.filter(
      (link) => link.getAttribute('href') === '#',
    )

    fireEvent.click(visibleLink[0])
    fireEvent.click(screen.getByText(/Option 2/i))

    mockUseSearchParams.mockReturnValue({
      toString: () => 'page=1&sort=desc',
      get: (key: string) => {
        const params = new URLSearchParams('page=1&sort=desc')
        return params.get(key)
      },
    })

    const nextSelected =
      props.items[
        props.keys.indexOf(`sort=${mockUseSearchParams().get('sort')}`)
      ]

    unmount()
    render(<Dropdown {...{ ...props, selectedValue: nextSelected! }} />)

    const selectedLink = screen
      .getAllByRole('button')
      .filter((link) => link.getAttribute('href') === '#')[0]

    expect(selectedLink.textContent).toBe('Option 2')
  })
})
