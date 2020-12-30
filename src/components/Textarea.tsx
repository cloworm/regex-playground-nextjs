import { FunctionComponent } from 'react'
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'

interface Props {
  label: string
  value: string
  onChange: (e: any) => void
  pattern: RegExp
}

const Textarea: FunctionComponent<Props> = ({ label, value, onChange, pattern }) => {
  return (
    <div>
      <div className="pb-0.5">
        <label className="uppercase font-semibold text-sm tracking-wide">{label}</label>
      </div>
      <div className="mb-0.5 px-3 py-2 border-3 border-black rounded-md w-full focus-within:border-none focus-within:border-theme_hotPink focus-within:ring focus-within:ring-theme_hotPink focus-within:ring-opacity-50">
        <HighlightWithinTextarea
          value={value}
          highlight={{ highlight: pattern, className: 'bg-theme_lightSkyBlue' }}
          onChange={onChange}
          containerClassName="w-full"
          style={{width: '100%', border: 'none' }}
        />
      </div>
    </div>
  )
}

export default Textarea
