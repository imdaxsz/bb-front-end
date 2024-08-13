import Skeleton from '@/components/Skeleton'
import { v4 as uuidv4 } from 'uuid'

export default function ListSkeleton() {
  return (
    <div className="list-wrapper">
      <div className="list">
        {Array.from({ length: 10 }).map(() => (
          <div key={uuidv4()}>
            <Skeleton w={150} h={210} />
            <Skeleton w={150} h={20} radius={4} style={{ marginTop: '6px' }} />
            <Skeleton w={150} h={24} radius={4} style={{ marginTop: '3px' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
