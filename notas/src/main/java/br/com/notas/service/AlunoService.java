package br.com.notas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.notas.model.Aluno;
import br.com.notas.repository.AlunoRepository;

@Service
public class AlunoService {
	
	@Autowired
	private AlunoRepository repo;
	
	public List<Aluno> getAllAlunos() {
		return repo.findAll();
	}
	
	public Aluno getAlunoById(Long id) {
		Optional<Aluno> aluno = repo.findById(id);
		
		if (aluno.isPresent()) {
			return aluno.get();
		} else {
			throw new RuntimeException("Aluno nãoo encontrado");
		}
		
	}
	
	public Aluno createAluno(Aluno aluno) {
		return repo.save(aluno);
	}
	
	public Aluno updateAluno(Long id, Aluno aluno) {
		Aluno existingAluno = getAlunoById(id);
		
		existingAluno.setNome(aluno.getNome());
		existingAluno.setDtNascimento(aluno.getDtNascimento());
		existingAluno.setCpf(aluno.getCpf());
		existingAluno.setTurma(aluno.getTurma());
		
		return repo.save(existingAluno);
		
	}
	
	public void deleteAluno(Long id) {
		Aluno aluno = getAlunoById(id);
		repo.delete(aluno);
	}
	
}
