const WebSocket = require('ws')

;((ws) => {
	const server = new ws.Server({port: 4567})
	const init = () => {
		bindEvent()
	}

	function bindEvent() {
		server.on('open', handleOpen)
		server.on('connection', handleConnection)
		server.on('close', handleClose)
		server.on('error', handleError)
	}

	const handleOpen = () => {
		console.log('server is open')
	}

	function handleConnection(ws) {
		console.log('我是分割线', ws)
		ws.on('message', handleMessage)
	}

	function handleMessage(msg) {
		server.clients.forEach((client) => {
			client.send(msg.toString())
		})
	}

	function handleClose() {
		console.log('server is close')
	}

	function handleError(error) {
		console.log(error)
	}

	init()
})(WebSocket)
