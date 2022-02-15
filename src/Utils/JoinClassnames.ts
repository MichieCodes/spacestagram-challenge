type Classname = string | boolean | null | undefined

export function joinClassnames(classList : Classname[]) {
  return classList.filter((classname) => classname && classname !== true).join(' ')
}
