/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'

interface PropsI {
	children: ReactNode
}

export default function RouteProtector(props: PropsI) {
	const { isAuthenticated } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login')
		}
	})

	return <>{isAuthenticated ? props.children : null}</>
}
