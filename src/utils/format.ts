import dayjs from 'dayjs'

import {
  Link,
  ChatDotRound,
  Monitor,
  Reading,
  MostlyCloudy,
  Odometer,
  Document,
  Wallet
} from '@element-plus/icons-vue'

const iconList = [
  Link,
  MostlyCloudy,
  ChatDotRound,
  Monitor,
  Reading,
  Odometer,
  Document,
  Wallet
]

class Format {
  formDate(date: string, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(format)
  }

  formatIcon(icon: string) {
    return iconList[iconList.findIndex((item: any) => item.name === icon)]
  }
}

const format = new Format()

export { format }
