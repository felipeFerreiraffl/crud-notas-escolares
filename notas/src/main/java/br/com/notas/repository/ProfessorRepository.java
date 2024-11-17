package br.com.notas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.notas.model.Professor;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {}
