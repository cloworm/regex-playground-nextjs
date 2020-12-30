import React, { FunctionComponent } from 'react'

interface Props {
  onClick: () => void
}

const FabButton: FunctionComponent<Props> = ({ children, onClick }) => {
  return (
    <button className="w-10 h-10 p-2 rounded-full bg-gradient-to-br to-theme_slateBlue from-theme_hotPink shadow" onClick={onClick}>
      {children}
    </button>
  )
}

export default FabButton
