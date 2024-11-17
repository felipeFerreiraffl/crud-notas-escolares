package br.com.notas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.notas.model.Disciplina;
import br.com.notas.repository.DisciplinaRepository;

@Service
public class DisciplinaService {
	
	@Autowired
	private DisciplinaRepository repo;
	
	public List<Disciplina> getAllDisciplina() {
		return repo.findAll();
	}
	
	public Disciplina getDisciplinaById(Long id) {
		Optional<Disciplina> disc = repo.findById(id);
		
		if (disc.isPresent()) {
			return disc.get();
		} else {
			throw new RuntimeException("Aluno nãoo encontrado");
		}
		
	}
	
	public Disciplina createDisc(Disciplina disc) {
		return repo.save(disc);
	}
	
	public Disciplina updateDisc(Long id, Disciplina disc) {
		Disciplina existingDisc = getDisciplinaById(id);
		
		existingDisc.setNome(disc.getNome());
		existingDisc.setProfessor(disc.getProfessor());
		
		return repo.save(existingDisc);
		
	}
	
	public void deleteDisc(Long id) {
		Disciplina disc = getDisciplinaById(id);
		repo.delete(disc);
	}
}
