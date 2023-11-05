import regainPointer from '@/helpers/regainPointer'
import { useUser } from '../../hooks/useZustand'

export default function InfoButton () {
  const handleButton = () => {
    useUser.getState().setZus('about', true)
    regainPointer()
  }
  return (
    <button className="h-12 w-12 m-4 fill-current text-gray-400 active:text-gray-800 focus:outline-none hover:text-gray-600" id="close" onClick={handleButton} type='button'>
      <svg className="h-12 w-12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" /></svg>
    </button>
  )
}
