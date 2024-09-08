function AbrirModal() {
    const modal = document.getElementById('ModalContacto');
    const btn = document.getElementById('boton-modal-contacto');
    const span = document.getElementsByClassName('close')[0];

    // Abre el modal cuando se hace clic en el botón
    btn.onclick = function() {
        modal.classList.add('show');
        document.querySelector('.modal-content').classList.add('show');
    }

    // Cierra el modal cuando se hace clic en el botón de cerrar
    span.onclick = function() {
        modal.classList.remove('show');
        document.querySelector('.modal-content').classList.remove('show');
    }

    // Cierra el modal cuando se hace clic fuera del contenido del modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('show');
            document.querySelector('.modal-content').classList.remove('show');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    AbrirModal();

    // Agrega el evento de copiar al portapapeles
    document.getElementById('copy-button').addEventListener('click', function() {
        const emailText = document.getElementById('email-text').innerText;
        const copyMessage = document.getElementById('copy-message');

        // Usar la API del Portapapeles moderna
        navigator.clipboard.writeText(emailText).then(function() {
            // Muestra el mensaje de éxito
            copyMessage.textContent = 'Email copiado al portapapeles!';
            gsap.to(".box", { 
                duration: 2,
                backgroundColor: '#8d3dae',
            });
            copyMessage.classList.add('show'); // Muestra el mensaje
            
            // Oculta el mensaje después de 3 segundos
            setTimeout(function() {
                copyMessage.classList.remove('show');
            }, 3000);
        }).catch(function(error) {
            // Opcional: Mostrar un mensaje de error
            console.error('Error al copiar al portapapeles: ', error);
        });
    });
});