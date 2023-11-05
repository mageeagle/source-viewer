import { useUser } from '../../hooks/useZustand'

const sectionClass = 'font-semibold cursor-pointer m-4 text-gray-400 active:text-gray-800 focus:outline-none hover:text-gray-600'

export default function SectionSelector ({ name, i }: {name: string, i: number}) {
  return (
  <div className={sectionClass + ((useUser.getState().infoSection === i) ? (' underline underline-offset-4') : '')} onClick={() => useUser.getState().setZus('infoSection', i)}>
    {name}
  </div>
  )
}
