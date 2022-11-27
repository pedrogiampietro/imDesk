import { useState, useEffect } from 'react'

import { useContext } from 'react'
import { Layout } from '../../components/Layout'
import { ThemeContext } from './../../App'
import { Table } from '../../components/TicketsTable/'
import { TicketsModal } from '../../components/TicketsModal'

import * as S from './styles'
import { apiClient } from '../../services/api'

export function Ticket() {
	const { theme } = useContext(ThemeContext)
	const [tickets, setTickets] = useState([])
	const [showTicketModal, setShowTicketModal] = useState<boolean>(true)

	const fetchTickets = async () => {
		try {
			const { data } = await apiClient().get('/ticket')
			setTickets(data.body)
		} catch (err) {}
	}

	useEffect(() => {
		fetchTickets()
	}, [])

	return (
		<Layout>
			<S.Container>
				<S.Title>Novo Ticket</S.Title>

				<S.TicketsWrapper>
					<Table data={tickets} />
				</S.TicketsWrapper>

				{showTicketModal && <TicketsModal onClose={setShowTicketModal} />}
			</S.Container>
		</Layout>
	)
}
