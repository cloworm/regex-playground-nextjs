import React, { FunctionComponent, useCallback } from 'react'

interface Props {
  label: string
  defaultValue: string
  onChange: (event: string) => void
}

const Input: FunctionComponent<Props> = ({ label, defaultValue, onChange }) => {
  // Normally I wouldn't like to use `defaultValue` (uncontrolled Input), but it solves the
  // issue of the text cursor jumping to the end of the input after every keypress.
  // The Input can still be "controlled" from the parent component, by providing a new `key`
  // prop to force a new value. Think of `key` as the identifier for the session of the life
  // of the input.
  // For example, when the Clear button is clicked, or when a new RegEx Example is clicked,
  // resetting all the Inputs to the new `defaultValue`.
  const handleChange = useCallback(({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value)
  }, [onChange])

  return (
    <div>
      <div className="pb-0.5">
        <label className="uppercase font-semibold text-sm tracking-wide" htmlFor={label}>{label}</label>
      </div>
      <div>
        <input
          id={label}
          name={label}
          type="text"
          className="border-3 border-black rounded-md w-full focus:border-none focus:border-theme_hotPink focus:ring focus:ring-theme_hotPink focus:ring-opacity-50"
          placeholder="Placeholder"
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Input
