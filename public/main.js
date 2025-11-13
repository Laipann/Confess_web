function shufle(array) {    
    for(let i = array.length - 1; i > 0 ; i--){
            let randIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randIndex]] = [array[randIndex], array[i]]
        }
        return array
}

async function infinites(m) {
    try {
        const infiniteScroll = document.querySelectorAll('.infiniteScr')
        const url = await fetch('api/songs')
        const data = await url.json()
        const shufleData = shufle(data).slice(0,8)

        infiniteScroll.forEach(infiniteScroll => {
            shufleData.map(m => {
                const card = document.createElement('div')
                card.innerHTML = cards(m)
                infiniteScroll.appendChild(card)
            })

            const scrollerContent =Array.from(infiniteScroll.children)
            scrollerContent.map(item => {
                const duplikat = item.cloneNode(true)
                infiniteScroll.appendChild(duplikat)
            })
            })
    }  catch(err){
        console.log(err)
    }
}

infinites()



function cards(m) {
    return `            <div class="card mb-3"> 
                            <div class="card-body">
                                <h5 class="card-title"> From : ${m.nama_pengirim} </h5>
                                <h5 class="card-title"> To : ${m.nama_penerima} </h5>
                                <p class="card-text"> Message : ${m.message}</p>
                                <p class="card-text"> ${m.song} </p>
                            </div>
                        </div>
                    `
}
