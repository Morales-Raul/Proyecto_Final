package com.miempresa.springboot.controller;

import com.miempresa.springboot.exception.ResourceNotFoundException;
import com.miempresa.springboot.model.Role;
import com.miempresa.springboot.model.Usuario;
import com.miempresa.springboot.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioRepository.findAll();
    }

    @PostMapping("/registro")
    public Usuario registerUser(@RequestBody Usuario usuario) {
        if (usuario.getRole() == null) {
            usuario.setRole(Role.CLIENTE); // Asignar rol por defecto
        }
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public Usuario loginUser(@RequestBody Usuario usuario) {
        Optional<Usuario> existingUser = usuarioRepository.findByEmail(usuario.getEmail());
        if (existingUser.isPresent() && usuario.getPassword().equals(existingUser.get().getPassword())) {
            return existingUser.get();
        } else {
            throw new ResourceNotFoundException("Usuario no encontrado o contraseña incorrecta");
        }
    }


    @GetMapping("/{id}")
    public Usuario getUsuarioById(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
    }

    @PutMapping("/{id}")
    public Usuario updateUsuario(@PathVariable Long id, @RequestBody Usuario usuarioDetails) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        usuario.setNombre(usuarioDetails.getNombre());
        usuario.setEmail(usuarioDetails.getEmail());
        if (usuarioDetails.getPassword() != null && !usuarioDetails.getPassword().isEmpty()) {
            usuario.setPassword(usuarioDetails.getPassword());
        }
        usuario.setRole(usuarioDetails.getRole());

        return usuarioRepository.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));

        usuarioRepository.delete(usuario);
    }
}