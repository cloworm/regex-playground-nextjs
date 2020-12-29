import { FunctionComponent, useCallback } from 'react'
import { useQueryParam, withDefault, ArrayParam, StringParam, useQueryParams } from 'use-query-params'

import Card from './Card'
import Input from './Input'

const Pattern: FunctionComponent = () => {
  const [{ pattern, flags }, setQuery] = useQueryParams({
    pattern: withDefault(StringParam, ''),
    flags: withDefault(StringParam, ''),
  })

  const handlePatternChange = useCallback((event) => {
    setQuery({
      pattern: event.target.value
    })
  }, [setQuery])
  const handleFlagsChange = useCallback((event) => {
    setQuery({
      flags: event.target.value
    })
  }, [setQuery])
  const handleClickClear = useCallback(() => {
    setQuery({
      pattern: '',
      flags: ''
    })
  }, [setQuery])

  let errorMessage: string|void
  try {
    new RegExp(pattern, flags)
  } catch(err) {
    new RegExp('')
    errorMessage = err.message
  }

  return (
    <Card>
      <div className="flex flex-col lg:flex-row space-x-2">
        <div className="w-9/12">
          <Input label="pattern" value={pattern} onChange={handlePatternChange} />
        </div>
        <div>
          <Input label="flags" value={flags} onChange={handleFlagsChange} />
        </div>
      </div>
      <div>
        {errorMessage ? errorMessage : null}
      </div>
      <a onClick={handleClickClear} className="text-sm uppercase text-theme_textGray font-bold hover:text-theme_hotPink cursor-pointer">
        CLEAR
      </a>
    </Card>
  )
}

export default Pattern
