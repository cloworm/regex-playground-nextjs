import React, { FunctionComponent } from 'react'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { QueryParamProvider } from 'use-query-params'

const NextJsQueryParamProvider: FunctionComponent = ({
  children,
}) => {
  // Making use-query-params work with next.js following code samples here:
  // https://github.com/pbeshai/use-query-params/issues/13

  const router = useRouter()
  const match = router.asPath.match(/[^?]+/)
  const pathname = match ? match[0] : router.asPath
  const location = useMemo(
    () =>
      (process as any).browser
        ? window.location
        : ({
            search: router.asPath.replace(/[^?]+/u, ''),
          } as Location),
    [router.asPath]
  );

  const history = useMemo(
    () => ({
      push: ({ search }: Location) =>
        router.push(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true }
        ),
      replace: ({ search }: Location) => {
        router.replace(
          { pathname: router.pathname, query: router.query },
          { search, pathname },
          { shallow: true }
        )
      },
      location,
    }),
    [pathname, router.pathname, router.query, location]
  )

  return (
    <QueryParamProvider history={history} location={location}>
      {children}
    </QueryParamProvider>
  )
}

export default NextJsQueryParamProvider
