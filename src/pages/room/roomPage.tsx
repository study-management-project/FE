import { useParams } from 'react-router-dom'

const RoomPage = () => {
  const params = useParams();

  return (
    <div>
      room : {params.roomId}
    </div>
  )
}

export default RoomPage