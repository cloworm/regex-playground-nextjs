import { FunctionComponent, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Card: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="bg-white border-t-4 border-theme_slateBlue px-5 pt-2 pb-6 shadow mb-4">
      {children}
    </div>
  )
}

export default Card
