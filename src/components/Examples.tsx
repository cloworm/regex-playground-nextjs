import React, { FunctionComponent, useCallback } from 'react'

import useQueryParams from '../hooks/useQueryParams'
import Card from './Card'

interface Example {
  pattern: string
  flags: string
  matchBoxValues: string[]
}

interface Examples {
  name: string
  tip: string
  example: Example
}

const flagExamples: Examples[] = [
  {name: 'g', tip: 'Global', example: {pattern: 'a', flags: 'g', matchBoxValues: ['banana']}},
  {name: 'i', tip: 'Case insensitive', example: {pattern: 'aBcDe', flags: 'i', matchBoxValues: ['abCDE']}},
]

const selectors: Examples[] = [
  {name: '.', tip: 'Any character', example: {pattern: '...-...', flags: '', matchBoxValues: ['abc-def-ghi-jkl']}},
  {name: '\\w', tip: 'Any word character', example: {pattern: '\\w+', flags: 'g', matchBoxValues: ['A8-3/49_B?']}},
  {name: '\\W', tip: 'Any non-word character', example: {pattern: '\\W+', flags: 'g', matchBoxValues: ['A8-3/49_B?']}},
  {name: '\\s', tip: 'Any whitespace character', example: {pattern: '\\s', flags: 'g', matchBoxValues: ['foo bar baz']}},
  {name: '\\S', tip: 'Any non-whitespace character', example: {pattern: '\\S+', flags: 'g', matchBoxValues: ['foo bar\nbaz']}},
  {name: '\\d', tip: 'Any digit character', example: {pattern: '\\d+', flags: 'g', matchBoxValues: ['867-5309']}},
  {name: '\\D', tip: 'Any non-digit character', example: {pattern: '\\D', flags: '', matchBoxValues: ['867-5309']}},
  {name: '[abc]', tip: 'Any character in the brackets', example: {pattern: '[aeiou]', flags: 'g', matchBoxValues: ['quick brown fox']}},
  {name: '[^abc]', tip: 'Any character not in the brackets', example: {pattern: '[^aeiou ]', flags: 'g', matchBoxValues: ['quick brown fox']}},
  {name: '[a-z]', tip: 'Any character in the range', example: {pattern: '[a-m]', flags: 'g', matchBoxValues: ['quick brown fox']}},
]

const positions: Examples[] = [
  {name: '^', tip: 'Beginning of string', example: {pattern: '^\\w+', flags: 'g', matchBoxValues: ['abc-def-ghi-jkl']}},
  {name: '$', tip: 'End of string', example: {pattern: '\\w+$', flags: 'g', matchBoxValues: ['abc-def-ghi-jkl']}},
]

const escapes: Examples[] = [
  {name: '.', tip: '\\.', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '\\', tip: '\\\\', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '+', tip: '\\+', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '*', tip: '\\*', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '?', tip: '\\?', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '^', tip: '\\^', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '$', tip: '\\$', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '[', tip: '\\[', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: ']', tip: '\\]', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '{', tip: '\\{', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '}', tip: '\\}', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '(', tip: '\\(', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: ')', tip: '\\)', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '|', tip: '\\|', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '/', tip: '\\/', example: {pattern: '', flags: '', matchBoxValues: ['']}},
]

const specials: Examples[] = [
  {name: '\\t', tip: 'Tab character', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '\\n', tip: 'New line character', example: {pattern: '', flags: '', matchBoxValues: ['']}},
  {name: '\\r', tip: 'Line return character', example: {pattern: '', flags: '', matchBoxValues: ['']}},
]

const groups: Examples[] = [
  {name: '(abc)', tip: 'Match group for whatever is between ( )', example: {pattern: '(https?)://(.+)', flags: '', matchBoxValues: ['http://example.com', 'https://example.com']}},
  {name: '$number', tip: 'Select a specific match group', example: {pattern: '', flags: '', matchBoxValues: ['']}},
]

