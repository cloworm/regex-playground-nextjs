import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'
import { UrlObject } from 'url'

import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'

const mockedUseRouter = useRouter as jest.Mock<any>

import Index from '../pages/index'

describe('Index', () => {
  test('renders the regex pattern from query params', async () => {
    let path = '/?pattern=[a-z]%2B&flags=gi'
    mockedUseRouter.mockImplementation(() => ({
      asPath: path,
      push: (_: UrlObject, { search, pathname }: UrlObject) => {
        path = `${pathname}${search}`
      },
    }))
    const { container, rerender } = render(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)

    const patternInput: HTMLElement = screen.getByRole('textbox', { name: 'pattern' })
    expect(patternInput).toHaveValue('[a-z]+')

    const flagsInput: HTMLElement = screen.getByRole('textbox', { name: 'flags' })
    expect(flagsInput).toHaveValue('gi')

    const match0Textarea: HTMLElement = screen.getByTestId('match-0')
    fireEvent.change(match0Textarea, { target: { value: 'Hello... World 12345 ok!' } })
    expect(path).toEqual('/?flags=gi&matches=Hello...%20World%2012345%20ok%21&pattern=%5Ba-z%5D%2B')
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)
    expect(match0Textarea).toHaveValue('Hello... World 12345 ok!')
    expect(patternInput).toHaveValue('[a-z]+')
    expect(flagsInput).toHaveValue('gi')

    expect(screen.getByTestId('match-0-paragraph')).toHaveTextContent('Match Found!')
    expect(screen.getByTestId('match-0-count')).toHaveTextContent('3')
    expect(screen.getByTestId('match-0-matchgroup-0')).toHaveTextContent('Hello')
    expect(screen.getByTestId('match-0-matchgroup-1')).toHaveTextContent('World')
    expect(screen.getByTestId('match-0-matchgroup-2')).toHaveTextContent('ok')

    // TODO: Refactor into helper function
    let textareaContainer = container.getElementsByClassName('match-0-highlight-text-area-container')[0]
    let highlightedAreas = textareaContainer.querySelectorAll('div > div > div > mark')
    let unhighlightedAreas = textareaContainer.querySelectorAll('div > div > div > span')
    expect(highlightedAreas.length).toEqual(3)
    expect(unhighlightedAreas.length).toEqual(3)
    expect(highlightedAreas[0].innerHTML).toEqual('Hello')
    expect(highlightedAreas[1].innerHTML).toEqual('World')
    expect(highlightedAreas[2].innerHTML).toEqual('ok')
    expect(unhighlightedAreas[0].innerHTML).toEqual('... ')
    expect(unhighlightedAreas[1].innerHTML).toEqual(' 12345 ')
    expect(unhighlightedAreas[2].innerHTML).toEqual('!')

    // Add another match text area.
    fireEvent.click(screen.getByRole('button', { name: 'add-match' }))
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)

    const match1Textarea: HTMLElement = screen.getByTestId('match-1')
    fireEvent.change(match1Textarea, { target: { value: '555-555-12345' } })
    expect(path).toEqual('/?flags=gi&matches=Hello...%20World%2012345%20ok%21&matches=555-555-12345&pattern=%5Ba-z%5D%2B')
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)
    expect(match1Textarea).toHaveValue('555-555-12345')

    expect(screen.getByTestId('match-1-paragraph')).toHaveTextContent('No Matches Found')
    expect(screen.getByTestId('match-1-count')).toHaveTextContent('0')
    expect(screen.queryByTestId('match-1-matchgroup-0')).not.toBeInTheDocument()

    textareaContainer = container.getElementsByClassName('match-1-highlight-text-area-container')[0]
    highlightedAreas = textareaContainer.querySelectorAll('div > div > div > mark')
    unhighlightedAreas = textareaContainer.querySelectorAll('div > div > div > span')
    expect(highlightedAreas.length).toEqual(0)
    expect(unhighlightedAreas.length).toEqual(1)
    expect(unhighlightedAreas[0].innerHTML).toEqual('555-555-12345')

    fireEvent.change(patternInput, { target: { value: '[0-9]+' } })
    expect(path).toEqual('/?flags=gi&matches=Hello...%20World%2012345%20ok%21&matches=555-555-12345&pattern=%5B0-9%5D%2B')
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)
    expect(match0Textarea).toHaveValue('Hello... World 12345 ok!')
    expect(patternInput).toHaveValue('[0-9]+')
    expect(flagsInput).toHaveValue('gi')

    fireEvent.change(flagsInput, { target: { value: '' } })
    expect(path).toEqual('/?flags=&matches=Hello...%20World%2012345%20ok%21&matches=555-555-12345&pattern=%5B0-9%5D%2B')
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)
    expect(match0Textarea).toHaveValue('Hello... World 12345 ok!')
    expect(patternInput).toHaveValue('[0-9]+')
    expect(flagsInput).toHaveValue('')

    // No longer using global flag, so only the first occurrence should be found.

    textareaContainer = container.getElementsByClassName('match-0-highlight-text-area-container')[0]
    highlightedAreas = textareaContainer.querySelectorAll('div > div > div > mark')
    unhighlightedAreas = textareaContainer.querySelectorAll('div > div > div > span')
    expect(highlightedAreas.length).toEqual(1)
    expect(unhighlightedAreas.length).toEqual(2)
    expect(highlightedAreas[0].innerHTML).toEqual('12345')
    expect(unhighlightedAreas[0].innerHTML).toEqual('Hello... World ')
    expect(unhighlightedAreas[1].innerHTML).toEqual(' ok!')

    textareaContainer = container.getElementsByClassName('match-1-highlight-text-area-container')[0]
    highlightedAreas = textareaContainer.querySelectorAll('div > div > div > mark')
    unhighlightedAreas = textareaContainer.querySelectorAll('div > div > div > span')
    expect(highlightedAreas.length).toEqual(1)
    expect(unhighlightedAreas.length).toEqual(1)
    expect(highlightedAreas[0].innerHTML).toEqual('555')
    expect(unhighlightedAreas[0].innerHTML).toEqual('-555-12345')
  })
})
