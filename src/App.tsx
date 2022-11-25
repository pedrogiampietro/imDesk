import { useState, useEffect, createContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './assets/styles/globalStyles'
import { darkTheme, lightTheme } from './assets/styles/theme'

import { AuthContextProvider } from './contexts/AuthContext'

import { AuthRoutes } from './authRoutes'
import { useLocalStorage } from './hooks/useLocalStorage'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface IContextData {
	theme: string
	setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = createContext({} as IContextData)

export function App() {
	const [theme, setTheme] = useLocalStorage('imDesk@CurrentTheme', 'light')
	const themeStyle = theme === 'light' ? lightTheme : darkTheme

	return (
		<AuthContextProvider>
			<ThemeContext.Provider value={{ setTheme, theme } as any}>
				<ThemeProvider theme={themeStyle}>
					<GlobalStyle />

					<AuthRoutes />
					<ToastContainer />
				</ThemeProvider>
			</ThemeContext.Provider>
		</AuthContextProvider>
	)
}
