'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery-container')
    const images = getImages()

    var strHtml = ''

    strHtml += images.map(images =>
        `<img src="${images.url}" onclick="onImgSelect(${images.id})">`
    ).join('')

    elGallery.innerHTML = strHtml
}

function onImgSelect(imgId) {

    resetMemeEditor()
    setImg(imgId)
    onEditor()
    renderMeme()
}

function onImFlexible() {
    const randomImgIdx = getRandomInt(1, gImgs.length)
    const randomTxtIdx = getRandomInt(0, gTextOpt.length)

    setImg(randomImgIdx)
    setRandomText(randomTxtIdx)
    onEditor()

    renderMeme()
}
