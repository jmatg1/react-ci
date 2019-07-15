import express from 'express'
import corsPrefetch from 'cors-prefetch-middleware'
import imagesUpload from 'images-upload-middleware'
import path from 'path'
const app = express()

const publicPath = path.join(__dirname, 'public')
console.log(publicPath)

app.use('/public', express.static(__dirname + '/public'))

app.use(corsPrefetch)

app.post('/multiple', imagesUpload(
  publicPath,
  'http://localhost:9090/public',
  true
))

app.post('/notmultiple', imagesUpload(
  publicPath,
  'http://localhost:9090/public'
))

app.listen(9090, () => {
  console.log('Listen: 9090')
})
