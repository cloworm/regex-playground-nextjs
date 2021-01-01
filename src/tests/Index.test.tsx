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
    const { rerender } = render(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)

    const patternInput: HTMLElement = screen.getByRole('textbox', { name: 'pattern' })
    expect(patternInput).toHaveValue('[a-z]+')

    const flagsInput: HTMLElement = screen.getByRole('textbox', { name: 'flags' })
    expect(flagsInput).toHaveValue('gi')

    // To add more match textareas:
    // fireEvent.click(screen.getByRole('button', { name: 'add-match' }))
    const matchTextarea: HTMLElement = screen.getByTestId('match-0')
    fireEvent.change(matchTextarea, { target: { value: 'Hello... World 12345 ok!' } })
    expect(path).toEqual('/?flags=gi&matches=Hello...%20World%2012345%20ok%21&pattern=%5Ba-z%5D%2B')
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)
    expect(matchTextarea).toHaveValue('Hello... World 12345 ok!')
    expect(patternInput).toHaveValue('[a-z]+')
    expect(flagsInput).toHaveValue('gi')

    expect(screen.getByTestId('match-0-paragraph')).toHaveTextContent('Match Found!')
    expect(screen.getByTestId('match-0-count')).toHaveTextContent('3')
    expect(screen.getByTestId('match-0-matchgroup-0')).toHaveTextContent('Hello')
    expect(screen.getByTestId('match-0-matchgroup-1')).toHaveTextContent('World')
    expect(screen.getByTestId('match-0-matchgroup-2')).toHaveTextContent('ok')

    // TODO: Expect proper text area highlights.

    fireEvent.change(patternInput, { target: { value: '[0-9]+' } })
    expect(path).toEqual('/?flags=gi&matches=Hello...%20World%2012345%20ok%21&pattern=%5B0-9%5D%2B')
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)
    expect(matchTextarea).toHaveValue('Hello... World 12345 ok!')
    expect(patternInput).toHaveValue('[0-9]+')
    expect(flagsInput).toHaveValue('gi')

    fireEvent.change(flagsInput, { target: { value: '' } })
    expect(path).toEqual('/?flags=&matches=Hello...%20World%2012345%20ok%21&pattern=%5B0-9%5D%2B')
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)
    expect(matchTextarea).toHaveValue('Hello... World 12345 ok!')
    expect(patternInput).toHaveValue('[0-9]+')
    expect(flagsInput).toHaveValue('')

    // TODO: Expect updated match groups and proper text area highlights.
  })
})
