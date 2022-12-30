import styled from 'styled-components'

export const Container = styled.div`
	width: 100%;
	height: 100%;
`

export const Title = styled.h1``

export const TicketsWrapper = styled.div`
	display: flex;
	margin: 0 auto;
	margin-top: 100px;
	border-radius: 10px;
`

export const CreateWrapper = styled.div``

export const CreateButton = styled.button<{ isActive: boolean }>`
	width: 55px;
	height: 55px;
	border-radius: 50%;
	background-color: ${({ isActive }) =>
		isActive ? '#5469d4' : 'hsla(0, 0%, 90%, 1)'};
	position: fixed;
	bottom: 30px;
	right: 30px;
	box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
	cursor: pointer;

	&:hover {
		filter: opacity(0.6);
	}

	&:active {
		border-bottom-width: 0.1rem;
		border-top-width: 0.5rem;
	}
`
