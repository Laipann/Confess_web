function shufle(array) {    
    for(let i = array.length - 1; i > 0 ; i--){
            let randIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randIndex]] = [array[randIndex], array[i]]
        }
        return array
}

async function dataJson() {
        const container = document.querySelector('.gaps')
        const url = await fetch('api/songs')
        const data = await url.json()
 
        const shufleData = shufle(data).slice(0,4)
        
        shufleData.map(m => {
        const wadah = document.createElement('div')
        wadah.innerHTML = cards(m)
        container.appendChild(wadah)
    }) 
}

window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight -10 || document.documentElement.scrollHeight == window.innerHeight) {
        setTimeout(() => {
            dataJson()
        },1000)
    }
})

dataJson()


function cards(m) {
    return `            <div class="card mb-3"> 
                            <div class="card-body detailBtn" data-id=${m._id}>
                                <h5 class="card-title"> From : ${m.nama_pengirim} </h5>
                                <h5 class="card-title"> To : ${m.nama_penerima} </h5>
                                <p class="card-text"> Message : ${m.message}</p>
                                <p class="card-text"> ${m.song} </p>
                            </div>
                        </div>`
}

document.addEventListener('click', (e) => {
    const penerima = e.target.closest('.detailBtn').dataset.id
        window.location.href = `/browse/${penerima}`
     
})


