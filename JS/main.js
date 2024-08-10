'use strict'

let gElCanvas
let gCtx

function onInit() {
    const elCanvas = document.querySelector('.canvas')
    elCanvas.style.display = 'none'

    renderGallery()
    renderCanvas()
}

function renderCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    window.addEventListener('resize', resizeCanvas)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight

    renderMeme()
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