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

    setImg(imgId)
    onGallery()
    renderMeme()
}

function onGallery() {
    const elGallery = document.querySelector('.gallery')
    const gElCanvas = document.querySelector('.canvas')

    if (elGallery.style.display === 'none') {
        elGallery.style.display = 'grid'
        gElCanvas.style.display = 'none'
    } else {
        elGallery.style.display = 'none'
        gElCanvas.style.display = 'flex'
    }
}