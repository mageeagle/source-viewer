'use client'
import { titleClass } from '../../constants/styles'

export default function Description () {
  return (
    <div className="max-w-screen ml-4">
      <div className={titleClass}> Source Viewer </div>
      <br />
        <div className='inline w-screen'>
          <p>View Sound Sources represented by OSC Messages</p>
          <p>
            Documentation / Feature request / Bug Report <a className='underline' href='https://github.com/mageeagle/source-viewer'>Github Repo</a>
          </p>
          <p className='md:hidden'> Use a computer with a keyboard for more options.</p>
          <p>
            By Eagle Wu 2023 <a className='underline' href='https://qqaqq.net'>Website</a>
          </p>
        </div>
    </div>

  )
}
