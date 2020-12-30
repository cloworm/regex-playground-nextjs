import React, { FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode,
  color?: string
}

const Card: FunctionComponent<Props> = ({ children, color }) => {
  return (
    <div className={`bg-white border-t-4 ${color === 'pink' ? 'border-theme_hotPink' : 'border-theme_slateBlue'} px-5 py-2`}>
      {children}
    </div>
  )
}

export default Card
