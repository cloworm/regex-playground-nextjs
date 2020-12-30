import { FunctionComponent, useMemo } from 'react'
import { withDefault, StringParam, ArrayParam, useQueryParams } from 'use-query-params'

import useIsMounted from '../hooks/useIsMounted'

const Permalink: FunctionComponent = () => {
  const isMounted = useIsMounted()
  const [{ pattern, flags, matches }] = useQueryParams({
    pattern: withDefault(StringParam, ''),
    flags: withDefault(StringParam, ''),
    matches: withDefault(ArrayParam, [''])
  })

  const url = useMemo(() => {
    if (!isMounted) return ''

    let url = `${window.location.protocol}//${window.location.host}`
    const params = []
    if (pattern.length > 0) {
      if (params.length < 1) url += '?'
      params.push(`pattern=${encodeURIComponent(pattern)}`)
    }
    if (flags.length > 0) {
      if (params.length < 1) url += '?'
      params.push(`flags=${encodeURIComponent(flags)}`)
    }
    if (matches.length > 0 && matches[0] !== '') {
      if (params.length < 1) url += '?'
      matches.forEach(function(match) {
        if (!match) return
        params.push(`matches[]=${encodeURIComponent(match)}`)
      })
    }

    return url + params.join('&')
  }, [pattern, flags, matches, isMounted])

  return (
    <div>
      {url}
    </div>
  )
}

export default Permalink
