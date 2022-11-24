import { Layout } from '../../components/Layout'
import Select from 'react-select'
import * as S from './styles'

export function Ticket() {
	const optionsTicketType = [
		{ value: 'corrective', label: 'Corretiva' },
		{ value: 'preventive', label: 'Preventiva' },
	]

	const optionsCategory = [
		{ value: 'mv', label: 'MV' },
		{ value: 'wtt', label: 'WTT' },
		{ value: 'hardware', label: 'Hardware' },
		{ value: 'software', label: 'Software' },
	]

	return (
		<Layout>
			<S.Container>
				<S.Title>Novo Ticket</S.Title>
				<S.Form>
					<S.FormGroup>
						<S.Label htmlFor='ticket_type'>Tipo de Chamado:</S.Label>
						<Select
							className='basic-single'
							classNamePrefix='select'
							name='ticket_type'
							options={optionsTicketType}
						/>
					</S.FormGroup>
					<S.FormGroup>
						<S.Label htmlFor='ticket_category'>Categoria:</S.Label>
						<Select
							className='basic-single'
							classNamePrefix='select'
							name='ticket_category'
							options={optionsCategory}
						/>
					</S.FormGroup>
					<S.FormGroup>
						<S.Label htmlFor='ticket_type'>Prioridade:</S.Label>
						<S.Input type='text' id='ticket_type' />
					</S.FormGroup>
					<S.FormGroup>
						<S.Label htmlFor='ticket_type'>Localização:</S.Label>
						<S.Input type='text' id='ticket_type' />
					</S.FormGroup>
					<S.FormGroup>
						<S.Label htmlFor='ticket_type'>Descrição:</S.Label>
						<S.Input type='text' id='ticket_type' />
					</S.FormGroup>

					<S.FormGroup>
						<S.Label htmlFor='ticket_type'>Equipamentos:</S.Label>
						<S.Input type='text' id='ticket_type' />
					</S.FormGroup>
				</S.Form>
			</S.Container>
		</Layout>
	)
}
