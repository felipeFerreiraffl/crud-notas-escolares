package br.com.notas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.notas.model.Disciplina;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {}
