import { useState, useEffect, createContext } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './assets/styles/globalStyles'
import { darkTheme, lightTheme } from './assets/styles/theme'

import { AuthRoutes } from './authRoutes'
import { useLocalStorage } from './hooks/useLocalStorage'

interface IContextData {
	theme: string
	setTheme: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeContext = createContext({} as IContextData)

export function App() {
	const [theme, setTheme] = useLocalStorage('imDesk@CurrentTheme', 'light')
	const themeStyle = theme === 'light' ? lightTheme : darkTheme

	return (
		<ThemeContext.Provider value={{ setTheme, theme } as any}>
			<ThemeProvider theme={themeStyle}>
				<GlobalStyle />

				<AuthRoutes />
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}
