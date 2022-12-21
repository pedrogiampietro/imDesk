import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './../../App'
import { apiClient } from '../../services/api'

import { formatDate } from '../../utils/dateTime'
import { FiX } from 'react-icons/fi'

import * as S from './styles'

type MaintenanceModalProps = {
	onClose: React.Dispatch<React.SetStateAction<boolean>>
	maintenance: any
}

export function MaintenanceModal({
	onClose,
	maintenance,
}: MaintenanceModalProps) {
	const { theme } = useContext(ThemeContext)
	const [loading, setLoading] = useState(false)
	const [text, setText] = useState('')
	const [startPreventive, setStartPreventive] = useState<boolean>(false)

	const handleSubmit = async () => {
		setLoading(true)
		try {
			const updateMaintence = await apiClient().patch('/maintenance', {
				id: maintenance.id,
				description: text,
			})

			setLoading(false)
			console.log('updateMaintence', updateMaintence)
		} catch (err) {
			setLoading(false)
			console.warn('err', err)
		}
	}

	return (
		<S.ModalWrapper>
			<S.ModalContainer>
				<S.ModalHeader>
					<h1>Equipamento #{maintenance.name}</h1>
					<div>
						<S.StartPreventiveButton
							isActive={theme === 'dark'}
							onClick={() => setStartPreventive(!startPreventive)}
						>
							{startPreventive ? 'Cancelar preventiva' : 'Realizar preventiva'}
						</S.StartPreventiveButton>
					</div>
				</S.ModalHeader>

				<S.ModalBody>
					<div>
						<h1>Name:</h1>
						<span>{maintenance.name}</span>
					</div>
					<div>
						<h1>Localização:</h1>
						<span>{maintenance.location}</span>
					</div>
					<div>
						<h1>Modelo:</h1>
						<span>{maintenance.model}</span>
					</div>
					<div>
						<h1>Patrimônio:</h1>
						<span>{maintenance.patrimony}</span>
					</div>
					<div>
						<h1>Número de série:</h1>
						<span>{maintenance.serialNumber}</span>
					</div>
					<div>
						<h1>Próxima preventiva:</h1>
						<span>{formatDate(maintenance.nextDatePreventive)}</span>
					</div>
					<div>
						<h1>Quantidade de Preventivas realizadas:</h1>
						<span>{maintenance.preventiveCount}</span>
					</div>
					<div>
						<h1>Quantidade de Corretivas realizadas:</h1>
						<span>{maintenance.correctiveCount}</span>
					</div>

					{startPreventive ? (
						<>
							<textarea
								value={text}
								onChange={(e) => setText(e.target.value)}
							/>
							<S.SaveButton disabled={loading} onClick={() => handleSubmit()}>
								Salvar Alterações
							</S.SaveButton>
						</>
					) : null}
				</S.ModalBody>

				<S.CloseButtonModal type='button' onClick={() => onClose(false)}>
					<FiX size='22' />
				</S.CloseButtonModal>
			</S.ModalContainer>
		</S.ModalWrapper>
	)
}
