package br.com.notas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.notas.model.Aluno;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {}
