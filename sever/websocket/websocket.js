const url = 'ws://172.21.19.241:4567/'

export function useWebSocket(handleMessage) {
	const init = () => {
		bindEvent()
	}
	const ws = new WebSocket(url)

	function bindEvent() {
		ws.addEventListener('open', handleOpen, false)
		ws.addEventListener('close', handleClose, false)
		ws.addEventListener('error', handleError, false)
		ws.addEventListener('message', handleMessage, false)
	}

	function handleOpen(e) {
		console.log('open', e)
	}

	function handleClose(e) {
		console.log('close', e)
	}

	function handleError(e) {
		console.log('error', e)
	}

	init()
	return ws
}
