import useHandleUnauthorized from '@/(auth)/_hooks/useHandleUnauthorized'
import member from '@/(member)/services'

export default function useBackUpData() {
  const { handleUnauthorized } = useHandleUnauthorized()

  const onClickBackUp = async () => {
    const ok = window.confirm('리뷰 데이터를 요청하시겠습니까?')
    if (!ok) return

    try {
      const reviews = await member.backUpReviews()
      if (reviews.length === 0) {
        window.alert('작성한 리뷰가 없습니다!')
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
    } catch (error) {
      handleUnauthorized(error, 'alert')
    }
  }

  return { onClickBackUp }
}
