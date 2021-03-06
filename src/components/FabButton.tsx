import React, { FunctionComponent } from 'react'

interface Props {
  onClick: () => void
  name?: string
}

const FabButton: FunctionComponent<Props> = ({ children, name, onClick }) => {
  return (
    <button
      role='button'
      type='button'
      onClick={onClick}
      aria-label={name}
      className="w-10 h-10 p-2 rounded-full bg-gradient-to-br to-theme_slateBlue from-theme_hotPink shadow"
    >
      {children}
    </button>
  )
}

export default FabButton
