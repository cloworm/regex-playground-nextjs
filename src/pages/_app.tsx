import '../styles/globals.css'

import { useMemo } from 'react'
import { QueryParamProvider } from 'use-query-params'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  // Making use-query-params work with next.js following code samples here:
  // https://github.com/pbeshai/use-query-params/issues/13

  const router = useRouter()
  const match = router.asPath.match(/[^?]+/)
  const pathname = match ? match[0] : router.asPath
  const location = useMemo(
    () =>
      process.browser
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
      <Component {...pageProps} />
    </QueryParamProvider>
  )
}

export default MyApp
