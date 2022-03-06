type QueryParams = [query: string, value: string] | boolean

export function buildUrl(base : string, ...params : QueryParams[]) {
  const url = new URL(base)

  for(const param of params) {
    if(typeof param === 'boolean') break

    url.searchParams.append(...param)
  }

  return url.href
}
