import { FunctionComponent } from 'react'

interface Props {
  label: string
}

const Input: FunctionComponent<Props> = ({ label }) => {
  return (
    <div>
      <div className="pb-0.5">
        <label className="uppercase font-semibold text-sm" htmlFor={label}>{label}</label>
      </div>
      <div>
        <input
          id={label}
          type="text"
          className="border-3 border-black rounded-md w-full focus:border-none focus:border-theme_hotPink focus:ring focus:ring-theme_hotPink focus:ring-opacity-50"
          placeholder="Placeholder"
        />
      </div>
    </div>
  )
}

export default Input
