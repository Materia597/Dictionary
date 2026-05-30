const newEntryForm = document.getElementById('new-definition')

newEntryForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(newEntryForm)
    const data = Object.fromEntries(formData.entries())

    console.log(data)

    const response = await window.entries.createEntry(data.term, data.definition)

    console.log(response)
})