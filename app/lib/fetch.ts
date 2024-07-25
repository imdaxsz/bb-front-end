import returnFetch, { FetchArgs, ReturnFetchDefaultOptions } from 'return-fetch'

// Use as a replacer of `RequestInit`
type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, 'body'> & {
  body?: object
}

// Use as a replacer of `Response`
export type ResponseGenericBody<T> = Omit<
  Awaited<ReturnType<typeof fetch>>,
  keyof Body | 'clone'
> & {
  body: T
}

export type JsonResponse<T> = T extends object
  ? ResponseGenericBody<T>
  : ResponseGenericBody<unknown>

const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text)
  } catch (e) {
    if ((e as Error).name !== 'SyntaxError') {
      throw e
    }

    return text.trim()
  }
}

export const returnFetchJson = (args?: ReturnFetchDefaultOptions) => {
  const fetch = returnFetch(args)

  return async <T>(
    url: FetchArgs[0],
    init?: JsonRequestInit,
  ): Promise<JsonResponse<T>> => {
    const response = await fetch(url, {
      ...init,
      body: init?.body && JSON.stringify(init.body),
    })

    const body = parseJsonSafely(await response.text()) as T

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body,
    } as JsonResponse<T>
  }
}

// Create an extended fetch function and use it instead of the global fetch.
export const fetchExtended = returnFetchJson({
  baseUrl: process.env.API_ROOT,
  headers: { Accept: 'application/json' },
  interceptors: {
    request: async (args) => {
      return args
    },

    response: async (response, requestArgs) => {
      console.log('url:', requestArgs[0].toString())
      return response
    },
  },
})

export type ApiResponse<T> = {
  status: number
  statusText: string
  data: T
}
