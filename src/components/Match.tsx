import React, { FunctionComponent, useCallback, useMemo } from 'react'

import useQueryParams from '../hooks/useQueryParams'
import Card from './Card'
import Textarea from './Textarea'

interface Props {
  id: string,
  value: string
  onChange: (value: string) => void
  onClickRemove: () => void
}

const Match: FunctionComponent<Props> = ({
  id,
  value,
  onChange,
  onClickRemove,
}) => {
  const [{ pattern, flags }] = useQueryParams()
  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }, [onChange])

  const handleClickRemove = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    onClickRemove()
  }, [onClickRemove])

  const regEx = useMemo<RegExp|null>(() => {
    if (!pattern) return null

    let re: RegExp
    try {
      re = new RegExp(pattern, flags)
    } catch(err) {
      re = new RegExp('')
    }
    return re
  }, [flags, pattern])

  const match = useMemo<RegExpMatchArray|null>(() => {
    if (!regEx) return null

    return value.match(regEx)
  }, [value, regEx])

  return (
    <div className="mb-6 shadow">
      <Card color="pink">

        <Textarea id={id} label="text" value={value} onChange={handleChange} onClickRemove={handleClickRemove} pattern={regEx} />

        <p data-testid={`${id}-paragraph`} className="text-right text-theme_textGray text-sm uppercase font-semibold">{match && match?.length > 0 ? 'Match Found!' : 'No Matches Found'}</p>

      </Card>
      {
        value?.length > 0 && pattern?.length > 0 && <div className="bg-theme_pinkLace bg-opacity-30 p-2">
          <div className="inline-block h-6 w-6 rounded-full bg-theme_persianPink text-center">
            <span data-testid={`${id}-count`} className="text-sm">{match?.length ? match.length : 0}</span>
          </div>
          <span className="font-bold text-sm pl-2">MATCH GROUP{match?.length === 1 ? '' : 'S'}</span>
          <ul className="list-inside list-decimal px-4">
            {
              match?.map((group, idx) => {
                return <li data-testid={`${id}-matchgroup-${idx}`} key={idx}>{group}</li>
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Match
