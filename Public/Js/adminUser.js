function loadUsers() {
  fetch("http://localhost:3000/admin/getUsers")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      const usersTable = document.getElementById("usersTable");
      usersTable.innerHTML = "";
      data.forEach((user) => {
        const row = document.createElement("tr");

        // Columna ID de usuario
        const idCell = document.createElement("td");
        idCell.textContent = user.Usu_ID;
        row.appendChild(idCell);

        // Columna Nombre de usuario
        const nameCell = document.createElement("td");
        nameCell.textContent = user.Usu_Nombre;
        row.appendChild(nameCell);

        // Columna Email de usuario
        const emailCell = document.createElement("td");
        emailCell.textContent = user.Usu_Email;
        row.appendChild(emailCell);

        // Columna de Acciones con los iconos de editar y eliminar
        const actionsCell = document.createElement("td");
        actionsCell.classList.add("actions");

        // Icono de editar
        const editLink = document.createElement("a");
        editLink.href = "/Actualizar.html";
        const editIcon = document.createElement("ion-icon");
        editIcon.name = "create-outline";
        editIcon.classList.add("editar");
        editLink.appendChild(editIcon);
        actionsCell.appendChild(editLink);

        // Icono de eliminar
        const deleteLink = document.createElement("a");
        deleteLink.href = "#";
        const deleteIcon = document.createElement("ion-icon");
        deleteIcon.name = "trash-outline";
        deleteIcon.classList.add("eliminar");
        deleteIcon.onclick = () => eliminarUsuario(user.Usu_ID);
        deleteLink.appendChild(deleteIcon);
        actionsCell.appendChild(deleteLink);

        row.appendChild(actionsCell);

        // Añade la fila al cuerpo de la tabla
        usersTable.appendChild(row);
      });
    });
}
