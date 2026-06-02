
const currentURL = new URL(window.location)
const termDefinitions = document.getElementById('term-definitions')

const makeTagBar = (tags = []) => {
    if (tags.length === 0) return ''
    // if (!tags[0]) return '';    // When there are no tags, the database returns

    return `
        <span class="tag-bar">
            ${
                tags.map(t => {return t ? `<span class="def-tag">${t.name}</span>`: ''}).join('\n')
            }
        </span>
    `
}

const makeTermDefinition = (id, definition, tags= []) => {
    return `
        <article class="term-def" data-entryId="${id}">
            <p class="def-text">${definition}</p>
            ${makeTagBar(tags)}
        </article>
    `
}

const initialize = async () => {
    const term = currentURL.searchParams.get('term')

    document.querySelector('#term-content').innerHTML = formatText(term);
    document.title = term;

    // I don't really know if using this instead of the usual await is
    // better, but it's what works soooooo
    window.search.entriesWithTerm(term).then(response => {
        console.log(response)
        response.forEach(entry => {
            console.log(entry)
            termDefinitions.insertAdjacentHTML('beforeend', makeTermDefinition(entry.id, formatText(entry.definition), entry.tags))
        })
    })
}

initialize()