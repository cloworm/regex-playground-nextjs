import React, { FunctionComponent, CSSProperties, useState, useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
// import ContentAdd from '@material-ui/core/svg-icons/content/add'
// import ContentRemove from '@material-ui/core/svg-icons/content/remove'
import Button from '@material-ui/core/Button'
// import MatchBox from './MatchBox.jsx'
// import RegexReference from './RegexReference.jsx'
// import Query from './Query.js'
// import Share from './Share.jsx'
import AppBar from '@material-ui/core/AppBar'
// import ShareLink from './ShareLink.js'
import IconButton from '@material-ui/core/IconButton'

const styles = {
  actionButton: {
    float: 'right',
    marginRight: '10px',
  } as CSSProperties,
  appBar: {
    backgroundColor: '#fff'
  } as CSSProperties,
  clearButton: {
    marginBottom: '10px',
    verticalAlign: 'bottom'
  } as CSSProperties,
  flagsField: {
    float: 'left',
    width: '100%'
  } as CSSProperties,
  flagsFieldSpan: {
    display: 'inline-block',
    position: 'relative'
  } as CSSProperties,
  floatingLabel: {
    color: '#000'
  } as CSSProperties,
  footer: {
    backgroundColor: '#e91e63',
    color: '#fff',
    lineHeight: '50px',
    height: '50px',
    marginBottom: '0'
  } as CSSProperties,
  github: {
    height: '1rem'
  } as CSSProperties,
  iconFill: {
    fill: '#000'
  } as CSSProperties,
  link: {
    color:'#fff',
    textDecoration: 'none',
    textShadow: 'none',
  } as CSSProperties,
  logo: {
    padding: '2px',
    marginLeft: '10px'
  } as CSSProperties,
  matchBoxMargin: {
    margin: '15px'
  } as CSSProperties,
  patternField: {
    float: 'left',
    width: '100%'
  } as CSSProperties,
  slashLeft: {
    position: 'absolute',
    top: '42px',
    left: '-6px'
  } as CSSProperties,
  slashRight: {
    position: 'absolute',
    top: '42px',
    right: '-6px'
  } as CSSProperties,
  slashWrapper: {
    display: 'inline-block',
    position: 'relative',
    marginRight: '12px',
    width: '100%'
  } as CSSProperties,
  title: {
    fontFamily: 'Montserrat, sans-serif',
    color: '#e91e63',
  } as CSSProperties,
  underline: {
    borderColor: '#000'
  } as CSSProperties,
  underlineFocus: {
    borderColor: '#fff'
  } as CSSProperties
};

const RegexPlayground: FunctionComponent = () => {
  const [pattern, setPattern] = useState<string>('')
  const [flags, setFlags] = useState<string>('')

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
      <AppBar
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
              matches={matchBoxValues}
            /> */}
          </div>
        </div>
      </AppBar>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-md-8'>
            <div className='container-fluid'>
              <div className='row bottom-xs'>
                <div className='col-xs-8 col-sm-6'>
                  <span style={styles.slashWrapper}>
                    <span style={styles.slashLeft}>/</span>
                    <TextField
                      autoCapitalize='off'
                      autoCorrect='off'
                      // floatingLabelText='Pattern'
                      // floatingLabelStyle={styles.floatingLabel}
                      value={pattern}
                      onChange={handlePatternChange}
                      style={styles.patternField}
                      // ref='pattern'
                      // errorText={errorMessage}
                      // underlineStyle={styles.underline}
                      // underlineFocusStyle={styles.underlineFocus}
                    />
                    <span style={styles.slashRight}>/</span>
                  </span>
                </div>
                <div className='col-xs-4 col-sm-4'>
                  <span style={styles.flagsFieldSpan}>
                    <TextField
                      autoCapitalize='off'
                      autoCorrect='off'
                      // floatingLabelText='Flags'
                      // floatingLabelStyle={styles.floatingLabel}
                      value={flags}
                      onChange={handleFlagsChange}
                      style={styles.flagsField}
                      // ref='flags'
                      // underlineStyle={styles.underline}
                      // underlineFocusStyle={styles.underlineFocus}
                    />
                  </span>
                </div>
                <div className='col-sm-2 col-xs-12'>
                  <Button
                    // label='Clear'
                    style={styles.clearButton}
                    onClick={handleClickClear}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
            <br />
            {/* {this.renderMatchBoxes(re)} */}
            {/* <Fab
              backgroundColor='#fff'
              mini={true}
              style={styles.actionButton}
              onClick={this.handleNewMatchBox}
              iconStyle={styles.iconFill}
            >
              {/* <ContentAdd /> * /}
              +
            </Fab>
            {(matchBoxValues.length > 1) ?
              <Fab
                backgroundColor='#bdc3c7'
                mini={true}
                style={styles.actionButton}
                onClick={this.handleRemoveMatchBox}
                iconStyle={styles.iconFill}
              >
                {/* <ContentRemove /> * /}
                -
              </Fab> : null
            } */}
          </div>
          <div className='col-xs-12 col-md-4'>
            {/* <RegexReference
              onClickChip={this.handleClickChip}
            /> */}
          </div>
        </div>
      </div>
      <footer style={styles.footer}>
        <div className='container-fluid'>
          <a style={styles.link} href='http://www.github.com/cloworm' target='_blank'><img style={styles.github} src='github.png' /> cloworm</a> © 2016
        </div>
      </footer>
    </div>
  )
}

export default RegexPlayground
