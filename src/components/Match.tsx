import { FunctionComponent, useCallback, useMemo } from 'react'
import { useQueryParam, withDefault, ArrayParam, StringParam } from 'use-query-params'

import Card from './Card'
import Textarea from './Textarea'

interface Props {
  value: string
  onChange: (e: any) => void
}

const Match: FunctionComponent<Props> = ({ value, onChange }) => {
  const [pattern, setPattern] = useQueryParam('pattern', withDefault(StringParam, ''))
  const [flags, setFlags] = useQueryParam('flags', withDefault(StringParam, ''))
  const handleChange = useCallback((event) => {
    onChange(event.target.value)
  }, [onChange])

  const match = useMemo<RegExpMatchArray | void>(() => {
    let re: RegExp
    try {
      re = new RegExp(pattern, flags)
      return value.match(re)
    } catch(err) {
      re = new RegExp('')
      return value.match(re)
    }
  }, [flags, pattern, value])

  return (
    <Card>
      <Textarea value={value} label="text" onChange={handleChange} />
      <p className="text-right text-theme_textGray text-sm uppercase font-semibold">matches found</p>

      <h3>Match result:</h3>
      {match ? match[0] : 'No matches yet' }

      <h3>Match groups:</h3>
      {match ? match.slice(1).map((group, idx) => {
        return <div key={idx}>{idx + 1}: {group}</div>
      }) : 'No matches yet'}
    </Card>
  )
}

export default Match
