'use strict'

function renderMeme() {
    const meme = getMeme()
    const currImg = drawImg(meme.selectedImgId)


    renderImg(currImg)
    renderText()
}

function drawImg(imgId) {
    const img = gImgs.find(img => img.id === imgId)
    // const elImg = new Image()
    // elImg.src = img.url

    // elImg.onload = () => {
    //     gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    // }

    // console.log(img)
    return img
}

function renderText() {
    const meme = getMeme()

    meme.lines.forEach((line) => {
        gCtx.lineWidth = line.width
        gCtx.strokeStyle = line.strokeClr
        gCtx.fillStyle = line.fillClr
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = line.align

        gCtx.fillText(line.txt, line.x, line.y)
        gCtx.strokeText(line.txt, line.x, line.y)
    })
}

function renderImg(img) {
    const elImg = new Image()
    elImg.src = img.url
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, elImg.width, elImg.height)
}

function onSelectedStrokeClr() {
    const colorValue = document.querySelector('#strokeColor').value
    selectedStrokeColor(colorValue)
    renderMeme()
    renderFrame()
}

function onSelectedFillClr() {
    const colorValue = document.querySelector('#fillClr').value
    selectedFillColor(colorValue)
    renderMeme()
    renderFrame()
}


function onSetLineText() {
    const { selectedLineIdx } = gMeme
    const elText = document.querySelector('#text')
    setLineTxt(elText.value, selectedLineIdx)
    renderMeme()
    renderFrame()
}

function onDownloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
    renderFrame()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
    renderFrame()
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
        isSelected: false,
        align: 'start',
        font: 'Arial'
    })

    gMeme.selectedLineIdx = 1
    let currText = lines[selectedLineIdx].txt
    lines[selectedLineIdx].isSelected = true
    elText.value = currText

    addLine()
    renderMeme()
    renderFrame()
}

function onSwitchLine() {
    const elText = document.querySelector('#text')
    switchLine()
    const { selectedLineIdx, lines } = gMeme
    let currText = lines[selectedLineIdx].txt
    elText.value = currText

    renderMeme()
    renderFrame()
}

function renderFrame() {
    const { selectedLineIdx, lines } = gMeme
    const { startPosX, startPosY, textHeight, textWidth, txt } = getTextDimensions(lines[selectedLineIdx])
    if (txt === '') return

    gCtx.strokeStyle = 'red'
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
    renderFrame()
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
    renderFrame()
}

function onFontSizeSelector() {
    const fontSizeSelected = document.querySelector('#font-size').value
    fontSizeSelector(fontSizeSelected)
    renderMeme()
    renderFrame()
}

function onSetAlignment(selectedAlignment) {
    if (selectedAlignment === 'left') {
        setAlignment(selectedAlignment)
        renderMeme()
        return
    }
    if (selectedAlignment === 'center') {
        setAlignment(selectedAlignment)
        renderMeme()
        return
    }
    if (selectedAlignment === 'right') {
        setAlignment(selectedAlignment)
        renderMeme()
        return
    }
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
    renderFrame()
}

function onMoveLine(direction) {
    moveLine(direction)
    renderMeme()
    renderFrame()
}