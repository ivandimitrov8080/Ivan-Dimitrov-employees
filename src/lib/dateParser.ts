import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const format = (date: dayjs.Dayjs): bigint => {
	return BigInt(date.unix() * 1000)
}

const parseDate = (date: string | undefined): bigint => {
	if (date === 'NULL' || date === '') {
		return format(dayjs())
	}
	return format(dayjs(date))
}
export default parseDate
