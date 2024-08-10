'use strict'

function renderMeme() {
    const meme = getMeme()
    const currImg = drawImg(meme.selectedImgId)


    renderImg(currImg)
}

function drawImg(imgId) {
    const img = gImgs.find(img => img.id === imgId)

    return img
}

function renderText() {
    const meme = getMeme()

    meme.lines.forEach((line) => {
        gCtx.lineWidth = line.width
        gCtx.strokeStyle = line.strokeClr
        gCtx.fillStyle = line.fillClr
        gCtx.font = `${line.size}px ${line.font}`

        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
        if (line.isSelected) renderFrame()
    })
}

function renderImg(img) {
    const elImg = new Image()
    elImg.src = img.url

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, elImg.width, elImg.height)

        renderText()
    }
}

function onSelectedStrokeClr() {
    const colorValue = document.querySelector('#strokeColor').value
    selectedStrokeColor(colorValue)
    renderMeme()
}

function onSelectedFillClr() {
    const colorValue = document.querySelector('#fillClr').value
    selectedFillColor(colorValue)
    renderMeme()
}


function onSetLineText() {
    const { selectedLineIdx } = gMeme
    const elText = document.querySelector('#text')
    setLineTxt(elText.value, selectedLineIdx)
    renderMeme()
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onAddLine() {
    const { selectedLineIdx, lines } = gMeme
    const elText = document.querySelector('#text')

    if (lines.length === 2) return

    lines.push({
        id: 1,
        txt: '',
        size: 40,
        width: 2,
        strokeClr: '#000000',
        fillClr: '#ffffff',
        x: 175,
        y: 450,
        isSelected: true,
        font: 'Arial'
    })

    gMeme.selectedLineIdx = 1
    elText.value = ''

    addLine()
    renderMeme()
}

function onSwitchLine() {
    const elText = document.querySelector('#text')
    switchLine()
    const { selectedLineIdx, lines } = gMeme
    let currText = lines[selectedLineIdx].txt
    elText.value = currText

    renderMeme()
}

function renderFrame() {
    const { selectedLineIdx, lines } = gMeme
    const { startPosX, startPosY, textHeight, textWidth, txt } = getTextDimensions(lines[selectedLineIdx])
    if (txt === '') return

    gCtx.strokeStyle = 'white'
    gCtx.strokeRect(startPosX, startPosY - textHeight, textWidth, textHeight + 10)

}

function onClickedLine(ev) {
    const { lines } = gMeme
    lines.forEach(line => { line.isSelected = false })

    let clickedLineIdx = checkIsClicked(ev)
    if (clickedLineIdx === undefined) return

    lines[clickedLineIdx].isSelected = true
    renderIsClickedLine(clickedLineIdx)
    renderMeme()
}

function renderIsClickedLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
    const { lines } = gMeme
    const { txt, strokeClr, fillClr, font, size } = lines[lineIdx]
    const elText = document.querySelector('#text')
    const fillColorValue = document.querySelector('#fillClr')
    const strokeColorValue = document.querySelector('#strokeColor')
    const fontSelected = document.querySelector('#font-family')
    const fontSizeSelected = document.querySelector('#font-size')

    elText.value = txt
    fillColorValue.value = fillClr
    strokeColorValue.value = strokeClr
    fontSelected.value = font
    fontSizeSelected.value = size
}

function onFontSelector() {
    const fontSelected = document.querySelector('#font-family').value
    fontSelector(fontSelected)
    renderMeme()
}

function onFontSizeSelector() {
    const fontSizeSelected = document.querySelector('#font-size').value
    fontSizeSelector(fontSizeSelected)
    renderMeme()
}

function onSetAlignment(selectedAlignment) {
    const { selectedLineIdx, lines } = gMeme
    const currLine = lines[selectedLineIdx]
    const textWidth = gCtx.measureText(currLine.txt).width

    let position

    if (selectedAlignment === 'left') {
        position = 10
        setAlignment(position)
        renderMeme()
        return
    }
    if (selectedAlignment === 'center') {
        position = (gElCanvas.width / 2) - (textWidth / 2)
        setAlignment(position)
        renderMeme()
        return
    }
    if (selectedAlignment === 'right') {
        position = gElCanvas.width - textWidth - 10
        setAlignment(position)
        renderMeme()
        return
    }
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onMoveLine(direction) {
    moveLine(direction)
    renderMeme()
}

function resetMemeEditor() {
    const elText = document.querySelector('#text')
    elText.value = ''


    gMeme.lines = [
        {
            id: 0,
            txt: 'Enter Text',
            size: 40,
            width: 2,
            strokeClr: '#000000',
            fillClr: '#ffffff',
            x: 175,
            y: 100,
            isSelected: false,
            font: 'Arial'
        },
    ]

    gMeme.selectedLineIdx = 0

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return

        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}





