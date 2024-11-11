document.addEventListener('DOMContentLoaded', () => {
    function showSection(sectionId) {
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    function getReservations() {
        const usuarioIdElement = document.getElementById('reservaUsuarioId');
        if (!usuarioIdElement) {
            console.error('Elemento usuarioId no encontrado');
            return;
        }
        const usuarioId = usuarioIdElement.value;

        axios.get(`http://localhost:8080/reservas?usuarioId=${usuarioId}`)
        .then(response => {
            const reservationsList = document.getElementById('reservations-list');
            reservationsList.innerHTML = '';
            response.data.forEach(reserva => {
                if (reserva && reserva.id && reserva.fechaInicio && reserva.fechaFin && reserva.habitacion && reserva.habitacion.id && reserva.usuario && reserva.usuario.id) {
                    const reservationItem = document.createElement('div');
                    reservationItem.innerHTML = `
                        <p><strong>ID:</strong> ${reserva.id}</p>
                        <p><strong>Fecha de Inicio:</strong> ${reserva.fechaInicio}</p>
                        <p><strong>Fecha de Fin:</strong> ${reserva.fechaFin}</p>
                        <p><strong>ID de Habitación:</strong> ${reserva.habitacion.id}</p>
                        <p><strong>ID de Usuario:</strong> ${reserva.usuario.id}</p>
                        <hr>
                    `;
                    reservationsList.appendChild(reservationItem);
                } else {
                    console.error('Error: Propiedades de reserva no definidas', reserva);
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener reservaciones:', error.response ? error.response.data : error.message);
        });
    }

    window.onload = () => {
        const usuarioIdElement = document.getElementById('reservaUsuarioId');
        if (usuarioIdElement) {
            getReservations();
        } else {
            console.error('Error: Elemento usuarioId no encontrado');
        }
    };
    const searchRoomsForm = document.getElementById('search-rooms-form');
    if (searchRoomsForm) {
        searchRoomsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const fechaInicio = document.getElementById('fechaInicio').value;
            const fechaFin = document.getElementById('fechaFin').value;

            axios.get(`http://localhost:8080/habitaciones/disponibilidad?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`)
            .then(response => {
                const roomsList = document.getElementById('rooms-list');
                roomsList.innerHTML = ''; 
                response.data.forEach(habitacion => {
                    const roomItem = document.createElement('div');
                    roomItem.innerHTML = `Habitación: ${habitacion.tipo}, Precio: ${habitacion.precio}, Disponible: ${habitacion.disponible ? 'Sí' : 'No'}`;
                    roomsList.appendChild(roomItem);
                });
            })
            .catch(error => {
                console.error('Error al buscar habitaciones:', error.response ? error.response.data : error.message);
            });
        });
    } else {
        console.error('Formulario de búsqueda de habitaciones no encontrado');
    }

    const makeReservationForm = document.getElementById('make-reservation-form');
    if (makeReservationForm) {
        makeReservationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const usuarioId = document.getElementById('reservaUsuarioId').value;
            const habitacionId = document.getElementById('reservaHabitacionId').value;
            const fechaInicio = document.getElementById('reservaFechaInicio').value;
            const fechaFin = document.getElementById('reservaFechaFin').value;

            if (!usuarioId || !habitacionId || !fechaInicio || !fechaFin) {
                console.error('Todos los campos son obligatorios.');
                return;
            }

            axios.post('http://localhost:8080/reservas', {
                usuario: { id: usuarioId },
                habitacion: { id: habitacionId },
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            })
            .then(response => {
                console.log('Reservación creada:', response.data);
                makeReservationForm.reset();
                getReservations();
            })
            .catch(error => {
                console.error('Error al crear reservación:', error.response ? error.response.data : error.message);
            });
        });
    } else {
        console.error('Formulario de hacer reservación no encontrado');
    }
    const modifyReservationForm = document.getElementById('modify-reservation-form');
    if (modifyReservationForm) {
        modifyReservationForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const id = document.getElementById('modificarId').value;
            const fechaInicio = document.getElementById('modificarFechaInicio').value;
            const fechaFin = document.getElementById('modificarFechaFin').value;

            axios.put(`http://localhost:8080/reservas/${id}`, {
                fechaInicio: fechaInicio,
                fechaFin: fechaFin
            })
            .then(response => {
                console.log('Reservación modificada:', response.data);
                getReservations(); 
            })
            .catch(error => {
                console.error('Error al modificar reservación:', error.response ? error.response.data : error.message);
            });
        });
    } else {
        console.error('Formulario de modificar reservación no encontrado');
    }

    window.cancelReservation = function() {
        const id = document.getElementById('modificarId').value;
        axios.delete(`http://localhost:8080/reservas/${id}`)
        .then(response => {
            console.log('Reservación cancelada:', response.data);
            getReservations(); 
        })
        .catch(error => {
            console.error('Error al cancelar reservación:', error.response ? error.response.data : error.message);
        });
    }
});
