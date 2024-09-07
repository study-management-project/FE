import { CodeSnapshot } from '../../model/CodeSnapshot'

const SnapshotList = ({dailySnapshots, updateOwnCode} : {dailySnapshots: CodeSnapshot[], updateOwnCode:(code:string) => void}) => {
    
  return (
    <div className='w-[20vw] mt-1 pl-2'>
        {dailySnapshots.sort((a,b) => {
          const dateA:Date = new Date(a.getCreatedAt());
          const dateB:Date = new Date(b.getCreatedAt());
          return dateB.getTime()-dateA.getTime();
        }).map((snapshot:CodeSnapshot,idx:number) => {
          return <div key={idx}
          className='mt-3 rounded-sm text-white shadow-[0_0_20px_4px_rgba(12,12,12,0.3)] hover:cursor-pointer'
          onClick={()=>{updateOwnCode(snapshot.getContent())}}
          >
            <span className='h-6 leading-6 whitespace-nowrap overflow-hidden block'>|&nbsp;&nbsp;{snapshot.getTitle()} </span>
          </div>
        })}
    </div>
  )
}

export default SnapshotList