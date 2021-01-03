import React, { FunctionComponent } from 'react'
import { HighlightWithinTextarea } from 'react-highlight-within-textarea'

interface Props {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onClickRemove: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  pattern: RegExp|null
}

const Textarea: FunctionComponent<Props> = ({
  id,
  label,
  value,
  onChange,
  onClickRemove,
  pattern,
}) => {
  return (
    <div>
      <div className="pb-0.5 flex justify-between">
        <label
          htmlFor={id}
          className="uppercase font-semibold text-sm tracking-wide"
        >{label}</label>
        <a data-testid={`${id}-remove`} onClick={onClickRemove} href="#remove" className="text-theme_textGray">✕</a>
      </div>
      <div className="mb-0.5 px-3 py-2 border-3 border-black rounded-md w-full focus-within:border-none focus-within:border-theme_hotPink focus-within:ring focus-within:ring-theme_hotPink focus-within:ring-opacity-50">
        <HighlightWithinTextarea
          data-testid={id}
          id={id}
          name={id}
          value={value}
          highlight={{ highlight: pattern, className: 'bg-theme_lightSkyBlue' }}
          onChange={onChange}
          containerClassName={`w-full ${id}-highlight-text-area-container`}
          style={{ width: '100%', border: 'none' }}
        />
      </div>
    </div>
  )
}

export default Textarea
