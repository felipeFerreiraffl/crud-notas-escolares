package br.com.notas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.notas.model.Nota;

public interface NotaRepository extends JpaRepository<Nota, Long> {
	List<Nota> findByAlunoId(Long alunoId);
	List<Nota> findByDisciplinaId(Long discId);
}
