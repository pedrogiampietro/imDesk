import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './../../App'
import { Layout } from '../../components/Layout'
import { MaintenanceTable } from '../../components/MaintenanceTable'
import { MaintenanceModal } from '../../components/MaintenanceModal'
import { MdOutlineAdd } from 'react-icons/md'

import * as S from './styles'
import { apiClient } from '../../services/api'

export function Maintenance() {
	const { theme } = useContext(ThemeContext)
	const [listMaintenance, setListMaintenance] = useState<any>([])
	const [maintenance, setMaintenance] = useState<any>({})
	const [showMaintenanceModal, setShowMaintenanceModal] =
		useState<boolean>(false)
	const [addMaintenanceModal, setAddMaintenanceModal] = useState<boolean>(false)

	const fetchMaintenances = async () => {
		try {
			const { data } = await apiClient().get('/maintenance')
			setListMaintenance(data.body)
		} catch (err) {}
	}

	useEffect(() => {
		fetchMaintenances()
	}, [])

	return (
		<Layout>
			<S.Container>
				<S.Title>Manutenção Preventiva/Corretiva</S.Title>

				<S.CreateWrapper>
					<S.CreateButton
						isActive={theme === 'dark'}
						onClick={() => {
							setShowMaintenanceModal(true)
							setAddMaintenanceModal(true)
						}}
					>
						<MdOutlineAdd size={22} />
					</S.CreateButton>
				</S.CreateWrapper>

				<S.TicketsWrapper>
					<MaintenanceTable
						data={listMaintenance}
						setShowMaintenanceModal={setShowMaintenanceModal}
						setMaintenance={setMaintenance}
					/>
				</S.TicketsWrapper>

				{showMaintenanceModal && (
					<MaintenanceModal
						onClose={setShowMaintenanceModal}
						maintenance={maintenance}
						addMaintenanceModal={addMaintenanceModal}
						setAddMaintenanceModal={setAddMaintenanceModal}
						onRefresh={fetchMaintenances}
					/>
				)}
			</S.Container>
		</Layout>
	)
}
