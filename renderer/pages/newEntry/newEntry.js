const newEntryForm = document.getElementById('new-definition')
const entryTermField = document.getElementById('entry-term')
const entryDefinitionField = document.getElementById('entry-content')

const duplicateErrorMessage = document.getElementById('duplicate-error-message')

newEntryForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(newEntryForm)
    const data = Object.fromEntries(formData.entries())

    console.log(data)

    const response = await window.entries.createEntry(data.term, data.definition)

    if (response.error) {
        duplicateErrorMessage.classList.remove('no-error')
    } else {
        duplicateErrorMessage.classList.add('no-error')
    }
})

entryTermField.addEventListener('invalid', (event) => {
    event.preventDefault()
    entryTermField.classList.add('form-error')
    entryTermField.closest('.form-group').querySelector('p.error-text').classList.remove('no-error')
})

entryTermField.addEventListener('input', () => {
    entryTermField.classList.remove('form-error')

    const errorMessage = entryTermField.closest('.form-group').querySelector('p.error-text')
    if (!errorMessage.classList.contains('no-error')) errorMessage.classList.add('no-error')
})

entryDefinitionField.addEventListener('invalid', (event) => {
    event.preventDefault();
    entryDefinitionField.classList.add('form-error');
    entryDefinitionField.closest('.form-group').querySelector('p.error-text').classList.remove('no-error')
})

entryDefinitionField.addEventListener('input', () => {
    entryDefinitionField.classList.remove('form-error')

    const errorMessage = entryDefinitionField.closest('.form-group').querySelector('p.error-text')
    if (!errorMessage.classList.contains('no-error')) errorMessage.classList.add('no-error')
})