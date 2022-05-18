import dayjs from 'dayjs'

class Format {
  formDate(date: string, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(format)
  }
}

const format = new Format()

export { format }
