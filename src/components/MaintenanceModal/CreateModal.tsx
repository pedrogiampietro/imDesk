import React, { useState } from 'react'
import CustomDatePicker from '../CustomDatePicker'

import * as S from './styles'

type CreatProps = {
	handleCreateMaintenance: () => void
	loading: boolean
	setName: React.Dispatch<React.SetStateAction<string>>
	setLocation: React.Dispatch<React.SetStateAction<string>>
	setSerialNumber: React.Dispatch<React.SetStateAction<string>>
	setPatrimony: React.Dispatch<React.SetStateAction<string>>
	setModel: React.Dispatch<React.SetStateAction<string>>
	nextDatePreventive: Date
	setNextDatePreventive: React.Dispatch<React.SetStateAction<Date>>
}

export function CreateModal({
	handleCreateMaintenance,
	loading,
	setName,
	setLocation,
	setSerialNumber,
	setPatrimony,
	setModel,
	nextDatePreventive,
	setNextDatePreventive,
}: CreatProps) {
	return (
		<>
			<h1 style={{ marginBottom: '1rem' }}>Adicionar novo equipamento</h1>
			<S.FormGroup>
				<S.Label htmlFor='name'>Nome</S.Label>
				<S.Input
					type='text'
					name='name'
					id='name'
					placeholder='Nome do equipamento'
					onChange={(e) => setName(e.target.value)}
				/>
			</S.FormGroup>
			<S.FormGroup>
				<S.Label htmlFor='location'>Localização</S.Label>
				<S.Input
					type='text'
					name='location'
					id='location'
					placeholder='Localização do equipamento'
					onChange={(e) => setLocation(e.target.value)}
				/>
			</S.FormGroup>
			<S.FormGroup>
				<S.Label htmlFor='serialNumber'>Número de série</S.Label>
				<S.Input
					type='text'
					name='serialNumber'
					id='serialNumber'
					placeholder='Número de série'
					onChange={(e) => setSerialNumber(e.target.value)}
				/>
			</S.FormGroup>
			<S.FormGroup>
				<S.Label htmlFor='patrimony'>Patrimônio</S.Label>
				<S.Input
					type='text'
					name='patrimony'
					id='patrimony'
					placeholder='Patrimônio'
					onChange={(e) => setPatrimony(e.target.value)}
				/>
			</S.FormGroup>
			<S.FormGroup>
				<S.Label htmlFor='model'>Modelo</S.Label>
				<S.Input
					type='text'
					name='model'
					id='model'
					placeholder='Modelo'
					onChange={(e) => setModel(e.target.value)}
				/>
			</S.FormGroup>

			<S.FormGroup>
				<S.Label htmlFor='nextDatePreventive'>Próxima preventiva</S.Label>

				<CustomDatePicker
					name='nextDatePreventive'
					wrapperClassName='datepicker'
					className='form-control'
					dateFormat='dd/MM/yyyy'
					selected={nextDatePreventive}
					onChangeEvent={(date: any) => {
						setNextDatePreventive(date != null ? date : null)
					}}
				/>
			</S.FormGroup>

			<div style={{ marginTop: '2rem' }}>
				<S.SaveButton
					disabled={loading}
					onClick={() => handleCreateMaintenance()}
				>
					Incluir Equipamento
				</S.SaveButton>
			</div>
		</>
	)
}
