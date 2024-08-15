import { formatDate } from '@/utils/formatDate'

describe('formatdate', () => {
  it('opt가 "-"이면 "-" 구분자로 날짜를 포맷해야 한다.', () => {
    const date = new Date(2023, 7, 13) // 2023년 8월 13일
    const formattedDate = formatDate(date, '-')
    expect(formattedDate).toBe('2023-8-13')
  })

  it('opt가 없으면 "년/월/일"과 요일이 포함된 날짜를 포맷해야 한다.', () => {
    const date = new Date(2023, 7, 13) // 2023년 8월 13일 (일요일)
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('2023년 8월 13일 일요일')
  })
})
