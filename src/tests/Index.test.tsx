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
    let path = '/?pattern=[a-z]&flags=gi'
    mockedUseRouter.mockImplementation(() => ({
      asPath: path,
      push: (_: UrlObject, { search, pathname }: UrlObject) => {
        path = `${pathname}${search}`
      },
    }))
    const { rerender } = render(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)

    const patternInput: HTMLElement = screen.getByRole('textbox', { name: 'pattern' })
    expect(patternInput).toHaveValue('[a-z]')

    const flagsInput: HTMLElement = screen.getByRole('textbox', { name: 'flags' })
    expect(flagsInput).toHaveValue('gi')

    // TODO: Add match examples and expect match groups and proper text area highlights.

    fireEvent.change(patternInput, { target: { value: '[0-9]' } })
    expect(path).toEqual('/?flags=gi&pattern=%5B0-9%5D')
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)
    expect(patternInput).toHaveValue('[0-9]')
    expect(flagsInput).toHaveValue('gi')

    fireEvent.change(flagsInput, { target: { value: '' } })
    expect(path).toEqual('/?flags=&pattern=%5B0-9%5D')
    rerender(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)
    expect(patternInput).toHaveValue('[0-9]')
    expect(flagsInput).toHaveValue('')

    // TODO: Expect updated match groups and proper text area highlights.
  })
})
