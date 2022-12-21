export const formatDate = (date: any) => {
	const newDate = new Date(date)

	const months = [
		'Jan',
		'Fev',
		'Mar',
		'Abr',
		'Mai',
		'Jun',
		'Jul',
		'Ago',
		'Set',
		'Out',
		'Nov',
		'Dez',
	]
	const year = newDate.getFullYear()
	const month = months[newDate.getMonth()]
	const getDate = newDate.getDate()
	let hour = newDate.getHours()
	hour = hour <= 9 ? `0${hour}` : (hour as any)
	let min = newDate.getMinutes()
	min = min <= 9 ? `0${min}` : (min as any)
	let sec = newDate.getSeconds()
	sec = sec <= 9 ? `0${sec}` : (sec as any)

	const time =
		getDate + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec

	return time
}
