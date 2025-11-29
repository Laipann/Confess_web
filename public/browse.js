const container = document.querySelector('.gaps')
const containers = document.querySelector('.rsearch')
const search = document.getElementById('search')
const btn = document.getElementById('btn')
const mode = ''


function shufle(array) {    
    for(let i = array.length - 1; i > 0 ; i--){
            let randIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randIndex]] = [array[randIndex], array[i]]
        }
        return array
}

async function dataJson() {
        const url = await fetch('api/songs')
        const data = await url.json()
 
        const shufleData = shufle(data).slice(0,4)
        
        shufleData.map(m => {
        const wadah = document.createElement('div')
        wadah.innerHTML = cards(m)
        container.appendChild(wadah)
    }) 
}



async function searchName() {
    const url = await fetch('api/songs')
    const data = await url.json()

    const result = data.forEach(m => {
        const nama = m.nama_penerima
        if(search.value == nama){
            const wadah = document.createElement('div') 
            wadah.innerHTML = cards(m)
            containers.appendChild(wadah)
            container.innerHTML = ''
        } else {
            container.innerHTML =''
        }
    })

}


btn.addEventListener('click',() =>{
    mode.innerHTML = search
    searchName() 
})



window.addEventListener('scroll', () => {

    if(mode == search) {
        return
    } else {
            if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight -10 || document.documentElement.scrollHeight == window.innerHeight) {
        setTimeout(() => {
            dataJson()
        },1000)
        }
    }


})

dataJson()

document.addEventListener('click', (e) => {
    const btn = e.target.closest('.detailBtn')

    if (!btn) return   // jika null, langsung hentikan

    const penerima = btn.dataset.id
    window.location.href = `/browse/${penerima}`
})



function cards(m) {
    return `            <div class="card mb-3" style="cursor:pointer;"> 
                            <div class="card-body detailBtn" data-id=${m._id}>
                                <h5 class="card-title"> From : ${m.nama_pengirim} </h5>
                                <h5 class="card-title"> To : ${m.nama_penerima} </h5>
                                <p class="card-text"> Message : ${m.message}</p>
                                <p class="card-text"> ${m.song} </p>
                            </div>
                        </div>`
}


