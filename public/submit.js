const search = document.querySelector('.search')
const input = document.getElementById('song')

input.addEventListener('keyup', async (event) => {
    const userData = event.target.value.trim()
    if(!userData) {
        search.classList.remove('active')
        search.innerHTML = ''
        return
    }

    try{
        const url = await fetch('/api/search', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({song : userData})
        })
        const list = await url.json()

        const oldlist = document.querySelector('.search .mylist')
        if(oldlist){ oldlist.remove()}

        const daftar = document.createElement('div')
        daftar.classList.add('mylist')
        daftar.innerHTML = list.map(track => {
            return `<div class="song" data-url="${track.album.external_urls.spotify}" data-penyanyi="${track.album.artists[0].name}" data-name="${track.name}" data-cover="${track.album.images[0].url}">
            <p class='cat-li'>${track.name}</p> <img src=${track.album.images[0].url}>
            </div>`
        }).join('')


        daftar.addEventListener('click', (e) => {
            const sing = e.target.closest('.song')
            if(!sing) return
            
            document.getElementById('urlLagu').value = e.target.closest('.song').dataset.url
            document.getElementById('penyanyi').value = e.target.closest('.song').dataset.penyanyi
            document.getElementById('cover').value = e.target.closest('.song').dataset.cover

            input.value = e.target.closest('.song').dataset.name

            search.classList.remove('active')
        })
        
        search.classList.add('active')
        search.appendChild(daftar)

    }catch(err) {
        console.log(err)
    }
})


function removeClass() {
    search.classList.remove('active')
}

search.classList.remove('active')