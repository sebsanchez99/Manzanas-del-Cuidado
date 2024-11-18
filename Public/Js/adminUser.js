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
        createIcons(actionsCell, row, user)

        // Añade la fila al cuerpo de la tabla
        usersTable.appendChild(row)
      })
    })
}

function createIcons(actionsCell, row, user) {
  actionsCell.classList.add('actions')

  // Icono de editar
  const editLink = document.createElement('a')
  editLink.href = '#'
  const editIcon = document.createElement('ion-icon')
  editIcon.name = 'create-outline'
  editLink.onclick = () => changeDataRows(user, row, actionsCell)
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
}

function changeDataRows(user, row, actionsCell) {
  row.cells[1].innerHTML = `<input type="text" name="userName" value="${user.Usu_Nombre}">`
  row.cells[2].innerHTML = `<input type="text" name="userEmail" value="${user.Usu_Email}">`
  row.cells[3].innerHTML = ''  // Limpiar la celda de acciones

  // Botón de guardar
  const saveButton = document.createElement('button')
  saveButton.textContent = 'Guardar'
  saveButton.classList.add('save-button')
  saveButton.onclick = () => editUser(user, row)
  actionsCell.appendChild(saveButton)

  // Botón de cancelar
  const cancelButton = document.createElement('button')
  cancelButton.textContent = 'Cancelar'
  cancelButton.classList.add('cancel-button')
  cancelButton.onclick = () => cancel(user, row)
  actionsCell.appendChild(cancelButton)
}

function cancel(user, row) {
  row.cells[1].textContent = user.Usu_Nombre
  row.cells[2].textContent = user.Usu_Email
  const actionCell = row.cells[3] 
  actionCell.innerHTML = ''
  createIcons(actionCell, row, user)
}

function editUser(user, row) {

  if (!confirm(`¿Estás seguro que deseas guardar los cambios de ${user.Usu_Nombre}?`)) return

  const name = row.cells[1].querySelector('input').value || user.Usu_Nombre
  const email = row.cells[2].querySelector('input').value || user.Usu_Email

  fetch('http://localhost:3000/admin/editUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userID: user.Usu_ID, userName: name, userEmail: email })
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === 'Usuario actualizado correctamente') {
      alert(data.message)
      loadUsers()  
    } else {
      alert('Error al actualizar los registros del usuario')
    }
  })
  .catch(() => alert('Error al actualizar los registros del usuario'))
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
