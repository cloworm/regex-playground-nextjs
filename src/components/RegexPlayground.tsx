import useIsMounted from '../hooks/useIsMounted'

import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { useQueryParam, withDefault, ArrayParam, StringParam } from 'use-query-params'
import Pattern from './Pattern'
import Match from './Match'
import FabButton from './FabButton'

// interface MatchBoxProps {
//   onChange: (value: string) => void
//   pattern: RegExp,
//   value: string,
// }

// const MatchBox: FunctionComponent<MatchBoxProps> = ({
//   onChange,
//   pattern,
//   value,
// }) => {
//   const handleChange = useCallback((event) => {
//     onChange(event.target.value)
//   }, [onChange])

//   const match = useMemo<RegExpMatchArray | void>(() => {
//     return value.match(pattern)
//   }, [value, pattern])

//   return <div style={{ border: '1px solid #E0E0E0', padding: '20px' }}>
//     <input value={value} onChange={handleChange} />
//     <h3>Match result:</h3>
//     {match ? match[0] : 'No matches yet' }

//     <h3>Match groups:</h3>
//     {match ? match.slice(1).map((group, idx) => {
//       return <div key={idx}>{idx + 1}: {group}</div>
//     }) : 'No matches yet'}
//   </div>
// }

const RegexPlayground: FunctionComponent = () => {
  const isMounted = useIsMounted()
  const [matches, setMatches] = useQueryParam('matches[]', withDefault(ArrayParam, ['']))

  const onClick = useCallback(() => {
    setMatches((prevMatches) => {
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
        matches.map((match, idx) => {
          return (
            <Match
              key={idx}
              value={match}
              onChange={(value) => {
                setMatches((prevMatches) => {
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
