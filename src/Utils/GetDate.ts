function dateToString(date : Date) {
  return date.toJSON().split('T')[0]
}

export function today() {
  return dateToString(new Date())
}

export function startOfMonth() {
  let date = new Date()

  date = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  )

  return dateToString(date) 
}
