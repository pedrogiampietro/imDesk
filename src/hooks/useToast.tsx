import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface NotifyArgsI {
	type: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO'
	message: string
}

export const useToast = () => {
	const notify = (args: NotifyArgsI) => {
		switch (args.type) {
			case 'SUCCESS':
				return toast.success(args.message)
			case 'WARNING':
				return toast.warn(args.message)
			case 'ERROR':
				return toast.error(args.message)
			case 'INFO':
				return toast.info(args.message)
			default:
				return toast.info(args.message)
		}
	}

	return {
		notify,
	}
}