const counts: Examples[] = [
  {name: '+', tip: 'One or more', example: {pattern: '\\w+', flags: 'g', matchBoxValues: ['a ab abc abcd']}},
  {name: '*', tip: 'Zero or more', example: {pattern: 'http://.*', flags: '', matchBoxValues: ['http://example.com']}},
  {name: '{min, max}', tip: 'At least min number, at most max number', example: {pattern: '\\w{2,4}', flags: 'g', matchBoxValues: ['a ab abc abcd abcde']}},
  {name: '?', tip: 'Zero or one', example: {pattern: 'https?', flags: '', matchBoxValues: ['http://example.com', 'https://example.com']}},
  {name: '|', tip: 'Or operator', example: {pattern: '(https|http)', flags: '', matchBoxValues: ['http://example.com', 'https://example.com']}},
]

const Examples: FunctionComponent = () => {
  const [_query, setQuery] = useQueryParams()

  const handleClick = useCallback((example: Example) => {
    setQuery({
      pattern: example.pattern,
      flags: example.flags,
      matches: example.matchBoxValues
    })
  }, [setQuery])

  return (
    <Card>
      <p className="text-center text-sm text-theme_textGray">
        Click an example below to view
      </p>
      <hr className="border-theme_slateBlue border-t-3" />

      <table className="table-fixed w-full">
        <tbody>
          {
            flagExamples.map(({
              example,
              name,
              tip,
            }: Examples, idx) => {
              return (
                <tr onClick={() => handleClick(example)} className="hover:bg-theme_gray cursor-pointer" key={idx}>
                  <td className="w-1/4">{name}</td>
                  <td>{tip}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <hr className="border-theme_slateBlue border-t-3" />

      <table className="table-fixed w-full">
        <tbody>
          {
            selectors.map(({
              example,
              name,
              tip
            }: Examples, idx) => {
              return (
                <tr onClick={() => handleClick(example)} className="hover:bg-theme_gray cursor-pointer" key={idx}>
                  <td className="w-1/4">{name}</td>
                  <td>{tip}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <hr className="border-theme_slateBlue border-t-3" />

      <table className="table-fixed w-full">
        <tbody>
          {
            positions.map(({
              example,
              name,
              tip,
            }: Examples, idx) => {
              return (
                <tr onClick={() => handleClick(example)} className="hover:bg-theme_gray cursor-pointer" key={idx}>
                  <td className="w-1/4">{name}</td>
                  <td>{tip}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <hr className="border-theme_slateBlue border-t-3" />

      <table className="table-fixed w-full">
        <tbody>
          {
            escapes.map(({
              example,
              name,
              tip,
            }: Examples, idx) => {
              return (
                <tr onClick={() => handleClick(example)} className="hover:bg-theme_gray cursor-pointer" key={idx}>
                  <td className="w-1/4">{name}</td>
                  <td>{tip}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <hr className="border-theme_slateBlue border-t-3" />

      <table className="table-fixed w-full">
        <tbody>
          {
            specials.map(({
              example,
              name,
              tip,
            }: Examples, idx) => {
              return (
                <tr onClick={() => handleClick(example)} className="hover:bg-theme_gray cursor-pointer" key={idx}>
                  <td className="w-1/4">{name}</td>
                  <td>{tip}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <hr className="border-theme_slateBlue border-t-3" />
      <table className="table-fixed w-full">
        <tbody>
          {
            groups.map(({
              example,
              name,
              tip,
            }: Examples, idx) => {
              return (
                <tr onClick={() => handleClick(example)} className="hover:bg-theme_gray cursor-pointer" key={idx}>
                  <td className="w-1/4">{name}</td>
                  <td>{tip}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <hr className="border-theme_slateBlue border-t-3" />
      <table className="table-fixed w-full">
        <tbody>
          {
            counts.map(({
              example,
              name,
              tip,
            }: Examples, idx) => {
              return (
                <tr onClick={() => handleClick(example)} className="hover:bg-theme_gray cursor-pointer" key={idx}>
                  <td className="w-1/4">{name}</td>
                  <td>{tip}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

    </Card>
  )
}

export default Examples
