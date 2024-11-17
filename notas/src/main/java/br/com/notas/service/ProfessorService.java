package br.com.notas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.notas.model.Professor;
import br.com.notas.repository.ProfessorRepository;

@Service
public class ProfessorService {
	
	@Autowired
	private ProfessorRepository repo;
	
	public List<Professor> getAllProfs() {
		return repo.findAll();
	}
	
	public Professor getProfById(Long id) {
		Optional<Professor> prof = repo.findById(id);
		
		if (prof.isPresent()) {
			return prof.get();
		} else {
			throw new RuntimeException("Aluno nãoo encontrado");
		}
		
	}
	
	public Professor createProf(Professor prof) {
		return repo.save(prof);
	}
	
	public Professor updateProf(Long id, Professor prof) {
		Professor existingProf = getProfById(id);
		
		existingProf.setNome(prof.getNome());
		existingProf.setDtNascimento(prof.getDtNascimento());
		existingProf.setCpf(prof.getCpf());
		existingProf.setAreaEnsino(prof.getAreaEnsino());
		
		return repo.save(existingProf);
		
	}
	
	public void deleteProf(Long id) {
		Professor aluno = getProfById(id);
		repo.delete(aluno);
	}
}
