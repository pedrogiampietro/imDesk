import styled from 'styled-components'

export const ModalWrapper = styled.div`
	background: rgba(242, 243, 245, 0.8);
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;

	@media screen and (max-width: 698px) {
		display: block;
		width: calc(100% - 3.125rem);
		overflow-y: auto;
		overflow-x: hidden;
		left: 3.125rem;
		overscroll-behavior: contain;
	}
`

export const ModalContainer = styled.div`
	background: #fff;
	width: 100%;
	max-width: 752px;
	padding: 2rem 3rem;
	border-radius: 5px;
	box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
	position: relative;
	@media screen and (max-width: 968px) {
		width: 70%;
	}
	@media screen and (max-width: 698px) {
		width: 100%;
	}
`

export const ModalHeader = styled.header`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 100%;
	font-size: 1rem;
	font-weight: 600;
	color: #333;
	@media screen and (max-width: 698px) {
		font-size: 0.9rem;
	}
`

export const StartPreventiveButton = styled.button<{ isActive: boolean }>`
	background: ${({ theme, isActive }) =>
		!isActive ? theme.bg3 : theme.primary};
	border: 1px solid #000;
	border-radius: 10px;
	outline: none;
	font-family: Poppins;
	font-weight: 700;
	text-transform: uppercase;
	color: ${({ isActive }) => (isActive ? '#FFF' : '#000')};
	padding: 0.3rem 1rem;
	cursor: pointer;
	font-size: 0.7rem;
	display: flex;
	justify-content: center;
	align-items: center;

	margin-top: 1rem;

	&:hover {
		opacity: 0.8;
		transition: 0.4s ease;
	}
	& svg {
		margin-left: 0.4rem;
	}
`

export const ModalBody = styled.div`
	margin-top: 3rem;

	& div {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-top: 0.6rem;

		& span {
			font-size: 13px;
		}
	}

	& textarea {
		width: 100%;
		height: 120px;
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
	}
`

export const SaveButton = styled.button`
	width: 100%;
	height: 50px;
	text-transform: uppercase;
	padding: 0.7rem 2rem;
	background: #047c19;
	color: white;
	border-radius: 8px;
	outline: none;
	border: 0px;
	font-family: Poppins;
	font-weight: bold;
	font-size: 1.1rem;

	&:hover {
		opacity: 0.8;
		cursor: pointer;
		transition: 0.4s ease;
	}

	@media screen and (max-width: 698px) {
		max-width: 100%;
	}
`

export const EditorBox = styled.section`
	width: 100%;
	margin-bottom: 1.2rem;
`

export const CloseButtonModal = styled.button`
	position: absolute;
	right: 0.5rem;
	top: 0.5rem;
	background: transparent;
	border: 0;
	font-size: 0;
	cursor: pointer;
`

export const Input = styled.input`
	font-size: 16px;
	line-height: 28px;
	padding: 8px 16px;
	width: 100%;
	min-height: 44px;
	border: unset;
	border-radius: 4px;
	outline-color: rgb(84 105 212 / 0.5);
	background-color: rgb(255, 255, 255);
	box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
		rgba(0, 0, 0, 0) 0px 0px 0px 0px;
`

export const Label = styled.label`
	font-size: 14px;
	font-weight: 600;
	display: block;
`
