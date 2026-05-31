
const currentURL = new URL(window.location)
const termDefinitions = document.getElementById('term-definitions')

const makeTermDefinition = (id, definition) => {
    return `
        <article class="term-def" data-entryId="${id}">
            <p class="def-text">${definition}</p>
        </article>
    `
}

const initialize = async () => {
    const term = currentURL.searchParams.get('term')

    document.querySelector('#term-content').innerHTML = term;
    document.title = term;

    const termInfo = await window.search.searchEntries(term)

    termInfo.forEach(info => {
        termDefinitions.insertAdjacentHTML('beforeend', makeTermDefinition(info.id, info.definition))
    })
}

initialize()