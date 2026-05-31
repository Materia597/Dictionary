const definitionsPreview = document.getElementById('recent-definitions-preview')

/**
 * 
 * @param {number} entryId 
 * @param {string} term 
 * @param {string} definition 
 * @param {string[]} tags 
 */
const makePreview = (entryId, term, definition, tags) => {
    let tagText = tags.map(t => `<span class="def-tag">${t.name}</span>`).join("\n")

    return `
        <article class="dict-entry-preview" data-entryId="${entryId}">
            <h2 class="term-heading" data-term="${term}">${term}</h2>
            <span class="def-tags">
                ${tagText}
            </span>
            <p class="definition-preview">${definition}</p>
        </article>
    `
}



const populateRecent = async () => {
    const results = await window.entries.recentEntries()
    
    results.forEach(r => {
        definitionsPreview.insertAdjacentHTML('beforeend', makePreview(r.id, r.term, r.definition, r.tags))
    }) 

    document.querySelectorAll('.term-heading').forEach(heading => {
        console.log(heading.dataset.term)
        heading.addEventListener('click', () => {
            window.location = `../entry/entry.html?term=${heading.dataset.term}`
        })
    })
}

populateRecent()