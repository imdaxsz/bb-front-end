import { backUpReviews } from '../actions'

export default function useBackUpData() {
  const onClickBackUp = async () => {
    const ok = window.confirm('후기 데이터를 요청하시겠습니까?')
    if (!ok) return

    const reviews = await backUpReviews().then((res) => res.body)
    if (reviews.length === 0) {
      window.alert('작성한 후기가 없습니다!')
      return
    }

    const backUpData = JSON.stringify(reviews, null, 2)
    const blob = new Blob([backUpData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'backup.txt'
    link.click()

    URL.revokeObjectURL(url)
  }

  return { onClickBackUp }
}
