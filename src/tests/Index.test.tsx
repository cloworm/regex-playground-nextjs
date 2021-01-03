import React, { FunctionComponent } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'

import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'

const mockedUseRouter = useRouter as jest.Mock<any>

import Index from '../pages/index'

const TestComponent: FunctionComponent = () => <NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>

const expectMatchGroups = ({
  container,
  matchIdx,
  matches,
  unmatches,
}: {
  container: Element,
  matchIdx: number,
  matches: string[],
  unmatches: string[],
}): void => {
  expect(screen.getByTestId(`match-${matchIdx}-paragraph`)).toHaveTextContent(matches.length ? 'Match Found!' : 'No Matches Found')
  expect(screen.getByTestId(`match-${matchIdx}-count`)).toHaveTextContent(matches.length.toString())

  if (matches.length) {
    expect(screen.queryByTestId(`match-${matchIdx}-matchgroup-0`)).toBeInTheDocument()
  } else {
    expect(screen.queryByTestId(`match-${matchIdx}-matchgroup-0`)).not.toBeInTheDocument()
  }

  matches.forEach((matchText, idx) => {
    expect(screen.getByTestId(`match-${matchIdx}-matchgroup-${idx}`)).toHaveTextContent(matchText)
  })

  const textareaContainer = container.getElementsByClassName(`match-${matchIdx}-highlight-text-area-container`)[0]
  const highlightedAreas = textareaContainer.querySelectorAll('div > div > div > mark')
  const unhighlightedAreas = textareaContainer.querySelectorAll('div > div > div > span')
  expect(highlightedAreas.length).toEqual(matches.length)
  expect(unhighlightedAreas.length).toEqual(unmatches.length)

  matches.forEach((matchText, idx) => {
    expect(highlightedAreas[idx].innerHTML).toEqual(matchText)
  })

  unmatches.forEach((matchText, idx) => {
    expect(unhighlightedAreas[idx].innerHTML).toEqual(matchText)
  })
}

const expectAppValues = ({
  actualPath,
  expectedPath,
  pattern,
  flags,
  matchBoxes,
}: {
  actualPath: string,
  expectedPath: string,
  pattern: string,
  flags: string,
  matchBoxes: string[],
}): void => {
  expect(actualPath).toEqual(expectedPath)
  const patternInput: HTMLElement = screen.getByRole('textbox', { name: 'pattern' })
  const flagsInput: HTMLElement = screen.getByRole('textbox', { name: 'flags' })

  expect(patternInput).toHaveValue(pattern)
  expect(flagsInput).toHaveValue(flags)

  matchBoxes.forEach((matchText, idx) => {
    const matchTextArea: HTMLElement = screen.getByTestId(`match-${idx}`)
    expect(matchTextArea).toHaveValue(matchText)
  })
}

describe('Index', () => {
  test('renders the regex pattern from query params', async () => {
    let path = '/?pattern=[a-z]%2B&flags=gi'
    mockedUseRouter.mockImplementation(() => ({
      asPath: path,
      push: (_: UrlObject, { search, pathname }: UrlObject) => {
        path = `${pathname}${search}`
      },
    }))
    const { container, rerender } = render(<TestComponent />)

    const patternInput: HTMLElement = screen.getByRole('textbox', { name: 'pattern' })
    const flagsInput: HTMLElement = screen.getByRole('textbox', { name: 'flags' })
    const match0Textarea: HTMLElement = screen.getByTestId('match-0')
    fireEvent.change(match0Textarea, { target: { value: 'Hello... World 12345 ok!' } })
    rerender(<TestComponent />)

    expectAppValues({
      actualPath: path,
      expectedPath: '/?flags=gi&matches=Hello...%20World%2012345%20ok%21&pattern=%5Ba-z%5D%2B',
      pattern: '[a-z]+',
      flags: 'gi',
      matchBoxes: [
        'Hello... World 12345 ok!',
      ],
    })

    expectMatchGroups({
      container,
      matchIdx: 0,
      matches: ['Hello', 'World', 'ok'],
      unmatches: ['... ', ' 12345 ', '!'],
    })

    // Add another match text area.
    fireEvent.click(screen.getByRole('button', { name: 'add-match' }))
    rerender(<TestComponent />)

    const match1Textarea: HTMLElement = screen.getByTestId('match-1')
    fireEvent.change(match1Textarea, { target: { value: '555-555-12345' } })
    rerender(<TestComponent />)

    expectAppValues({
      actualPath: path,
      expectedPath: '/?flags=gi&matches=Hello...%20World%2012345%20ok%21&matches=555-555-12345&pattern=%5Ba-z%5D%2B',
      pattern: '[a-z]+',
      flags: 'gi',
      matchBoxes: [
        'Hello... World 12345 ok!',
        '555-555-12345',
      ],
    })

    expectMatchGroups({
      container,
      matchIdx: 1,
      matches: [],
      unmatches: ['555-555-12345'],
    })

    fireEvent.change(patternInput, { target: { value: '[0-9]+' } })
    rerender(<TestComponent />)

    expectAppValues({
      actualPath: path,
      expectedPath: '/?flags=gi&matches=Hello...%20World%2012345%20ok%21&matches=555-555-12345&pattern=%5B0-9%5D%2B',
      pattern: '[0-9]+',
      flags: 'gi',
      matchBoxes: [
        'Hello... World 12345 ok!',
        '555-555-12345',
      ],
    })

    fireEvent.change(flagsInput, { target: { value: '' } })
    rerender(<TestComponent />)

    expectAppValues({
      actualPath: path,
      expectedPath: '/?flags=&matches=Hello...%20World%2012345%20ok%21&matches=555-555-12345&pattern=%5B0-9%5D%2B',
      pattern: '[0-9]+',
      flags: '',
      matchBoxes: [
        'Hello... World 12345 ok!',
        '555-555-12345',
      ],
    })

    // No longer using global flag, so only the first occurrence should be found.
    expectMatchGroups({
      container,
      matchIdx: 0,
      matches: ['12345'],
      unmatches: ['Hello... World ', ' ok!'],
    })

    expectMatchGroups({
      container,
      matchIdx: 1,
      matches: ['555'],
      unmatches: ['-555-12345'],
    })

    fireEvent.click(screen.getByTestId('match-0-remove'))
    rerender(<TestComponent />)

    expectAppValues({
      actualPath: path,
      expectedPath: '/?flags=&matches=555-555-12345&pattern=%5B0-9%5D%2B',
      pattern: '[0-9]+',
      flags: '',
      matchBoxes: [
        '555-555-12345',
      ],
    })

    fireEvent.click(screen.getByTestId('match-0-remove'))
    rerender(<TestComponent />)

    expectAppValues({
      actualPath: path,
      expectedPath: '/?flags=&pattern=%5B0-9%5D%2B',
      pattern: '[0-9]+',
      flags: '',
      matchBoxes: [
        '',
      ],
    })
  })
})
