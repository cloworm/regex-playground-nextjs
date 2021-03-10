import React, { FunctionComponent, useCallback } from 'react'

import useQueryParams from '../hooks/useQueryParams'
import generateKey from '../utils/generateKey'
import Card from './Card'
import Input from './Input'

const Pattern: FunctionComponent = () => {
  const [{ pattern, flags, key }, setQuery] = useQueryParams()

  const handlePatternChange = useCallback((value) => {
    setQuery({
      pattern: value
    })
  }, [setQuery])
  const handleFlagsChange = useCallback((value) => {
    setQuery({
      flags: value
    })
  }, [setQuery])
  const handleClickClear = useCallback(() => {
    setQuery({
      pattern: '',
      flags: '',
      key: generateKey(),
    })
  }, [setQuery])

  let errorMessage: string|void
  try {
    new RegExp(pattern, flags)
  } catch(err) {
    errorMessage = err.message
  }

  return (
    <Card>
      <div className="flex flex-col lg:flex-row space-x-2">
        <div className="w-9/12">
          <Input key={key} label="pattern" defaultValue={pattern} onChange={handlePatternChange} />
        </div>
        <div>
          <Input key={key} label="flags" defaultValue={flags} onChange={handleFlagsChange} />
        </div>
      </div>
      <div>
        {errorMessage ? errorMessage : null}
      </div>
      <a onClick={handleClickClear} className="inline-block text-sm uppercase text-theme_slateBlue font-bold hover:text-theme_hotPink cursor-pointer mt-1 px-2 py-1 border-3 border-theme_slateBlue rounded hover:border-theme_hotPink">
        CLEAR
      </a>
    </Card>
  )
}

export default Pattern
