import { withDefault, StringParam, ArrayParam, useQueryParams as useQueryParamsPkg } from 'use-query-params'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useQueryParams = () => {
  return useQueryParamsPkg({
    pattern: withDefault(StringParam, ''),
    flags: withDefault(StringParam, ''),
    key: withDefault(StringParam, ''),
    matches: withDefault(ArrayParam, [''])
  })
}

export default useQueryParams
