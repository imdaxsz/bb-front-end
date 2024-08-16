'use client'

import { WarningCircle } from '@phosphor-icons/react'

export default function OfflineFallback() {
  return (
    <div className="empty guide">
      <WarningCircle
        weight="bold"
        size={48}
        color="#d8d8d8"
        style={{ marginBottom: '8px' }}
      />
      <p>오프라인 상태예요.</p>
      <p>인터넷 연결을 확인해 주세요.</p>
    </div>
  )
}
