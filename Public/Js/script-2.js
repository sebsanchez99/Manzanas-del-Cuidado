// Función para abrir y cerrar la barra lateral
document.getElementById('menu-btn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
  });
  
  // Función para abrir y cerrar el submenú de "Inicio"
  const submenuBtn = document.querySelector('.submenu-btn');
  submenuBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Evita el comportamiento por defecto del enlace
    const submenu = this.parentElement;
    submenu.classList.toggle('active');
  });
    

  