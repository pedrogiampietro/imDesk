import { useContext, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useLocalStorage } from '../../hooks/useLocalStorage'
// import { logoSVG } from "../../assets";

import {
	AiOutlineHome,
	AiOutlineLeft,
	AiOutlineSearch,
	AiOutlineSetting,
} from 'react-icons/ai'
import { MdLogout, MdOutlineAnalytics, MdOutlineComputer } from 'react-icons/md'
import { BsPeople } from 'react-icons/bs'

import { ThemeContext } from './../../App'

import * as S from './styles'

export function Sidebar() {
	const searchRef = useRef(null)
	const { signOut } = useAuth()

	const { setTheme, theme } = useContext(ThemeContext)
	const [sidebarOpen, setSidebarOpen] = useLocalStorage(
		'imDesk@Sidebar',
		'open'
	)
	const { pathname } = useLocation()

	const searchClickHandler = () => {
		// if (!sidebarOpen) {
		// 	setSidebarOpen(true)
		// 	// searchRef.current.focus();
		// } else {
		// 	// search functionality
		// }
	}

	const toggleTheme = () => {
		setTheme((p) => (p === 'light' ? 'dark' : 'light'))
	}

	const handleToggleSidebar = () => {
		setSidebarOpen((p: any) => !p)
	}

	const secondaryLinksArray = [
		{
			label: 'Settings',
			icon: <AiOutlineSetting />,
		},
		{
			label: 'Logout',
			icon: <MdLogout />,
			func: signOut,
		},
	]

	return (
		<S.Sidebar isOpen={sidebarOpen}>
			<>
				<S.SidebarButton
					isOpen={sidebarOpen}
					onClick={handleToggleSidebar}
					isActive={theme === 'dark'}
				>
					<AiOutlineLeft />
				</S.SidebarButton>
			</>
			<S.Logo>{/* <img src={logoSVG} alt="logo" /> */}</S.Logo>
			<S.Search
				onClick={searchClickHandler}
				style={!sidebarOpen ? { width: `fit-content` } : {}}
			>
				<S.SearchIcon>
					<AiOutlineSearch />
				</S.SearchIcon>
				<input
					ref={searchRef}
					placeholder='Search'
					style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
				/>
			</S.Search>
			<S.Divider />
			{linksArray.map(({ icon, label, notification, to }) => (
				<S.LinkContainer key={label} isActive={pathname === to}>
					<S.LinkStyle
						to={to}
						style={!sidebarOpen ? { width: `fit-content` } : {}}
					>
						<S.LinkIcon isActive={theme === 'dark'}>{icon}</S.LinkIcon>
						{sidebarOpen && (
							<>
								<S.LinkLabel isActive={theme === 'dark'}>{label}</S.LinkLabel>
								{/* if notifications are at 0 or null, do not display */}
								{!!notification && (
									<S.LinkNotification>{notification}</S.LinkNotification>
								)}
							</>
						)}
					</S.LinkStyle>
				</S.LinkContainer>
			))}
			<S.Divider />
			{secondaryLinksArray.map(({ icon, label, func }) => (
				<S.LinkContainer key={label}>
					<S.LinkStyle
						to='#'
						style={!sidebarOpen ? { width: `fit-content` } : {}}
						onClick={func}
					>
						<S.LinkIcon isActive={theme === 'dark'}>{icon}</S.LinkIcon>
						{sidebarOpen && (
							<S.LinkLabel isActive={theme === 'dark'}>{label}</S.LinkLabel>
						)}
					</S.LinkStyle>
				</S.LinkContainer>
			))}
			<S.Divider />
			<S.Theme>
				{sidebarOpen && <S.ThemeLabel>Dark Mode</S.ThemeLabel>}
				<S.ThemeToggler isActive={theme === 'dark'} onClick={toggleTheme}>
					<S.ToggleThumb style={theme === 'dark' ? { right: '1px' } : {}} />
				</S.ThemeToggler>
			</S.Theme>
		</S.Sidebar>
	)
}

const linksArray = [
	{
		label: 'Inicio',
		icon: <AiOutlineHome />,
		to: '/dashboard',
		notification: 0,
	},
	{
		label: 'Estatisticas',
		icon: <MdOutlineAnalytics />,
		to: '/statistics',
		notification: 0,
	},
	{
		label: 'Manutenção',
		icon: <MdOutlineComputer />,
		to: '/maintenance',
		notification: 0,
	},
	{
		label: 'Tickets',
		icon: <BsPeople />,
		to: '/tickets',
		notification: 0,
	},
]
