package com.miempresa.springboot.controller;

import com.miempresa.springboot.exception.ResourceNotFoundException;
import com.miempresa.springboot.model.Habitacion;
import com.miempresa.springboot.model.Reserva;
import com.miempresa.springboot.repository.HabitacionRepository;
import com.miempresa.springboot.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/habitaciones")
public class HabitacionController {

    private final HabitacionRepository habitacionRepository;
    private final ReservaRepository reservaRepository;

    @Autowired
    public HabitacionController(HabitacionRepository habitacionRepository, ReservaRepository reservaRepository) {
        this.habitacionRepository = habitacionRepository;
        this.reservaRepository = reservaRepository;
    }

    @GetMapping
    public List<Habitacion> getAllHabitaciones() {
        return habitacionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Habitacion getHabitacionById(@PathVariable Long id) {
        return habitacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habitacion no encontrada"));
    }

    @GetMapping("/disponibilidad")
    public List<Habitacion> getDisponibilidadHabitaciones(@RequestParam Date fechaInicio, @RequestParam Date fechaFin) {
        List<Habitacion> habitaciones = habitacionRepository.findAll();

        for (Habitacion habitacion : habitaciones) {
            List<Reserva> reservas = reservaRepository.findReservasByHabitacionAndFecha(habitacion.getId(), fechaInicio, fechaFin);
            habitacion.setDisponible(reservas.isEmpty());
        }

        return habitaciones;
    }

    @PostMapping
    public Habitacion createHabitacion(@RequestBody Habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }

    @PutMapping("/{id}")
    public Habitacion updateHabitacion(@PathVariable Long id, @RequestBody Habitacion habitacionDetails) {
        Habitacion habitacion = habitacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habitacion no encontrada"));

        habitacion.setTipo(habitacionDetails.getTipo());
        habitacion.setPrecio(habitacionDetails.getPrecio());

        return habitacionRepository.save(habitacion);
    }

    @DeleteMapping("/{id}")
    public void deleteHabitacion(@PathVariable Long id) {
        Habitacion habitacion = habitacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Habitacion no encontrada"));

        habitacionRepository.delete(habitacion);
    }
}