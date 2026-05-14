// Registro de usuarios
document.addEventListener('DOMContentLoaded', () => {
    inicializarFormulario();
    configurarTipoUsuario();
    configurarValidacionPassword();
});

function inicializarFormulario() {
    const form = document.getElementById('registroForm');
    if (!form) return;

    form.addEventListener('submit', manejarRegistro);

    // Validación en tiempo real
    document.getElementById('usuario').addEventListener('input', validarUsuario);
    document.getElementById('email').addEventListener('input', validarEmail);
    document.getElementById('password').addEventListener('input', validarPassword);
    document.getElementById('confirmPassword').addEventListener('input', validarConfirmPassword);
}

function configurarTipoUsuario() {
    const tipoUsuario = document.getElementById('tipoUsuario');
    const tipoUsuarioInfo = document.getElementById('tipoUsuarioInfo');

    if (!tipoUsuario) return;

    tipoUsuario.addEventListener('change', (e) => {
        if (e.target.value) {
            tipoUsuarioInfo.style.display = 'block';
            if (e.target.value === 'cliente') {
                tipoUsuarioInfo.textContent = '✓ Acceso como cliente: visualiza tus pedidos, historial de compras y perfil.';
            } else if (e.target.value === 'vendedor') {
                tipoUsuarioInfo.textContent = '✓ Acceso como vendedor: gestiona tu inventario, ventas y análisis de negocio.';
            }
        } else {
            tipoUsuarioInfo.style.display = 'none';
        }
    });
}

function configurarValidacionPassword() {
    const password = document.getElementById('password');
    
    if (!password) return;

    password.addEventListener('input', () => {
        const valor = password.value;
        const reqLength = document.getElementById('reqLength');
        
        if (valor.length >= 6) {
            reqLength.innerHTML = '✓ Al menos 6 caracteres';
            reqLength.style.color = '#28a745';
        } else {
            reqLength.innerHTML = 'Al menos 6 caracteres';
            reqLength.style.color = '#666';
        }
    });
}

function validarUsuario() {
    const usuario = document.getElementById('usuario');
    const error = document.getElementById('errorUsuario');

    if (!usuario.value.trim()) {
        error.textContent = 'El nombre de usuario es requerido';
        error.classList.add('show');
        return false;
    }

    if (usuario.value.trim().length < 3) {
        error.textContent = 'El nombre de usuario debe tener al menos 3 caracteres';
        error.classList.add('show');
        return false;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(usuario.value)) {
        error.textContent = 'El usuario solo puede contener letras, números, guiones y guiones bajos';
        error.classList.add('show');
        return false;
    }

    error.classList.remove('show');
    return true;
}

function validarEmail() {
    const email = document.getElementById('email');
    const error = document.getElementById('errorEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value.trim()) {
        error.textContent = 'El email es requerido';
        error.classList.add('show');
        return false;
    }

    if (!emailRegex.test(email.value)) {
        error.textContent = 'Por favor ingresa un email válido';
        error.classList.add('show');
        return false;
    }

    error.classList.remove('show');
    return true;
}

function validarPassword() {
    const password = document.getElementById('password');
    const error = document.getElementById('errorPassword');

    if (!password.value) {
        error.textContent = 'La contraseña es requerida';
        error.classList.add('show');
        return false;
    }

    if (password.value.length < 6) {
        error.textContent = 'La contraseña debe tener al menos 6 caracteres';
        error.classList.add('show');
        return false;
    }

    error.classList.remove('show');
    validarConfirmPassword(); // Re-validar confirmación
    return true;
}

function validarConfirmPassword() {
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const error = document.getElementById('errorConfirmPassword');

    if (!confirmPassword.value) {
        error.textContent = 'Debe confirmar la contraseña';
        error.classList.add('show');
        return false;
    }

    if (password.value !== confirmPassword.value) {
        error.textContent = 'Las contraseñas no coinciden';
        error.classList.add('show');
        return false;
    }

    error.classList.remove('show');
    return true;
}

async function manejarRegistro(e) {
    e.preventDefault();

    // Validar todos los campos
    const validaciones = [
        validarUsuario(),
        validarEmail(),
        validarPassword(),
        validarConfirmPassword()
    ];

    const tipoUsuario = document.getElementById('tipoUsuario').value;
    if (!tipoUsuario) {
        alert('Por favor selecciona un tipo de cuenta');
        return;
    }

    const terminos = document.getElementById('terminos');
    if (!terminos.checked) {
        document.getElementById('errorTerminos').textContent = 'Debes aceptar los términos y condiciones';
        document.getElementById('errorTerminos').classList.add('show');
        return;
    } else {
        document.getElementById('errorTerminos').classList.remove('show');
    }

    if (!validaciones.every(v => v === true)) {
        alert('Por favor completa todos los campos correctamente');
        return;
    }

    const registroBtn = document.getElementById('registroBtn');
    registroBtn.disabled = true;
    registroBtn.textContent = 'Registrando...';

    try {
        const datos = {
            usuario: document.getElementById('usuario').value.trim(),
            email: document.getElementById('email').value.trim(),
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            tipoUsuario: tipoUsuario
        };

     const respuesta = await fetch('http://localhost/pijamas/Project-SENA-main/backend/src/routes/api.php?action=registro', {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
});

        const resultado = await respuesta.json();

        if (resultado.success) {
            mostrarMensajeExito(resultado.message);
            document.getElementById('registroForm').reset();
            
            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                window.location.href = '../../../index.html';
            }, 2000);
        } else {
            if (resultado.errores && Array.isArray(resultado.errores)) {
                resultado.errores.forEach(error => {
                    alert(error);
                });
            } else {
                alert(resultado.message || 'Error al registrar');
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión. Por favor intenta de nuevo.');
    } finally {
        registroBtn.disabled = false;
        registroBtn.textContent = 'Crear Cuenta';
    }
}

function mostrarMensajeExito(mensaje) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = '✓ ' + mensaje;
    successMessage.classList.add('show');
}

function limpiarErrores() {
    document.querySelectorAll('.error-message').forEach(elem => {
        elem.classList.remove('show');
        elem.textContent = '';
    });
}
