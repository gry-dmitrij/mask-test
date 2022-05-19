import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

export default ({ app: { $dayjs } }) => {
  $dayjs.extend(customParseFormat)
  $dayjs.extend(isBetween)
  $dayjs.extend(isSameOrBefore)
  $dayjs.extend(isSameOrAfter)
  $dayjs.extend(utc)
  $dayjs.extend(timezone)
}
