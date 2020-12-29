import useIsMounted from '../hooks/useIsMounted'

import React, { FunctionComponent, useCallback, useMemo } from 'react'
import { useQueryParam, withDefault, ArrayParam, StringParam } from 'use-query-params'
import Pattern from './Pattern'
import Match from './Match'
import FabButton from './FabButton'

interface MatchBoxProps {
  onChange: (value: string) => void
  pattern: RegExp,
  value: string,
}

const MatchBox: FunctionComponent<MatchBoxProps> = ({
  onChange,
  pattern,
  value,
}) => {
  const handleChange = useCallback((event) => {
    onChange(event.target.value)
  }, [onChange])

  const match = useMemo<RegExpMatchArray | void>(() => {
    return value.match(pattern)
  }, [value, pattern])

  return <div style={{ border: '1px solid #E0E0E0', padding: '20px' }}>
    <input value={value} onChange={handleChange} />
    <h3>Match result:</h3>
    {match ? match[0] : 'No matches yet' }

    <h3>Match groups:</h3>
    {match ? match.slice(1).map((group, idx) => {
      return <div key={idx}>{idx + 1}: {group}</div>
    }) : 'No matches yet'}
  </div>
}

const RegexPlayground: FunctionComponent = () => {
  const isMounted = useIsMounted()
  // const [pattern, setPattern] = useQueryParam('pattern', withDefault(StringParam, ''))
  // const [flags, setFlags] = useQueryParam('flags', withDefault(StringParam, ''))
  const [matches, setMatches] = useQueryParam('matches[]', withDefault(ArrayParam, ['']))

  // const handlePatternChange = useCallback((event) => {
  //   setPattern(event.target.value)
  // }, [])
  // const handleFlagsChange = useCallback((event) => {
  //   setFlags(event.target.value)
  // }, [])
  // const handleClickClear = useCallback(() => {
  //   setFlags('')
  //   setPattern('')
  // }, [])

  // let re: RegExp
  // let errorMessage: string|void
  // try {
  //   re = new RegExp(pattern, flags)
  // } catch(err) {
  //   re = new RegExp('')
  //   errorMessage = err.message
  // }
  const handleChange = useCallback((event) => {
    console.log('event', event)
    // onChange(event.target.value)
  }, [])

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
      {/* <Match /> */}
      <FabButton onClick={onClick}>
        <p className="text-white font-bold">+</p>
      </FabButton>

      {/* <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-md-8'>
            <div className='container-fluid'>
              <div className='row bottom-xs'>
                <div className='col-xs-8 col-sm-6'>
                  <span>
                    <span>/</span>
                    <input
                      autoCapitalize='off'
                      autoCorrect='off'
                      value={pattern}
                      onChange={handlePatternChange}
                    />
                    <span>/</span>
                  </span>
                </div>
                <div className='col-xs-4 col-sm-4'>
                  <span>
                    <input
                      autoCapitalize='off'
                      autoCorrect='off'
                      value={flags}
                      onChange={handleFlagsChange}
                    />
                  </span>
                </div>
                <div className='col-sm-2 col-xs-12'>
                  <button
                    onClick={handleClickClear}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            <br />
            {
              matches.map((value, i) => {
                return (
                  <div key={i}>
                    <MatchBox
                      pattern={re}
                      value={value}
                      onChange={(value) => {
                        setMatches((prevMatches) => {
                          return [
                            ...prevMatches.slice(0, i),
                            value,
                            ...prevMatches.slice(i + 1),
                          ]
                        })
                      }}
                    />
                  </div>
                )
              })
            }
            <button role='button'
              onClick={() => {
                setMatches((prevMatches) => {
                  return [
                    ...prevMatches,
                    '',
                  ]
                })
              }}
            >
              +
            </button>
            {
              matches.length > 1 && <button role='button'
                onClick={() => {
                  setMatches((prevMatches) => {
                    return [
                      ...prevMatches.slice(0, prevMatches.length - 1),
                    ]
                  })
                }}
              >
                -
              </button>
            }
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default RegexPlayground
