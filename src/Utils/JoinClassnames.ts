type Classname = string | false | null | undefined

export function joinClassnames(classList : Classname[]) {
  return classList.filter((classname) => classname).join(' ')
}
