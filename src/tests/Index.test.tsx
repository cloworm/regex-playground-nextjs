import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'

import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'

const mockedUseRouter = useRouter as jest.Mock<any>

import Index from '../pages/index'

describe('Index', () => {
  test('renders the regex pattern from query params', async () => {
    mockedUseRouter.mockImplementation(() => ({
      asPath: '',
      query: {
        pattern: '[a-z]'
      },
    }))
    render(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)

    expect(screen.getByTestId('pattern-input')).toHaveValue('[a-z]')
  })
})
