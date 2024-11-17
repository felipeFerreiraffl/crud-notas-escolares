package br.com.notas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.notas.model.Nota;

public interface NotaRepository extends JpaRepository<Nota, Long> {}
