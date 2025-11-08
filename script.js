// ===================================
// CONFIGURACIÓN Y CONSTANTES
// ===================================

const CONFIG = {
    // Aquí pueden agregar sus endpoints de API
    API_ENDPOINTS: {
        register: '/api/register',
        login: '/api/login',
        googleAuth: '/api/auth/google'
    }
};

// ===================================
// FUNCIONES DE UTILIDAD
// ===================================

/**
 * Función helper para hacer requests a la API
 * @param {string} url - URL del endpoint
 * @param {object} options - Opciones del fetch
 */
async function apiRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
}

/**
 * Muestra un mensaje de notificación al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de mensaje (success, error, info)
 */
function showNotification(message, type = 'info') {
    // TODO: Implementar un sistema de notificaciones toast
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(message); // Placeholder temporal
}

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// FUNCIONES DE NAVEGACIÓN
// ===================================

/**
 * Función para redirigir a la página de creación de club
 * Los programadores deben implementar el destino correcto
 */
function redirectToCreateClub() {
    console.log('Redirigiendo a crear club...');
    // TODO: Implementar la redirección correcta
    // window.location.href = '/crear-club';
    showNotification('Funcionalidad de creación de club - Por implementar', 'info');
}

/**
 * Función para redirigir al login
 * Los programadores deben implementar el destino correcto
 */
function redirectToLogin() {
    console.log('Redirigiendo al login...');
    // TODO: Implementar la redirección correcta
    // window.location.href = '/login';
    showNotification('Funcionalidad de login - Por implementar', 'info');
}

// ===================================
// FUNCIONES DE AUTENTICACIÓN
// ===================================

/**
 * Maneja el registro de usuario con email
 * @param {string} email - Email del usuario
 */
async function handleEmailRegistration(email) {
    if (!isValidEmail(email)) {
        showNotification('Por favor ingresá un email válido', 'error');
        return;
    }

    console.log('Registrando usuario con email:', email);
    
    try {
        // TODO: Los programadores deben implementar la llamada real a la API
        // const response = await apiRequest(CONFIG.API_ENDPOINTS.register, {
        //     method: 'POST',
        //     body: JSON.stringify({ email })
        // });
        
        // Simulación temporal
        showNotification('Registro exitoso! Revisa tu email para continuar.', 'success');
        
        // Opcional: Limpiar el formulario
        document.getElementById('email').value = '';
        
    } catch (error) {
        showNotification('Error al registrar. Por favor intenta nuevamente.', 'error');
        console.error('Error en registro:', error);
    }
}

/**
 * Maneja el login con Google
 */
async function handleGoogleLogin() {
    console.log('Iniciando login con Google...');
    
    try {
        // TODO: Los programadores deben implementar la integración con Google OAuth
        // Ejemplo básico de implementación:
        // 
        // 1. Redirigir a Google OAuth:
        // window.location.href = 'YOUR_GOOGLE_OAUTH_URL';
        //
        // 2. O usar Google Sign-In SDK:
        // const auth2 = await gapi.auth2.getAuthInstance();
        // const googleUser = await auth2.signIn();
        // const token = googleUser.getAuthResponse().id_token;
        // 
        // 3. Enviar el token al backend:
        // const response = await apiRequest(CONFIG.API_ENDPOINTS.googleAuth, {
        //     method: 'POST',
        //     body: JSON.stringify({ token })
        // });
        
        showNotification('Funcionalidad de Google login - Por implementar', 'info');
        
    } catch (error) {
        showNotification('Error al iniciar sesión con Google', 'error');
        console.error('Error en Google login:', error);
    }
}

// ===================================
// EVENT LISTENERS
// ===================================

/**
 * Inicializa todos los event listeners cuando el DOM está listo
 */
