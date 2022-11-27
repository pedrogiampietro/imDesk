import styled from 'styled-components'

export const Form = styled.form`
	width: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

export const FormGroup = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-bottom: 1rem;
`

export const Label = styled.label<{ isActive: boolean }>`
	color: ${({ theme, isActive }) => (!isActive ? '#000' : '#fff')};
`

export const Input = styled.input``

export const TextArea = styled.textarea`
	width: 100%;
	height: 60px;
	overflow-y: auto;
	resize: none;
	outline: none;
	font-family: Poppins;
	font-weight: 500;
	color: #333;
	border: 1px solid hsl(0, 0%, 80%);
	border-bottom: 1px dashed #5c5c5c;
	padding: 0 0 0.2rem 0;
	background-color: rgb(230, 230, 230);
	margin: 0 0 1.2rem 0;
`

export const CreateTicketButton = styled.button<{ isActive: boolean }>`
	background: ${({ theme, isActive }) =>
		!isActive ? theme.bg3 : theme.primary};
	border: 1px solid #000;
	border-radius: 10px;
	outline: none;
	font-family: Poppins;
	font-weight: 700;
	text-transform: uppercase;
	color: ${({ isActive }) => (isActive ? '#FFF' : '#000')};
	padding: 1rem 3rem;
	cursor: pointer;
	font-size: 0.7rem;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		opacity: 0.8;
		transition: 0.4s ease;
	}
	& svg {
		margin-left: 0.4rem;
	}
`
