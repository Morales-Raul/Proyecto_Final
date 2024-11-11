package com.miempresa.springboot.controller;

import com.miempresa.springboot.exception.ResourceNotFoundException;
import com.miempresa.springboot.model.Reserva;
import com.miempresa.springboot.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<Reserva> getAllReservas() {
        return reservaRepository.findAll();
    }

    @GetMapping("/{id}")
    public Reserva getReservaById(@PathVariable Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada"));
    }

    @PostMapping
    public Reserva createReserva(@RequestBody Reserva reserva) {
        if (reserva.getUsuario() == null || reserva.getHabitacion() == null || reserva.getFechaInicio() == null || reserva.getFechaFin() == null) {
            throw new IllegalArgumentException("Campos obligatorios faltantes");
        }
        return reservaRepository.save(reserva);
    }


    @PutMapping("/{id}")
    public Reserva updateReserva(@PathVariable Long id, @RequestBody Reserva reservaDetails) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada"));

        reserva.setUsuario(reservaDetails.getUsuario());
        reserva.setHabitacion(reservaDetails.getHabitacion());
        reserva.setFechaInicio(reservaDetails.getFechaInicio());
        reserva.setFechaFin(reservaDetails.getFechaFin());

        return reservaRepository.save(reserva);
    }

    @DeleteMapping("/{id}")
    public void deleteReserva(@PathVariable Long id) {
        Reserva reserva = reservaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reserva no encontrada"));

        reservaRepository.delete(reserva);
    }
}
