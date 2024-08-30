import { render } from '@testing-library/react'
import useBeforeRouteChange from './useBeforeRouteChange'

const mockConfirm = jest.spyOn(window, 'confirm')
const mockPushState = jest.spyOn(window.history, 'pushState')
const mockGo = jest.spyOn(window.history, 'go')
const mockPreventDefault = jest.fn()

function TestComponent({ isSaved }: { isSaved: boolean }) {
  useBeforeRouteChange(isSaved)
  return <div>Test Component</div>
}

describe('useBeforeRouteChange', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('isSaved가 true일 때 페이지 이탈 전 확인 창을 표시해야 한다.', () => {
    // popstate
    render(<TestComponent isSaved />)
    window.dispatchEvent(new PopStateEvent('popstate'))
    expect(mockConfirm).toHaveBeenCalled()

    // beforeunload
    const event = new Event('beforeunload') as BeforeUnloadEvent
    event.preventDefault = mockPreventDefault
    window.dispatchEvent(event)
    expect(mockPreventDefault).toHaveBeenCalled()
  })

  it('확인 메시지에서 취소를 선택하면 뒤로 가기 동작이 수행되지 않아야 한다.', () => {
    // `confirm`이 항상 false를 반환하도록 모킹
    mockConfirm.mockImplementation(() => false)
    render(<TestComponent isSaved />)

    window.dispatchEvent(new PopStateEvent('popstate'))
    expect(mockConfirm).toHaveBeenCalled()
    expect(mockPushState).toHaveBeenCalled()
    expect(mockGo).not.toHaveBeenCalled()
  })

  it('isSaved가 false일 때 이벤트 리스너가 올바르게 설정되며, confirm 창이 표시되지 않아야 한다.', () => {
    // popstate
    render(<TestComponent isSaved={false} />)
    window.dispatchEvent(new PopStateEvent('popstate'))
    expect(mockConfirm).not.toHaveBeenCalled()
    expect(mockGo).toHaveBeenCalled()

    // beforeunload
    const event = new Event('beforeunload') as BeforeUnloadEvent
    event.preventDefault = mockPreventDefault
    window.dispatchEvent(event)
    expect(mockPreventDefault).not.toHaveBeenCalled()
  })
})
