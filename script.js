// Datos simulados
const usuarios = [
    { usuario: "alumno1", password: "1234", nombre: "Juan Pérez" },
    { usuario: "alumno2", password: "abcd", nombre: "María López" }
  ];
  
  const cursos = {
    "Programación Web": ["HTML", "CSS", "JavaScript"],
    "Matemática": ["Álgebra", "Geometría", "Cálculo"],
    "Historia": ["Edad Media", "Edad Moderna", "Historia Argentina"]
  };
  
  let usuarioActual = null;
  let cursoActual = null;
  
  // Login
  function login() {
    const user = document.getElementById("usuario").value;
    const pass = document.getElementById("password").value;
    const errorMsg = document.getElementById("login-error");
  
    const encontrado = usuarios.find(u => u.usuario === user && u.password === pass);
  
    if (encontrado) {
      usuarioActual = encontrado;
      document.getElementById("login-container").classList.add("hidden");
      document.getElementById("cursos-container").classList.remove("hidden");
      document.getElementById("nombre-usuario").textContent = usuarioActual.nombre;
      cargarCursos();
    } else {
      errorMsg.textContent = "Usuario o contraseña incorrectos";
    }
  }
  
  // Cargar lista de cursos
  function cargarCursos() {
    const lista = document.getElementById("lista-cursos");
    lista.innerHTML = "";
    for (const curso in cursos) {
      const li = document.createElement("li");
      li.textContent = curso;
      li.onclick = () => seleccionarCurso(curso);
      lista.appendChild(li);
    }
  }
  
  // Seleccionar curso
  function seleccionarCurso(curso) {
    cursoActual = curso;
    document.getElementById("cursos-container").classList.add("hidden");
    document.getElementById("materias-container").classList.remove("hidden");
    document.getElementById("curso-seleccionado").textContent = curso;
    cargarMaterias(curso);
  }
  
  // Cargar materias
  function cargarMaterias(curso) {
    const lista = document.getElementById("lista-materias");
    lista.innerHTML = "";
    cursos[curso].forEach(materia => {
      const li = document.createElement("li");
      li.textContent = materia;
      li.onclick = () => inscribirseMateria(materia);
      lista.appendChild(li);
    });
  }
  
  // Inscripción
  function inscribirseMateria(materia) {
    alert(`✅ Te inscribiste en la materia "${materia}" del curso "${cursoActual}"`);
  }
  
  // Volver a cursos
  function volverCursos() {
    document.getElementById("materias-container").classList.add("hidden");
    document.getElementById("cursos-container").classList.remove("hidden");
  }
  
  // Cerrar sesión
  function logout() {
    usuarioActual = null;
    cursoActual = null;
    document.getElementById("usuario").value = "";
    document.getElementById("password").value = "";
    document.getElementById("cursos-container").classList.add("hidden");
    document.getElementById("materias-container").classList.add("hidden");
    document.getElementById("login-container").classList.remove("hidden");
  }
  