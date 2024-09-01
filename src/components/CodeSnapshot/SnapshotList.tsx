import { CodeSnapshot } from '../../model/CodeSnapshot'

const SnapshotList = ({dailySnapshots, updateOwnCode} : {dailySnapshots: CodeSnapshot[], updateOwnCode:(code:string) => void}) => {
    
  return (
    <div className='mt-1 pl-2'>
        {dailySnapshots.map((snapshot:CodeSnapshot) => {
          return <div className='mt-3 rounded-sm text-white shadow-[0_0_20px_4px_rgba(12,12,12,0.3)] hover:cursor-pointer'
          onClick={()=>{updateOwnCode(snapshot.getContent())}}
          >
            <span className='leading-6'>|</span>&nbsp;&nbsp;{snapshot.getTitle()}
          </div>
        })}
    </div>
  )
}

export default SnapshotList