import { AxiosRequestConfig } from "axios"
import { useCallback, useEffect, useMemo, useState } from "react"





export const useAxiosLoader = (ax: any) => {
  const [counter, setCounter] = useState(0)
  const inc = useCallback(() => setCounter((counter) => counter + 1), [setCounter]) // add to counter
  const dec = useCallback(() => setCounter((counter) => counter - 1), [setCounter]) // remove from counter

  const interceptors = useMemo(
    () => ({
      // eslint-disable-next-line
      request: (config: AxiosRequestConfig) => (inc(), config), // eslint-disable-next-line
      response: (response: any) => (dec(), response), // eslint-disable-next-line
      error: (error: any) => (dec(), Promise.reject(error)), // eslint-disable-next-line
    }),
    [inc, dec],
  ) // create the interceptors

  useEffect(() => {
    const reqInterceptor = ax.interceptors.request.use(interceptors.request, interceptors.error)
    const resInterceptor = ax.interceptors.response.use(interceptors.response, interceptors.error)
    return () => {
      ax.interceptors.request.eject(reqInterceptor)
      ax.interceptors.response.eject(resInterceptor)
    }
  }, [ax.interceptors.request, ax.interceptors.response, interceptors])

  return counter > 0
}
