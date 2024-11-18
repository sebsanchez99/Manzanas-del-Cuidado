function listarManzanas() {
    fetch('http://localhost:3000/manzana/getManzanasInfo')
        .then((res) => res.json())
        .then((data) => {
            const select = document.getElementById('Man_ID')
            select.innerHTML = '<option value=""></option>'

            data.forEach( (manzana) => {
                const option = document.createElement('option')
                option.value = manzana.Man_ID
                option.textContent = manzana.Man_Nombre
                select.appendChild(option)
            })
        })
        .catch((error) => console.error(`Error al cargar las manzanas: ${error}`))
}

function listarManzanasAdmin() {
    fetch('http://localhost:3000/manzana/getManzanasInfo')
        .then((res) => res.json())
        .then((data) => {
            
            const manzanaTable = document.getElementById('manzanaTable')
            manzanaTable.innerHTML = ''
            data.forEach((manzana) => {
                const row = document.createElement('tr')

                const idCell = document.createElement('td')
                idCell.textContent = manzana.Man_ID
                row.appendChild(idCell)

                const nameCell = document.createElement('td')
                nameCell.textContent = manzana.Man_Nombre
                row.appendChild(nameCell)

                const actionCell = document.createElement('td')

                // Botón de Actualizar
                const editButton = document.createElement('button')
                editButton.textContent = 'Actualizar'
                editButton.onclick = () => {
                    // Lógica para actualizar la manzana
                    console.log('Actualizar', manzana)
                }
                actionCell.appendChild(editButton)

                // Botón de Eliminar
                const deleteButton = document.createElement('button')
                deleteButton.textContent = 'Eliminar'
                deleteButton.onclick = () => deleteManzana(manzana)  
                actionCell.appendChild(deleteButton)

                row.appendChild(actionCell)

                manzanaTable.appendChild(row)
            })
        })
}


function loadServices() {
    fetch('http://localhost:3000/servicio/listarServicios')
        .then((res) => res.json())
        .then((data) => {
            const serviciosContainer = document.getElementById('serviciosContainer')
            
            data.forEach((servicio) => {
                // Crear contenedor para el checkbox y label
                const container = document.createElement('div')
                container.className = 'servicioContainer'

                container.style.display = 'flex'
                container.style.alignItems = 'center'
                container.style.padding = '5px 10px'
                container.style.margin = '5px'

                const label = document.createElement('label')
                label.textContent = servicio.Ser_Nombre
                label.style.marginLeft = '10px' 

                const checkbox = document.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.name = 'servicios'
                checkbox.value = servicio.Ser_ID

                container.appendChild(checkbox)
                container.appendChild(label)

                serviciosContainer.appendChild(container)
            })
        })
        .catch(err => console.error('Error al cargar servicios:', err))
}

function saveManzana(event) {
    event.preventDefault()

    const form = document.getElementById('crearManzanaForm')
    const formData = new FormData(form)
    const manzanaName = formData.get('nombre_manzana')
    const selectedServices = formData.getAll('servicios')
    if (selectedServices.length == 0) {
       alert('No se ha seleccionado ningún servicio')
       return
    }

    fetch('http://localhost:3000/admin/crearManzana',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreManzana: manzanaName, servicios: selectedServices })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message == 'Operación exitosa') {
            alert(data.message)
            window.location.href = './Manzanas.html'
        } else {
            alert('Error al crear la manzana')
        }
    })
    .catch(() => alert('Error al crear la manzana'))
}

function deleteManzana(manzana) {
    if (!confirm(`¿Estás seguro que deseas eliminar la manzana ${manzana.Man_Nombre}?`)) return

    fetch('http://localhost:3000/admin/deleteManzana', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Man_ID: manzana.Man_ID })
    })
    .then( res => res.json())
    .then( data => {
        if (data.message == 'Manzana eliminada con éxito') {
            alert(data.message)
            listarManzanasAdmin()
        } else {
            alert('Error al eliminar la manzana')
        }
    })
    .catch((err) => alert('Error al eliminar la manzana', err))
}