function loadUsers() {
  fetch('http://localhost:3000/admin/getUsers')
    .then((res) => res.json())
    .then((data) => {

      const usersTable = document.getElementById('usersTable')
      usersTable.innerHTML = ' '
      data.forEach((user) => {
        const row = document.createElement('tr')

        // Columna ID de usuario
        const idCell = document.createElement('td')
        idCell.textContent = user.Usu_ID
        row.appendChild(idCell)

        // Columna Nombre de usuario
        const nameCell = document.createElement('td')
        nameCell.textContent = user.Usu_Nombre
        row.appendChild(nameCell)

        // Columna Email de usuario
        const emailCell = document.createElement('td')
        emailCell.textContent = user.Usu_Email
        row.appendChild(emailCell)

        // Columna de Acciones con los iconos de editar y eliminar
        const actionsCell = document.createElement('td')
        actionsCell.classList.add('actions')

        // Icono de editar
        const editLink = document.createElement('a')
        editLink.href = '#'
        const editIcon = document.createElement('ion-icon')
        editIcon.name = 'create-outline'
        editLink.onclick = () => changeDataRows(user, row)
        editLink.appendChild(editIcon)
        actionsCell.appendChild(editLink)

        // Icono de eliminar
        const deleteLink = document.createElement('a')
        deleteLink.href = '#'
        const deleteIcon = document.createElement('ion-icon')
        deleteIcon.name = 'trash-outline'
        deleteIcon.onclick = () => deleteUser(user)
        deleteLink.appendChild(deleteIcon)
        actionsCell.appendChild(deleteLink)

        row.appendChild(actionsCell)

        // Añade la fila al cuerpo de la tabla
        usersTable.appendChild(row)
      })
    })
}

function deleteUser(user) {
  if (!confirm(`¿Estás seguro que deseas eliminar al usuario ${user.Usu_Nombre}?`)) return

  fetch('http://localhost:3000/admin/deleteUser', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userID: user.Usu_ID })
  })
  .then( res => res.json())
  .then( data => {
    if (data.message == 'Usuario eliminado correctamente') {
      alert(data.message)
      loadUsers()
    } else {
      alert('Error al eliminar el usuario')
    }
  })
  .catch( _ => alert('Error al eliminar el usuario') )
}

function changeDataRows(user, row) {
  row.cells[1].innerHTML = `<input type="text" name="userName">`
  row.cells[2].innerHTML = `<input type="text" name="userEmail">`
  row.cells[3].innerHTML = ''

  const saveButton = document.createElement('button')
  saveButton.textContent = 'Guardar'
  saveButton.classList.add('save-button')
  saveButton.click = () => editUser(user)
  actionsCell.appendChild(saveButton)

  const cancelButton = document.createElement('button')
  cancelButton.textContent = 'Cancelar'
  cancelButton.classList.add('cancel-button')
  cancelButton.click = () => cancel(user)
  actionsCell.appendChild(cancelButton)
}

function cancel(user, row) {
  row.cells[1].textContent = user.Usu_Nombre
  row.cells[2].textContent = user.Usu_Email

  //TODO: falta restaurar celdas
}

function editUser(user) {
  if (!confirm(`¿Estás seguro que deseas guardar lo cambios ${user.Usu_Nombre}?`)) return

  fetch('http://localhost:3000/admin/editUser', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userID: user.Usu_ID, userName: user.Usu_NOmbre, userEmail: user.Usu_Email})
  })
  .then( res => res.json())
  .then(data => {
    if (data.message == 'Usuario actualizado correctamente') {
      alert(data.message)
      loadUsers()
    } else {
      alert('Error al actualizar los registros del usuario')
    }
  })
  .catch( _ => alert('Error al actualizar los resgitros del usuario') )
  
}


