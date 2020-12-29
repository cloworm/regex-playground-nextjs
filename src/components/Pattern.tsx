import { FunctionComponent, useCallback } from 'react'
import { useQueryParam, withDefault, ArrayParam, StringParam } from 'use-query-params'
import { useRecoilState } from 'recoil'

import Card from './Card'
import Input from './Input'
import regexState from '../recoil/atoms/regex.atom'

const Pattern: FunctionComponent = () => {
  const [{ pattern, flags }, setRegex] = useRecoilState(regexState)

  const handlePatternChange = useCallback((event) => {
    setRegex({
      flags,
      pattern: event.target.value
    })
  }, [setRegex, flags])
  const handleFlagsChange = useCallback((event) => {
    setRegex({
      pattern,
      flags: event.target.value
    })
  }, [setRegex, pattern])
  // const handleClickClear = useCallback(() => {
  //   setFlags('')
  //   setPattern('')
  // }, [setFlags, setPattern])

  let re: RegExp
  let errorMessage: string|void
  try {
    re = new RegExp(pattern, flags)
  } catch(err) {
    re = new RegExp('')
    errorMessage = err.message
  }

  return (
    <Card>
      <div className="flex flex-col lg:flex-row space-x-2">
        <div className="w-9/12">
          <Input label="pattern" value={pattern} onChange={handlePatternChange} />
        </div>
        <div className="">
          <Input label="flags" value={flags} onChange={handleFlagsChange} />
        </div>
      </div>
      <div>
        {errorMessage ? errorMessage : null}
      </div>
    </Card>
  )
}

export default Pattern
