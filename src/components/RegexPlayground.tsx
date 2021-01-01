import React, { FunctionComponent, useCallback } from 'react'

import useIsMounted from '../hooks/useIsMounted'
import Pattern from './Pattern'
import Match from './Match'
import FabButton from './FabButton'
import useQueryParams from '../hooks/useQueryParams'

const RegexPlayground: FunctionComponent = () => {
  const isMounted = useIsMounted()
  const [{ matches }, setQuery] = useQueryParams()
  const matchesNotEmpty: string[] = matches.length === 0 ? [''] : matches as string[]

  const handleClick = useCallback(() => {
    setQuery((prevQuery) => {
      if (!prevQuery?.matches) return { matches: [] }
      return {
        matches: [
          ...prevQuery.matches,
          '',
        ]
      }
    })
  }, [setQuery])

  if (!isMounted) return <div />

  return (
    <div>
      <div className="mb-4 shadow">
        <Pattern />
      </div>

      {
        matchesNotEmpty.map((match: string, idx: number) => {
          return (
            <Match
              key={idx}
              value={match}
              onChange={(value) => {
                setQuery((prevQuery) => {
                  if (!prevQuery?.matches) return { matches: [] }
                  return {
                    matches: [
                      ...prevQuery.matches.slice(0, idx),
                      value,
                      ...prevQuery.matches.slice(idx + 1),
                    ]
                  }
                })
              }} />
          )
        })
      }

      <div className="text-center text-white">
        <FabButton onClick={handleClick} name='add-match'>
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </FabButton>
      </div>

    </div>
  )
}

export default RegexPlayground
