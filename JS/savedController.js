'use strict'

function onShowSavedMeme() {
    const savedMemes = _loadMemes()
    console.log(savedMemes)
    renderSavedMemes(savedMemes)

}

function renderSavedMemes(savedMemes) {
    // const elSavedMemes = document.querySelector('.saved-memes-container')
    // console.log(savedMemes)

    // var strHtml = ''
    // strHtml += savedMemes.map(meme => {
    //     const imgUrl = gImgs[meme.selectedImgId - 1].url

    //     return `<img src="${imgUrl}" onclick="onImgSelect(${meme.selectedImgId
    //         })">`
    // }).join('')

    // elSavedMemes.innerHTML = strHtml
}