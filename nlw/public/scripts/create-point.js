function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) // Quando só tem um valor não precisa de () nem {} e nem return
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        })
    // then é como se fosse o cath, porém presumindo que vai dar certo
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Select the city</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json()) // Quando só tem um valor não precisa de () nem {} e nem return
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
                // city.nome duas vezes é para não aparecer o ID na url, aparece o nom tipo, em vez de MG 33, aparece MG BH
            }

            citySelect.disabled = false
        })
}

// ouvidora

document.querySelector("select[name=uf]").addEventListener("change", getCities)
// procura o select com o nome "uf"      
// ouve mudanças kkkk, a cada mudança no select, vai imprimir mudei no console do browser

// Itens de coleta
// Pegar todos os LI's com ouvidor de eventos
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // adicionar ou remover uma classe com JS
    // toggle add ou del
    itemLi.classList.toggle("selected")

    // ou seja, os que ainda não tem efeito no click, coloca. Os que já tem, tira.
    // efeito = class kkkkk
    const itemId = itemLi.dataset.id

    // verificar se existem items selecionados, se sim
    // pegar os items selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // Isso será true ou false
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // caso não esteja selecionado, add a seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}