function initializeEventListeners() {
    // Botones de "Crear club" en header y hero
    const btnHeaderCreate = document.getElementById('btn-header-create');
    const btnHeroCreate = document.getElementById('btn-hero-create');
    
    if (btnHeaderCreate) {
        btnHeaderCreate.addEventListener('click', redirectToCreateClub);
    }
    
    if (btnHeroCreate) {
        btnHeroCreate.addEventListener('click', redirectToCreateClub);
    }

    // Formulario de registro
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            handleEmailRegistration(email);
        });
    }

    // Botón de registro directo
    const btnRegister = document.getElementById('btn-register');
    if (btnRegister) {
        btnRegister.addEventListener('click', (e) => {
            if (e.target.form) {
                // Si está dentro de un form, el form manejará el submit
                return;
            }
            // Si no está en un form, manejar manualmente
            e.preventDefault();
            const email = document.getElementById('email').value;
            handleEmailRegistration(email);
        });
    }

    // Botón de login con Google
    const btnGoogleLogin = document.getElementById('btn-google-login');
    if (btnGoogleLogin) {
        btnGoogleLogin.addEventListener('click', handleGoogleLogin);
    }

    // Link de "Ya tengo cuenta - Ingresar"
    const linkLogin = document.getElementById('link-login');
    if (linkLogin) {
        linkLogin.addEventListener('click', (e) => {
            e.preventDefault();
            redirectToLogin();
        });
    }

    // Smooth scroll para navegación interna (si se agregan anclas)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// FUNCIONES DE ANIMACIÓN
// ===================================

/**
 * Agrega animaciones de scroll reveal a elementos
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar secciones para animaciones
    document.querySelectorAll('.feature-section, .benefit-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Maneja el efecto parallax suave en elementos decorativos
 */
function initializeParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                // Parallax en elementos decorativos (opcional)
                const decorativeElements = document.querySelectorAll('.decorative-bg, .cta-decorative-bg');
                decorativeElements.forEach(el => {
                    const speed = 0.5;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ===================================
// INICIALIZACIÓN
// ===================================

/**
 * Función principal que se ejecuta cuando el DOM está listo
 */
function init() {
    console.log('Inicializando landing page de Suscri...');
    
    // Inicializar event listeners
    initializeEventListeners();
    
    // Inicializar animaciones (opcional)
    initializeScrollAnimations();
    
    // Inicializar parallax (opcional)
    // initializeParallax();
    
    console.log('Landing page inicializada correctamente');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===================================
// EXPORTS PARA USO EXTERNO
// ===================================

// Si tus programadores necesitan acceder a estas funciones desde otros archivos
window.SuscriLanding = {
    redirectToCreateClub,
    redirectToLogin,
    handleEmailRegistration,
    handleGoogleLogin,
    showNotification,
    isValidEmail
};

// ===================================
// NOTAS PARA LOS PROGRAMADORES
// ===================================

/*
INSTRUCCIONES PARA IMPLEMENTACIÓN:

1. CREAR CLUB:
   - Funciones: redirectToCreateClub()
   - Botones: #btn-header-create, #btn-hero-create
   - Actualizar la URL de destino en la función

2. LOGIN:
   - Función: redirectToLogin()
   - Elemento: #link-login
   - Actualizar la URL de destino en la función

3. REGISTRO CON EMAIL:
   - Función: handleEmailRegistration(email)
   - Formulario: #registration-form
   - Campo: #email
   - Botón: #btn-register
   - Implementar llamada a API en CONFIG.API_ENDPOINTS.register

4. LOGIN CON GOOGLE:
   - Función: handleGoogleLogin()
   - Botón: #btn-google-login
   - Implementar Google OAuth según documentación:
     https://developers.google.com/identity/sign-in/web

5. NOTIFICACIONES:
   - Función: showNotification(message, type)
   - Reemplazar el alert() con un sistema de toast/notifications más elegante
   - Sugerencia: usar librerías como toastify-js, notyf, o implementar custom

6. API CONFIGURATION:
   - Actualizar CONFIG.API_ENDPOINTS con los endpoints reales
   - Agregar autenticación/headers necesarios en apiRequest()

7. OPCIONAL - ANIMACIONES:
   - Las funciones de animación están comentadas
   - Descomentar initializeParallax() en init() si se desea el efecto parallax
   - Agregar clases CSS para .animate-in si se usa scroll reveal

8. TESTING:
   - Todos los botones tienen console.log para debugging
   - Verificar que todos los IDs coincidan con el HTML
   - Testear flujos de error y success

ESTRUCTURA DE RESPUESTAS ESPERADAS DE LA API:

Registro:
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "userId": "...",
    "email": "..."
  }
}

Error:
{
  "success": false,
  "message": "Error descriptivo",
  "errors": ["detalle 1", "detalle 2"]
}
*/
