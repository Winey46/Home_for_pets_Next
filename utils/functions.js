export function timeAndDate() {
  const time = `[${new Date().getHours()} : ${new Date().getMinutes()}]`

  const formatter = new Intl.DateTimeFormat('ru-RU',
    {day: 'numeric', month: 'numeric', year: 'numeric'})

  const formattedDate = formatter.format(new Date())

  return `${time} ${formattedDate}`
}