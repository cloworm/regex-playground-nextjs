import { FunctionComponent } from 'react'

interface Props {
  onClick: () => void
}

const FabButton: FunctionComponent<Props> = ({ children, onClick }) => {
  return (
    <button className="px-5 py-3 rounded-full bg-gradient-to-br from-theme_slateBlue to-theme_hotPink shadow" onClick={onClick}>
      {children}
    </button>
  )
}

export default FabButton
