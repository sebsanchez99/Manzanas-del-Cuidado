function logout() {
    fetch('http://localhost:3000/auth/logout',{
        method: 'POST',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message == 'Sesión cerrada exitosamente') {
            window.location.href = '/Login.html'
        }
        
    })
    .catch(error => {
        console.error(`Error al cerrar sesión ${error}`)
    })
}