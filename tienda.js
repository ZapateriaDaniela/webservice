document.addEventListener('DOMContentLoaded', () => {
    // Elementos de la interfaz
    const modal = document.getElementById('modal-compra');
    const cerrarModal = document.getElementById('cerrar-modal');
    const detalleProducto = document.getElementById('detalle-producto');
    const formCompra = document.getElementById('form-compra');
    let nombreProducto = "";
    let precioProducto = 0;

    // Configuración de los botones "Comprar" para cada producto
    const botonesComprar = [
        { id: "boton-comprar1", nombreId: "nombre1", precioId: "precio1" },
        { id: "boton-comprar2", nombreId: "nombre2", precioId: "precio2" },
        { id: "boton-comprar3", nombreId: "nombre3", precioId: "precio3" },
        { id: "boton-comprar4", nombreId: "nombre4", precioId: "precio4" },
        { id: "boton-comprar5", nombreId: "nombre5", precioId: "precio5" },
        { id: "boton-comprar6", nombreId: "nombre6", precioId: "precio6" },
    ];

    botonesComprar.forEach(boton => {
        const botonElemento = document.getElementById(boton.id);
        botonElemento.addEventListener('click', () => {
            // Obtener nombre y precio del producto
            nombreProducto = document.getElementById(boton.nombreId).textContent;
            precioProducto = document.getElementById(boton.precioId).textContent.replace("$", "").replace(".", "");

            // Mostrar detalles en el modal
            detalleProducto.textContent = `Producto: ${nombreProducto} - Precio: $${precioProducto}`;

            // Abrir el modal
            modal.style.display = 'block';
        });
    });

    // Cerrar el modal
    cerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Confirmar compra y enviar correo de confirmación
    formCompra.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener datos del formulario
        const cantidad = document.getElementById('cantidad').value;
        const nombreCliente = document.getElementById('nombre').value;
        const correoCliente = document.getElementById('correo').value;

        // Calcular el total de la compra
        const totalCompra = precioProducto * cantidad;
        
        // Formatear el precio para que tenga separadores de miles
        const totalFormateado = new Intl.NumberFormat('es-CO', {
            style: 'decimal'
        }).format(totalCompra);

        try {
            // Preparar los parámetros para la plantilla
            const templateParams = {
                to_name: nombreCliente,
                to_email: correoCliente,
                product_name: nombreProducto,
                quantity: cantidad,
                total: totalFormateado,
            };

            // Enviar el correo
         await emailjs.send(
            'service_r6kdbsp',
            'template_7pgbrde',
            templateParams,
            'b5dq6umMjcEfyanvr'
        );

            // Mostrar mensaje de confirmación
            alert(`¡Gracias por tu compra, ${nombreCliente}! Se ha enviado la factura a ${correoCliente}.`);

            // Cerrar el modal
            modal.style.display = 'none';
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            alert('Hubo un error al procesar tu compra. Por favor, intenta de nuevo más tarde.');
        }
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
