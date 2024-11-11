package com.miempresa.springboot.repository;

import com.miempresa.springboot.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    @Query("SELECT r FROM Reserva r WHERE r.habitacion.id = :habitacionId AND ((r.fechaInicio <= :fechaFin AND r.fechaFin >= :fechaInicio))")
    List<Reserva> findReservasByHabitacionAndFecha(Long habitacionId, Date fechaInicio, Date fechaFin);
}
