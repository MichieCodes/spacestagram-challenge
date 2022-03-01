function dateToString(date : Date) {
  return date.toJSON().split('T')[0]
}

function stringToDate(date : string) {
  return new Date(date + 'T00:00:00')
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

export function daysSince(date : string) {
  const milliseconds = 24 * 60 * 60 * 1000
  let difference = new Date().getTime() - stringToDate(date).getTime()
  
  return  Math.round(difference / milliseconds) 
}

export function relativeDate(date : string, days : number) {
  if(!days) return date

  let newDate = stringToDate(date)

  newDate = new Date(
    newDate.getFullYear(),
    newDate.getMonth(),
    newDate.getDay() + (days - 1)
  )

  return dateToString(newDate)
}
