function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json() ) // Quando só tem um valor não precisa de () nem {} e nem return
    .then( states => {
        for ( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    })
    // then é como se fosse o cath, porém presumindo que vai dar certo
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then(res => res.json() ) // Quando só tem um valor não precisa de () nem {} e nem return
    .then( cities => {
        for ( const city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

// ouvidora

document.querySelector("select[name=uf]").addEventListener("change", getCities) 
// procura o select com o nome "uf"      
// ouve mudanças kkkk, a cada mudança no select, vai imprimir mudei no console do browser