const showAlert = (message, type) => {
    document.querySelector('.custom-alert').classList.add('show')
    document.querySelector('.custom-alert .alert-text').innerHTML = message
    document.querySelector(".custom-alert").classList.add(type)
}

export default showAlert