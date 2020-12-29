import useIsMounted from '../hooks/useIsMounted'

import React, { FunctionComponent, useCallback } from 'react'
import { useQueryParam, withDefault, ArrayParam } from 'use-query-params'
import Pattern from './Pattern'
import Match from './Match'
import FabButton from './FabButton'

const RegexPlayground: FunctionComponent = () => {
  const isMounted = useIsMounted()
  const [matches, setMatches] = useQueryParam('matches[]', withDefault(ArrayParam, ['']))

  const onClick = useCallback(() => {
    setMatches((prevMatches) => {
      if (!prevMatches) return []
      return [
        ...prevMatches,
        '',
      ]
    })
  }, [setMatches])

  if (!isMounted) return <div />

  return (
    <div>
      <h1 className="text-theme_slateBlue font-semibold text-2xl pb-12">RegEx Playground</h1>

      <Pattern />

      {
        (matches as string[]).map((match: string, idx: number) => {
          return (
            <Match
              key={idx}
              value={match}
              onChange={(value) => {
                setMatches((prevMatches) => {
                  if (!prevMatches) return []
                  return [
                    ...prevMatches.slice(0, idx),
                    value,
                    ...prevMatches.slice(idx + 1),
                  ]
                })
              }} />
          )
        })
      }

      <FabButton onClick={onClick}>
        <p className="text-white font-bold">+</p>
      </FabButton>

    </div>
  )
}

export default RegexPlayground
