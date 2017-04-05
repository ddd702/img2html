const Utils = require('./utils')
const Canvas = require('canvas')
const fs = require('fs')
const path = require('path')
const fontSize=10
const Image = Canvas.Image
let args = process.argv;
let picName=args[2]?args[2]:'pic.jpg'
let imgText=args[3]?args[3]:'爱'
fs.readFile(__dirname + '/'+picName, (err, data) => {
    if (err) throw err
    let img = new Image()
    img.src = data
    let canvas = new Canvas(img.width/fontSize, img.height/fontSize)
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width/fontSize, img.height/fontSize)
    let pix = ctx.getImageData(0, 0, img.width, img.height).data
    let pixArr = [];
    let htmlStr = `
<html>
<head>
    <meta charset="utf-8">
    <title>img2html by ddd</title>
    <style type="text/css">
        body {
            margin: 0px; padding: 0px; line-height:100%; letter-spacing:0px; text-align: center;
            min-width: 1920px;
            font-size: ${fontSize}px;
            background-color: #000000;
        }
    </style>
</head>
<body>
<div>`;
    for (var i = 0; i < pix.length; i += 4) {
        pixArr.push({ r: pix[i], g: pix[i + 1], b: pix[i + 2], a: pix[i + 3] })
    }
    pixArr.forEach(function(el, index) {
    	  var color=Utils.rgbToHex(el.r,el.g,el.b)
        htmlStr += '<font color="#' + color+ '">'+imgText+'</font>'
        if ((index + 1) % (canvas.width)===0) { 
        	htmlStr += '<br/>' 
        }
    })
    htmlStr+='</body></html>'
    Utils.writeFile(path.resolve(__dirname,picName+'.html'),htmlStr)
})
