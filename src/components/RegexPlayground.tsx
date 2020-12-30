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
      <div className="mb-4 shadow">
        <Pattern />
      </div>

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

      <div className="text-center text-white">
        <FabButton onClick={onClick}>
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </FabButton>
      </div>

    </div>
  )
}

export default RegexPlayground
