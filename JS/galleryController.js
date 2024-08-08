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

