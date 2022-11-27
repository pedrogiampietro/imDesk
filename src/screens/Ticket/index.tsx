import { useState, useEffect } from 'react'
import { apiClient } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { Layout } from '../../components/Layout'
import Select, { components } from 'react-select'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { MdOutlineErrorOutline } from 'react-icons/md'

import * as yup from 'yup'
import * as S from './styles'

interface ISelect {
	id: string
	name: string
	value: string
}

const createNewTicketSchema = yup.object().shape({
	ticket_type: yup.string().required('Um tipo de chamado é obrigatório'),
	ticket_category: yup
		.string()
		.required('Uma categoria de chamado é obrigatória'),
	ticket_priority: yup
		.string()
		.required('Uma prioridade de chamado é obrigatória'),
	ticket_location: yup.string().required('Uma localização é obrigatória'),
})

export function Ticket() {
	const {
		handleSubmit,
		control,
		setValue,
		register,
		formState: { isSubmitting, errors },
	} = useForm({
		// resolver: yupResolver(createNewTicketSchema),
		reValidateMode: 'onChange',
		shouldFocusError: true,
		defaultValues: {
			ticket_type: '',
			ticket_category: '',
			ticket_priority: '',
			ticket_location: '',
			ticket_description: '',
		},
	})

	const { user } = useAuth()
	const [ticketType, setTicketType] = useState([])
	const [ticketCategory, setTicketCategory] = useState([])
	const [ticketPriority, setTicketPriority] = useState([])
	const [ticketLocation, setTicketLocation] = useState([])

	const getTicketType = async () => {
		try {
			const { data } = await apiClient().get('/ticket-type')
			setTicketType(data.body)
		} catch (err) {}
	}

	useEffect(() => {
		getTicketType()
	}, [])

	const getTicketCategory = async () => {
		try {
			const { data } = await apiClient().get('/ticket-category')

			setTicketCategory(data.body)
		} catch (err) {}
	}

	useEffect(() => {
		getTicketCategory()
	}, [])

	const getTicketPriority = async () => {
		try {
			const { data } = await apiClient().get('/ticket-priority')

			setTicketPriority(data.body)
		} catch (err) {}
	}

	useEffect(() => {
		getTicketPriority()
	}, [])

	const getTicketLocation = async () => {
		try {
			const { data } = await apiClient().get('/ticket-priority')

			setTicketLocation(data.body)
		} catch (err) {}
	}

	useEffect(() => {
		getTicketLocation()
	}, [])

	const Group = (props: any) => (
		<div style={groupStyles}>
			<components.Group {...props} />
		</div>
	)

	const groupStyles = {
		border: '2px dotted red',
		borderRadius: '5px',
		background: '#f2fcff',
	}

	const handleSubmitTicket = async (values: any) => {
		try {
			const newTicket = await apiClient().post(
				'/ticket',
				{
					...values,
				},
				{
					params: {
						userId: user?.userId,
					},
				}
			)

			console.log('newTicket', newTicket)
		} catch (err) {
			console.warn('err', err)
		}
	}

	return (
		<Layout>
			<S.Container>
				<S.Title>Novo Ticket</S.Title>
				<S.Form onSubmit={handleSubmit(handleSubmitTicket)}>
					<S.FormGroup>
						<S.Label htmlFor='ticket_type'>Tipo de Chamado:</S.Label>
						<Controller
							control={control}
							name='ticket_type'
							render={({ field: { onChange } }: any) => {
								return (
									<Select
										placeholder={'<Selecione>'}
										options={ticketType}
										getOptionLabel={(option: ISelect) => option.name}
										getOptionValue={(option: ISelect) => option.id}
										onChange={(v: any) => {
											onChange(v.id)
										}}
									/>
								)
							}}
						/>
						<div>
							{!!errors.ticket_type && (
								<small
									style={{
										display: 'flex',
										alignItems: 'center',
										marginTop: '10px',
										color: 'red',
									}}
								>
									<MdOutlineErrorOutline
										fill='red'
										size={16}
										style={{ marginRight: '3px' }}
									/>
									{errors.ticket_type.message}
								</small>
							)}
						</div>
					</S.FormGroup>
					<S.FormGroup>
						<S.Label htmlFor='ticket_category'>Categoria:</S.Label>

						<Controller
							control={control}
							name='ticket_category'
							render={({ field: { onChange } }: any) => {
								return (
									<Select
										placeholder={'<Selecione>'}
										options={ticketCategory}
										getOptionLabel={(option: ISelect) => option.value}
										getOptionValue={(option: ISelect) => option.id}
										components={{ Group }}
										onChange={(v: any) => {
											onChange(v.id)
										}}
										styles={{
											groupHeading: (base) => ({
												...base,
												flex: '1 1',
												color: 'red',
												margin: 0,
											}),
										}}
									/>
								)
							}}
						/>
						<div>
							{!!errors.ticket_category && (
								<small
									style={{
										display: 'flex',
										alignItems: 'center',
										marginTop: '10px',
										color: 'red',
									}}
								>
									<MdOutlineErrorOutline
										fill='red'
										size={16}
										style={{ marginRight: '3px' }}
									/>
									{errors.ticket_category.message}
								</small>
							)}
						</div>
					</S.FormGroup>
					<S.FormGroup>
						<S.Label htmlFor='ticket_priority'>Prioridade:</S.Label>
						<Controller
							control={control}
							name='ticket_priority'
							render={({ field: { onChange } }: any) => {
								return (
									<Select
										placeholder={'<Selecione>'}
										options={ticketPriority}
										getOptionLabel={(option: ISelect) => option.name}
										getOptionValue={(option: ISelect) => option.id}
										onChange={(v: any) => {
											onChange(v.id)
										}}
									/>
								)
							}}
						/>
						{!!errors.ticket_priority && (
							<small
								style={{
									display: 'flex',
									alignItems: 'center',
									marginTop: '10px',
									color: 'red',
								}}
							>
								<MdOutlineErrorOutline
									fill='red'
									size={16}
									style={{ marginRight: '3px' }}
								/>
								{errors.ticket_priority.message}
							</small>
						)}
					</S.FormGroup>
					<S.FormGroup>
						<S.Label htmlFor='ticket_location'>Localização:</S.Label>
						<Controller
							control={control}
							name='ticket_location'
							render={({ field: { onChange } }: any) => {
								return (
									<Select
										placeholder={'<Selecione>'}
										options={ticketLocation}
										getOptionLabel={(option: ISelect) => option.name}
										getOptionValue={(option: ISelect) => option.id}
										onChange={(v: any) => {
											onChange(v.id)
										}}
									/>
								)
							}}
						/>
						{!!errors.ticket_priority && (
							<small
								style={{
									display: 'flex',
									alignItems: 'center',
									marginTop: '10px',
									color: 'red',
								}}
							>
								<MdOutlineErrorOutline
									fill='red'
									size={16}
									style={{ marginRight: '3px' }}
								/>
								{errors.ticket_priority.message}
							</small>
						)}
					</S.FormGroup>
					<S.FormGroup>
						<S.Label htmlFor='ticket_description'>Descrição:</S.Label>
						<S.TextArea
							className='basic-single'
							{...register('ticket_description')}
						/>
					</S.FormGroup>

					<S.FormGroup>
						<S.Label htmlFor='ticket_type'>Equipamentos:</S.Label>
						<S.Input type='text' id='ticket_type' />
					</S.FormGroup>

					<button type='submit'>Criar Ticket</button>
				</S.Form>
			</S.Container>
		</Layout>
	)
}
