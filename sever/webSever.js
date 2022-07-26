const http = require("http");
const server = http.createServer()
server.on("request", (req, res) => {
    res.end("Hello World!")
    const url=req.url
    const method=req.method
    console.log(url,method)

})
server.listen(9999  , () => {
    console.log("Server is running on port http://127.0.0.1:9999")
})
