import { Sidebar } from '../Sidebar/'
import * as S from './styles'

export function Layout({ children }: any) {
	return (
		<S.Layout>
			<Sidebar />
			<S.Main>{children}</S.Main>
		</S.Layout>
	)
}
