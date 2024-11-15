document.addEventListener('DOMContentLoaded', function() {
    // Inicializar EmailJS con tu clave pública
    emailjs.init("b5dq6umMjcEfyanvr"); // Reemplaza con tu public key de EmailJS
    console.log("EmailJS inicializado correctamente");

    const form = document.querySelector('.contact-form');
    const btnEnviar = document.getElementById('btnEnviar');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Deshabilitar el botón mientras se envía
        const textoOriginal = btnEnviar.textContent;
        btnEnviar.textContent = 'Enviando...';
        btnEnviar.disabled = true;

        // Obtener los valores del formulario
        const nombreC = document.getElementById('nombre').value;
        const CorreoC = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensajes').value;

        console.log("Datos del formulario obtenidos:", { nombreC, CorreoC, mensaje });

        // Parámetros para el correo
        const templateParams = {
            from_name: nombreC,
            from_email: CorreoC,
            message: mensaje,
            to_email: 'info.danielazapateria@gmail.com'
        };

        // Enviar el correo
        emailjs.send('service_r6kdbsp', 'template_d4e30d3', templateParams)
            .then(function(response) {
                console.log('Correo enviado con éxito!', response.status, response.text);
                alert('¡Mensaje enviado con éxito!');
                form.reset();
            })
            .catch(function(error) {
                console.error('Error al enviar:', error);
                alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
            })
            .finally(function() {
                btnEnviar.textContent = textoOriginal;
                btnEnviar.disabled = false;
            });
    });
});
