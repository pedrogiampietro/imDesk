import DatePicker, { registerLocale } from 'react-datepicker'
import InputMask from 'react-input-mask'
import ptBR from 'date-fns/locale/pt-BR'

import 'react-datepicker/dist/react-datepicker.css'
import './styles.css'

registerLocale('ptBR', ptBR)

const CustomDatePicker = ({
	selected,
	onChangeEvent,
	wrapperClassName,
}: any) => {
	const months = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	]
	return (
		<>
			<DatePicker
				customInput={<InputMask type='text' mask='99/99/9999' />}
				locale='ptBR'
				renderCustomHeader={({
					date,
					changeYear,
					changeMonth,
					decreaseMonth,
					increaseMonth,
					prevMonthButtonDisabled,
					nextMonthButtonDisabled,
				}) => (
					<div className='input-group input-group-sm input-group-calender'>
						<div className='input-group-prepend'>
							<button
								onClick={(e) => {
									e.preventDefault()
									decreaseMonth()
								}}
								disabled={prevMonthButtonDisabled}
								className='btn btn-outline-secondary'
								type='button'
							>
								{'<'}
							</button>
						</div>

						<input
							type='number'
							onChange={({ target: { value } }) => changeYear(value as any)}
							value={date.getFullYear()}
							className='form-control'
							placeholder=''
							aria-label=''
							aria-describedby='basic-addon1'
						/>
						<select
							className='form-control custom-select'
							value={months[date.getMonth()]}
							onChange={({ target: { value } }) =>
								changeMonth(months.indexOf(value))
							}
						>
							{months.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
						<div className='input-group-append'>
							<button
								onClick={(e) => {
									e.preventDefault()
									increaseMonth()
								}}
								className='btn btn-outline-secondary'
								disabled={nextMonthButtonDisabled}
							>
								{'>'}
							</button>
						</div>
					</div>
				)}
				wrapperClassName={wrapperClassName}
				className='form-control'
				dateFormat='dd/MM/yyyy'
				// minDate={false}
				selected={selected}
				onChange={onChangeEvent}
			/>
		</>
	)
}

export default CustomDatePicker
