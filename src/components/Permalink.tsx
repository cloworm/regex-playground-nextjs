import { FunctionComponent, useEffect, useState, useCallback } from 'react'
import { useClipboard } from 'use-clipboard-copy'

import useWindowLocation from '../hooks/useWindowLocation'

const Permalink: FunctionComponent = () => {
  const location = useWindowLocation()
  const [copied, setCopied] = useState(false)
  const clipboard = useClipboard()

  const handleClick = useCallback(() => {
    if (!location) return
    clipboard.copy(location.href)
    setCopied(true)
  }, [clipboard, location])

  useEffect(() => {
    if (!copied) return

    const timeout = setTimeout(() => {
      setCopied(false)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [copied])

  if (!location) return <div />

  return (
    <div className="text-sm border-3 border-theme_slateBlue rounded px-3 py-1 flex items-center">
      <span className="pr-2 text-theme_slateBlue font-bold text-sm">
        PERMALINK
      </span>
      <input value={location.href} name="permalink" className="w-full bg-theme_gray" readOnly />
      <button className="border-3 border-theme_slateBlue text-theme_slateBlue font-bold text-sm ml-1 px-2 py-1 hover:text-theme_hotPink hover:border-theme_hotPink rounded" onClick={handleClick}>{ copied ? 'COPIED' : 'COPY' }</button>
    </div>
  )
}

export default Permalink
