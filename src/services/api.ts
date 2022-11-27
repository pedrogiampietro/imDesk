import axios from 'axios'
import { auth } from '../constants/auth'
import { getStorageModel, removeStorage } from '../utils/storage'

// import Swal from 'sweetalert2';

let isRefreshing = false
let failedRequestQueue = []

const limit = 20

export function apiClient() {
	const token = getStorageModel(auth.TOKEN)

	const api = axios.create({
		baseURL: 'http://localhost:3333/',
		headers: {
			Authorization: `Bearer ${token}`,
			ContentType: 'application/json',
			Accept: 'application/json',
		},
	})

	api.interceptors.request.use(
		(request: any) => {
			if (request.method?.toLowerCase() === 'get') {
				request.headers.limit = request.headers.limit ?? String(limit)
			}

			return request
		},
		(error) => Promise.reject(error)
	)

	api.interceptors.response.use(
		(response) => {
			return response
		},

		(error) => {
			// console.log('error:', error.response);

			//TODO

			return Promise.reject(error)
		}
	)

	return api
}
