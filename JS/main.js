'use strict'

let gElCanvas
let gCtx

function onInit() {
    const elCanvas = document.querySelector('.canvas')
    elCanvas.style.display = 'none'

    renderGallery()
    renderCanvas()
    renderMeme()
}

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')


    window.addEventListener('resize', resizeCanvas)
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    console.log(elContainer)
    gElCanvas.width = elContainer.clientWidth - 10
    gElCanvas.height = elContainer.clientHeight - 10
    console.log(gElCanvas)

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

}

function onGallery() {
    const elGallery = document.querySelector('.gallery')
    const elCanvas = document.querySelector('.canvas')

    if (elGallery.style.display === 'grid') return

    elGallery.style.display = 'grid'
    elCanvas.style.display = 'none'

}

function onEditor() {
    const elGallery = document.querySelector('.gallery')
    const elCanvas = document.querySelector('.canvas')

    if (elCanvas.style.display === 'flex') return

    elGallery.style.display = 'none'
    elCanvas.style.display = 'flex'
}