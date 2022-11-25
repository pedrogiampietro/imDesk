import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

import './styles.css'
export function Login() {
	const { signIn, isAuthenticated } = useAuth()
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSignIn = async () => {
		const data = {
			email,
			password,
		}

		try {
			await signIn(data)
		} catch {
			return
		}
	}

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard')
		}
	})

	return (
		<div className='login-root'>
			<div
				className='box-root flex-flex flex-direction--column'
				style={{ minHeight: '100vh', flexGrow: 1 }}
			>
				<div className='loginbackground box-background--white padding-top--64'>
					<div className='loginbackground-gridContainer'>
						<div
							className='box-root flex-flex'
							style={{ gridArea: 'top / start / 8 / end' }}
						>
							<div
								className='box-root'
								style={{
									backgroundImage:
										'linear-gradient(white 0%, rgb(247, 250, 252) 33%)',
									flexGrow: 1,
								}}
							></div>
						</div>
						<div
							className='box-root flex-flex'
							style={{ gridArea: '4 / 2 / auto / 5' }}
						>
							<div
								className='box-root box-divider--light-all-2 animationLeftRight tans3s'
								style={{ flexGrow: 1 }}
							/>
						</div>
						<div
							className='box-root flex-flex'
							style={{ gridArea: '6 / start / auto / 2' }}
						>
							<div
								className='box-root box-background--blue800'
								style={{ flexGrow: 1 }}
							/>
						</div>
						<div
							className='box-root flex-flex'
							style={{ gridArea: '7 / start / auto / 4' }}
						>
							<div
								className='box-root box-background--blue animationLeftRight'
								style={{ flexGrow: 1 }}
							/>
						</div>
						<div
							className='box-root flex-flex'
							style={{ gridArea: '8 / 4 / auto / 6' }}
						>
							<div
								className='box-root box-background--gray100 animationLeftRight tans3s'
								style={{ flexGrow: 1 }}
							/>
						</div>
						<div
							className='box-root flex-flex'
							style={{ gridArea: '2 / 15 / auto / end' }}
						>
							<div
								className='box-root box-background--cyan200 animationRightLeft tans4s'
								style={{ flexGrow: 1 }}
							/>
						</div>
						<div
							className='box-root flex-flex'
							style={{ gridArea: '3 / 14 / auto / end' }}
						>
							<div
								className='box-root box-background--blue animationRightLeft'
								style={{ flexGrow: 1 }}
							/>
						</div>
						<div
							className='box-root flex-flex'
							style={{ gridArea: '4 / 17 / auto / 20' }}
						>
							<div
								className='box-root box-background--gray100 animationRightLeft tans4s'
								style={{ flexGrow: 1 }}
							/>
						</div>
						<div
							className='box-root flex-flex'
							style={{ gridArea: '5 / 14 / auto / 17' }}
						>
							<div
								className='box-root box-divider--light-all-2 animationRightLeft tans3s'
								style={{ flexGrow: 1 }}
							/>
						</div>
					</div>
				</div>
				<div
					className='box-root padding-top--24 flex-flex flex-direction--column'
					style={{ flexGrow: 1, zIndex: 9 }}
				>
					<div className='box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center'>
						<h1>
							<a href='#'>Login</a>
						</h1>
					</div>
					<div className='formbg-outer'>
						<div className='formbg'>
							<div className='formbg-inner padding-horizontal--48'>
								<span className='padding-bottom--15'>Faça login :)</span>
								<form>
									<div className='field padding-bottom--24'>
										<label htmlFor='email'>Email</label>
										<input
											type='email'
											placeholder='Email'
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
									<div className='field padding-bottom--24'>
										<div className='grid--50-50'>
											<label htmlFor='password'>Password</label>
											<div className='reset-pass'>
												<a href='#'>Esqueceu sua senha?</a>
											</div>
										</div>
										<input
											type='password'
											placeholder='Password'
											onChange={(e) => setPassword(e.target.value)}
										/>
									</div>
									<div className='field field-checkbox padding-bottom--24 flex-flex align-center'>
										<label htmlFor='checkbox'>
											<input type='checkbox' name='checkbox' /> Manter logado no
											sistema
										</label>
									</div>
									<div className='field padding-bottom--24'>
										<input
											type='button'
											onClick={() => handleSignIn()}
											defaultValue='Entrar'
										/>
									</div>
								</form>
							</div>
						</div>
						<div className='footer-link padding-top--24'>
							<div className='listing padding-top--24 padding-bottom--24 flex-flex center-center'>
								<span>
									<a href='#'>© ImDesk 2022</a>
								</span>
								<span>
									<a href='#'>Contato</a>
								</span>
								<span>
									<a href='#'>Privacy &amp; terms</a>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
