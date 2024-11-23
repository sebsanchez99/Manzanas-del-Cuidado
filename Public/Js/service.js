function loadUserServices() {
    fetch('http://localhost:3000/servicio/listarServiciosUsuario')
        .then( res => res.json())
        .then( data => {
            const table = document.getElementById('userServicesTable')
            table.innerHTML = ''
            data.forEach( service => {
                const row = document.createElement('tr')

                const serviceName = document.createElement('td')
                serviceName.textContent = service.Ser_Nombre
                row.appendChild(serviceName)

                const fecha = new Date(service.Fecha)
                const formattedDate = fecha.toLocaleDateString('es-CO')
                const serviceFecha = document.createElement('td')
                serviceFecha.textContent = formattedDate
                row.appendChild(serviceFecha)

                const acciones = document.createElement('td')
                acciones.classList.add('actions')

                const deleteLink = document.createElement('a')
                deleteLink.href = '#'
                const deleteIcon = document.createElement('ion-icon')
                deleteIcon.name = 'trash-outline'
                deleteIcon.onclick = () => deleteUserService(service)
                deleteLink.appendChild(deleteIcon)
                acciones.appendChild(deleteLink)
                row.appendChild(acciones)
                
                table.appendChild(row)
            });

        });
}

function loadManzanaServices() {
    fetch('http://localhost:3000/servicio/listarServiciosManzana')
        .then( res => res.json())
        .then( data => {
            const table = document.getElementById('manzanaTable')
            table.innerHTML = ''
            data.forEach( manzanaService => {
                const row = document.createElement('tr')

                const serviceID = document.createElement('td')
                const serviceCheckBox = document.createElement('input')
                serviceCheckBox.type = 'checkbox'
                serviceCheckBox.name = 'servicios'
                serviceCheckBox.value = manzanaService.Ser_ID
                serviceID.appendChild(serviceCheckBox)
                row.appendChild(serviceID)

                const serviceName = document.createElement('td')
                serviceName.textContent = manzanaService.Ser_Nombre
                row.appendChild(serviceName)

                const serviceDescription = document.createElement('td')
                serviceDescription.textContent = manzanaService.Ser_Descripcion
                row.appendChild(serviceDescription)

                table.appendChild(row)
            })
        })
    
}

function saveServices(event) {
    event.preventDefault()

    const form = document.getElementById('manzanaForm')
    const formData = new FormData(form)
    const selectedServices = formData.getAll('servicios')
    const date = formData.get('date')

    if (selectedServices.length == 0) {
        alert('No se ha seleccionado ningún servicio')
        return
    }

    fetch('http://localhost:3000/servicio/guardarServicios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ servicios: selectedServices, fecha: date })
    })
    .then( response => response.json())
    .then( _ => alert('Servicios guardados correctamente'))
    .catch( _ => alert('Error al guardar los servicios'))
}

function deleteUserService(service) {
    if (!confirm(`¿Estás seguro quer quieres eliminar el servicio ${service.Ser_Nombre}?`)) return
    
    fetch('http://localhost:3000/servicio/eliminarServicio', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ servicioID: service.Ser_ID, fecha: service.Fecha })
    })
    .then( res => res.json())
    .then( data => {
        if (data.message == 'Servicio eliminado exitosamente') {
            alert(data.message)
            loadUserServices()
        } else {
           alert(data.message) 
        }
    })
    .catch( _ => alert('Error al intentar eliminar el servicio'))
}

function crearServicio(event) {
    event.preventDefault()
    const form = document.getElementById("formularioServicio")
    const formData = new FormData(form) 
    const nombreServicio = formData.get("Ser_Nombre")
    const descripcionServicio = formData.get("Ser_Descripcion") 
    fetch('http://localhost:3000/servicio/crearServicio', {
        method : "post",
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({Ser_Descripcion : descripcionServicio, Ser_Nombre : nombreServicio})
    })
    .then( res => res.json())
    .then( datos => {
        if (datos.message == 'Servicio creado exitosamente') {
            alert(datos.message)
        } else {
            alert(datos.message)
        }
    }) 
}
