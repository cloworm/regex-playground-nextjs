import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useRouter } from 'next/router'

import NextJsQueryParamProvider from '../providers/NextJsQueryParamProvider'

const mockedUseRouter = useRouter as jest.Mock<any>

import Index from '../pages/index'

describe('Index', () => {
  test('renders the regex pattern from query params', async () => {
    mockedUseRouter.mockImplementation(() => ({
      asPath: '/?pattern=[a-z]&flags=gi',
    }))
    render(<NextJsQueryParamProvider><Index /></NextJsQueryParamProvider>)

    expect(screen.getByTestId('pattern-input')).toHaveValue('[a-z]')
    expect(screen.getByTestId('flags-input')).toHaveValue('gi')
  })
})
