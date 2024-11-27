package br.com.notas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.notas.model.Disciplina;

public interface DisciplinaRepository extends JpaRepository<Disciplina, Long> {
	List<Disciplina> findByProfessorId(Long professorId);
}
