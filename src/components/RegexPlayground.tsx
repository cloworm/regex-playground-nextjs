import React, { FunctionComponent, useCallback } from 'react'
import { useQueryState } from 'use-location-state'

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

  return <div>
    <input value={value} onChange={handleChange} />
    {/* TODO: Properly show the matches */}
    {/* TODO: List out the match-groups? */}
    {value.match(pattern)}
  </div>
}

const RegexPlayground: FunctionComponent = () => {
  const [pattern, setPattern] = useQueryState<string>('pattern', '')
  const [flags, setFlags] = useQueryState<string>('flags', '')
  const [matches, setMatches] = useQueryState<string[]>('matches[]', [''])

  const handlePatternChange = useCallback((event) => {
    setPattern(event.target.value)
  }, [])
  const handleFlagsChange = useCallback((event) => {
    setFlags(event.target.value)
  }, [])
  const handleClickClear = useCallback(() => {
    setFlags('')
    setPattern('')
  }, [])

  let re: RegExp
  let errorMessage: string|void
  try {
    re = new RegExp(pattern, flags)
  } catch(err) {
    re = new RegExp('')
    errorMessage = err.message
  }

  return (
    <div>
      {/* <AppBar
        title="RegEx Playground"
        // titleStyle={styles.title}
        style={styles.appBar}
        // iconElementLeft={<IconButton style={styles.logo}><img src='logo.svg' /></IconButton>}
      >
        <div className='row'>
          <div className='col-xs-12'>
            {/* <Share
              pattern={pattern}
              flags={flags}
              matches={matches}
            /> * /}
          </div>
        </div>
      </AppBar> */}
      <div className='container-fluid'>
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
                      // floatingLabelText='Pattern'
                      // floatingLabelStyle={styles.floatingLabel}
                      value={pattern}
                      onChange={handlePatternChange}
                      // style={styles.patternField}
                      // ref='pattern'
                      // errorText={errorMessage}
                      // underlineStyle={styles.underline}
                      // underlineFocusStyle={styles.underlineFocus}
                    />
                    <span>/</span>
                  </span>
                </div>
                <div className='col-xs-4 col-sm-4'>
                  <span>
                    <input
                      autoCapitalize='off'
                      autoCorrect='off'
                      // floatingLabelText='Flags'
                      // floatingLabelStyle={styles.floatingLabel}
                      value={flags}
                      onChange={handleFlagsChange}
                      // style={styles.flagsField}
                      // ref='flags'
                      // underlineStyle={styles.underline}
                      // underlineFocusStyle={styles.underlineFocus}
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
                    {/* <MatchBox
                      pattern={re}
                      value={value}
                      onChange={this.handleMatchBoxChange.bind(null, i)}
                    /> */}
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
          <div className='col-xs-12 col-md-4'>
            {/* <RegexReference
              onClickChip={this.handleClickChip}
            /> */}
          </div>
        </div>
      </div>
      <footer>
        <div className='container-fluid'>
          <a href='http://www.github.com/cloworm' target='_blank' rel='noopener noreferrer'>
            <img src='/github.png' />
            { ' ' }
            cloworm
          </a>
          { ' ' }
          © 2020
        </div>
      </footer>
    </div>
  )
}

export default RegexPlayground
