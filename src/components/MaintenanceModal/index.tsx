import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './../../App'
import { apiClient } from '../../services/api'

import { formatDate } from '../../utils/dateTime'
import { FiX } from 'react-icons/fi'

import { CreateModal } from './CreateModal'
import { toast } from 'react-toastify'

import * as S from './styles'

type MaintenanceModalProps = {
	onClose: React.Dispatch<React.SetStateAction<boolean>>
	maintenance: any
	addMaintenanceModal: boolean
	setAddMaintenanceModal: any
	onRefresh: any
}

export function MaintenanceModal({
	onClose,
	maintenance,
	addMaintenanceModal,
	setAddMaintenanceModal,
	onRefresh,
}: MaintenanceModalProps) {
	const { theme } = useContext(ThemeContext)
	const [loading, setLoading] = useState<boolean>(false)
	const [text, setText] = useState<string>('')
	const [startPreventive, setStartPreventive] = useState<boolean>(false)
	const [name, setName] = useState<string>('')
	const [location, setLocation] = useState<string>('')
	const [serialNumber, setSerialNumber] = useState<string>('')
	const [patrimony, setPatrimony] = useState<string>('')
	const [model, setModel] = useState<string>('')
	const [nextDatePreventive, setNextDatePreventive] = useState<Date>(new Date())

	const handleNewPreventive = async () => {
		setLoading(true)
		try {
			await apiClient().patch('/maintenance', {
				id: maintenance.id,
				description: text,
			})

			toast.success('Sucesso! Sua preventiva foi finalizada! 🚀', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})

			setLoading(false)
			onRefresh()

			const timeOutCloseModal = setTimeout(() => {
				onClose(false)
			}, 1000)

			return () => clearTimeout(timeOutCloseModal)
		} catch (err) {
			setLoading(false)
			console.warn('err', err)
		}
	}

	const handleCreateMaintenance = async () => {
		setLoading(true)
		const serealizedDate = nextDatePreventive.toISOString()

		if (
			!name ||
			!location ||
			!serialNumber ||
			!patrimony ||
			!model ||
			serealizedDate
		) {
			console.log('todos os campos precisam ser preenchidos')
		}

		try {
			await apiClient().post('/maintenance', {
				name,
				location,
				serialNumber,
				patrimony,
				model,
				nextDatePreventive: serealizedDate,
			})

			toast.success(
				'Sucesso! Seu equipamento foi adicionado para Manutenção 🔧',
				{
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			)

			setLoading(false)
			setAddMaintenanceModal(false)
			onRefresh()

			const timeOutCloseModal = setTimeout(() => {
				onClose(false)
			}, 1000)

			return () => clearTimeout(timeOutCloseModal)
		} catch (err) {
			setLoading(false)
			console.warn('err', err)
		}
	}

	return (
		<S.ModalWrapper>
			<S.ModalContainer>
				{!addMaintenanceModal ? (
					<>
						<S.ModalHeader>
							<h1>Equipamento #{maintenance.name}</h1>
							<div>
								<S.StartPreventiveButton
									isActive={theme === 'dark'}
									onClick={() => setStartPreventive(!startPreventive)}
								>
									{startPreventive
										? 'Cancelar preventiva'
										: 'Realizar preventiva'}
								</S.StartPreventiveButton>
							</div>
						</S.ModalHeader>

						<S.ModalBody>
							<S.InformationsWrapper>
								<div className='row'>
									<div>
										<h1>Name:</h1>
										<span>{maintenance.name}</span>
									</div>

									<div>
										<h1>Modelo:</h1>
										<span>{maintenance.model}</span>
									</div>
									<div>
										<h1>Patrimônio:</h1>
										<span>{maintenance.patrimony}</span>
									</div>
								</div>

								<div className='row'>
									<div>
										<h1>Número de série:</h1>
										<span>{maintenance.serialNumber}</span>
									</div>
									<div>
										<h1>Próxima preventiva:</h1>
										<span>{formatDate(maintenance.nextDatePreventive)}</span>
									</div>
								</div>

								<div className='row'>
									<div>
										<h1>Quantidade de Preventivas realizadas:</h1>
										<span>{maintenance.preventiveCount}</span>
									</div>
									<div>
										<h1>Quantidade de Corretivas realizadas:</h1>
										<span>{maintenance.correctiveCount}</span>
									</div>
								</div>
							</S.InformationsWrapper>

							<S.HistoryPreventive>
								<h1>Historico de Preventivas</h1>
							</S.HistoryPreventive>

							{startPreventive ? (
								<>
									<textarea
										value={text}
										onChange={(e) => setText(e.target.value)}
									/>

									<S.TodooList>
										<legend>Lista de Manutenção:</legend>
										{maintenance.maintenanceListTodoo.map((listTodoo: any) => {
											return (
												<div key={listTodoo.id}>
													<input
														type='checkbox'
														id={listTodoo.id}
														name={listTodoo.id}
													/>
													<label htmlFor={listTodoo.id}>{listTodoo.name}</label>
												</div>
											)
										})}
									</S.TodooList>

									<S.SaveButton
										disabled={loading}
										onClick={() => handleNewPreventive()}
									>
										Salvar Alterações
									</S.SaveButton>
								</>
							) : null}
						</S.ModalBody>
					</>
				) : (
					<CreateModal
						handleCreateMaintenance={handleCreateMaintenance}
						loading={loading}
						setName={setName}
						setLocation={setLocation}
						setSerialNumber={setSerialNumber}
						setPatrimony={setPatrimony}
						setModel={setModel}
						nextDatePreventive={nextDatePreventive}
						setNextDatePreventive={setNextDatePreventive}
					/>
				)}

				<S.CloseButtonModal
					type='button'
					onClick={() => {
						setAddMaintenanceModal(false)
						onClose(false)
					}}
				>
					<FiX size='22' />
				</S.CloseButtonModal>
			</S.ModalContainer>
		</S.ModalWrapper>
	)
}
