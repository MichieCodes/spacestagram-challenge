function dateToString(date : Date) {
  return date.toJSON().split('T')[0]
}

export function today() {
  return dateToString(new Date())
}

export function startOfMonth() {
  let date = new Date()

  date.setFullYear(
    date.getFullYear(),
    date.getMonth(),
    0
  )

  return dateToString(date) 
}
