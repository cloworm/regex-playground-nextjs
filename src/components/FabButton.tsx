import { FunctionComponent } from 'react'

const FabButton: FunctionComponent = ({ children }) => {
  return (
    <button className="px-5 py-3 rounded-full bg-gradient-to-br from-theme_slateBlue to-theme_hotPink shadow">
      {children}
    </button>
  )
}

export default FabButton
