

class Persona {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
  }

  getNombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  }
}

class Cuenta {
  static contadorCuentas = 1;

  constructor(dueño, saldo) {
    this.id_Cuenta = Cuenta.contadorCuentas++;
    this.dueño = dueño;
    this.saldo = saldo;
  }

  getSaldo() {
    return this.saldo;
  }

  depositar(monto) {
    this.saldo += monto;
  }

  retirar(monto) {
    if (this.saldo >= monto) {
      this.saldo -= monto;
      return true;
    }
    return false;
  }

  imprimirInfo() {
    console.log(`Cuenta #${this.id_Cuenta} - Dueño: ${this.dueño.getNombreCompleto()} - Saldo: $${this.saldo}`);
  }
}

class Usuario {
  constructor(nombreUsuario, contraseña) {
    this.nombreUsuario = nombreUsuario;
    this.contraseña = contraseña;
    this.cuentas = [];
  }

  agregarCuenta(cuenta) {
    this.cuentas.push(cuenta.id_Cuenta);
  }

  getCuentas() {
    return this.cuentas;
  }
}


const persona1 = new Persona("Juan", "Pérez");
const persona2 = new Persona("Ana", "García");

const cuenta1 = new Cuenta(persona1, 1000);
const cuenta2 = new Cuenta(persona1, 200);
const cuenta3 = new Cuenta(persona2, 500);

const cuentas = [cuenta1, cuenta2, cuenta3];

const usuario1 = new Usuario("juan123", "1234");
usuario1.agregarCuenta(cuenta1);
usuario1.agregarCuenta(cuenta2);

const usuario2 = new Usuario("ana456", "abcd");
usuario2.agregarCuenta(cuenta3);

const usuarios = [usuario1, usuario2];

if (!localStorage.getItem("cuentas")) {
  localStorage.setItem("cuentas", JSON.stringify(cuentas));
  localStorage.setItem("usuarios", JSON.stringify(usuarios, (key, value) =>
    typeof value === 'function' ? undefined : value));
}


if (document.getElementById("loginForm")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("Hay campos vacíos.");
      return;
    }

    const usuario = usuarios.find(u => u.nombreUsuario === username && u.contraseña === password);

    if (!usuario) {
      alert("Usuario y/o contraseña incorrectos.");
      return;
    }

    localStorage.setItem("usuarioActual", JSON.stringify(usuario));
    window.location.href = "transfer.html";
  });
}


if (document.getElementById("transferForm")) {
  document.getElementById("transferForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const cuentaOrigen = parseInt(document.getElementById("cuentaOrigen").value);
    const cuentaDestino = parseInt(document.getElementById("cuentaDestino").value);
    const importe = parseFloat(document.getElementById("importe").value);

    if (!cuentaOrigen || !cuentaDestino || !importe) {
      alert("Hay campos vacíos.");
      return;
    }

    if (importe <= 0) {
      alert("El importe debe ser mayor que 0.");
      return;
    }

    if (cuentaOrigen === cuentaDestino) {
      alert("No puede realizar la transferencia si la cuenta origen y destino son la misma.");
      return;
    }

    const cuentasDB = JSON.parse(localStorage.getItem("cuentas"));
    const usuario = JSON.parse(localStorage.getItem("usuarioActual"));

    const cuentaO = cuentasDB.find(c => c.id_Cuenta === cuentaOrigen);
    const cuentaD = cuentasDB.find(c => c.id_Cuenta === cuentaDestino);

    if (!cuentaO) {
      alert("Cuenta origen inexistente.");
      return;
    }

    if (!cuentaD) {
      alert("Cuenta destino inexistente.");
      return;
    }

    if (!usuario.cuentas.includes(cuentaOrigen)) {
      alert("Esta cuenta no te pertenece.");
      return;
    }

    if (cuentaO.saldo < importe) {
      alert("Saldo insuficiente.");
      return;
    }

    cuentaO.saldo -= importe;
    cuentaD.saldo += importe;

    localStorage.setItem("cuentas", JSON.stringify(cuentasDB));
    alert("Transferencia realizada con éxito.");
  });
}
