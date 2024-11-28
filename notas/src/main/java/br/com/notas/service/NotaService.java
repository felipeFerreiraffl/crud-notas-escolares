package br.com.notas.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.notas.model.Aluno;
import br.com.notas.model.Disciplina;
import br.com.notas.model.Nota;
import br.com.notas.repository.AlunoRepository;
import br.com.notas.repository.DisciplinaRepository;
import br.com.notas.repository.NotaRepository;

@Service
public class NotaService {
	
	@Autowired
	private NotaRepository repo;
	
	@Autowired
	private DisciplinaRepository discRepo;
	
	@Autowired
	private AlunoRepository alunoRepo;
	
	public List<Nota> getAllNotas() {
		return repo.findAll();
	}
	
	public Nota getNotaById(Long id) {
		Optional<Nota> nota = repo.findById(id);
		
		if (nota.isPresent()) {
			return nota.get();
		} else {
			throw new RuntimeException("Nota não encontrada");
		}
		
	}
	
	public List<Nota> getNotasbyAluno(Long alunoId) {
		return repo.findByAlunoId(alunoId);
	}
	
	// Pega todas as disciplinas
	public List<Nota> getAllNotasPorAluno(Long alunoId) {
		List<Disciplina> todasDisciplinas = discRepo.findAll();
		List<Nota> notasAluno = repo.findByAlunoId(alunoId);
		
		return todasDisciplinas.stream().map(disciplina -> {
			// Verifica se já existe uma nota para uma disciplina
			Nota nota = notasAluno.stream()
					.filter(n -> n.getDisciplina().getId().equals(disciplina.getId()))
					.findFirst()
					.orElseGet(() -> { // Cria uma nova nota com valores padrão
						Nota notaVazia = new Nota();
						notaVazia.setDisciplina(disciplina);
						notaVazia.setValoresNota(new double[]{0, 0, 0, 0});
						return notaVazia;
					});
			
			nota.setMedia(Arrays.stream(nota.getValoresNota()).average().orElse(0.0));
			
			return nota;
		}).collect(Collectors.toList());
	}
	
	public List<Nota> getNotaByDisciplina(Long discId) {
		Disciplina disciplina = discRepo.findById(discId).orElseThrow(() -> new RuntimeException("Disciplina não encontrada."));
		
		List<Nota> notasDisciplina = repo.findByDisciplinaId(discId);
		List<Aluno> alunos = alunoRepo.findAll();
		
		return alunos.stream().map(aluno -> {
			// Verifica se já existe uma nota para uma disciplina
			Nota nota = notasDisciplina.stream()
					.filter(n -> n.getAluno().getId().equals(aluno.getId()))
					.findFirst()
					.orElseGet(() -> { // Cria uma nova nota com valores padrão
						Nota notaVazia = new Nota();
						notaVazia.setAluno(aluno);
						notaVazia.setDisciplina(disciplina);
						notaVazia.setValoresNota(new double[]{0, 0, 0, 0});
						return notaVazia;
					});
			
			nota.setMedia(Arrays.stream(nota.getValoresNota()).average().orElse(0.0));
			
			return nota;
			
		}).collect(Collectors.toList());
	}
	
	public Nota createNota(Nota nota) {
		return repo.save(nota);
	}
	
	public Nota updateNota(Long id, Nota nota) {
		Nota existingNota = getNotaById(id);
		
		if (nota.getValoresNota() != null) {
			double[] newValoresNota = nota.getValoresNota();
			double[] existingValoresNota = existingNota.getValoresNota();
			
			for (int i = 0; i < existingNota.getValoresNota().length; i++) {
				if (i < newValoresNota.length && newValoresNota[i] != 0) {
					existingValoresNota[i] = newValoresNota[i];
				}
			}
			
			existingNota.setValoresNota(existingValoresNota);
		}
		
		existingNota.setAluno(nota.getAluno());
		existingNota.setDisciplina(nota.getDisciplina());
		
		return repo.save(existingNota);
		
	}
	
	public void deleteNota(Long id) {
		Nota nota = getNotaById(id);
		repo.delete(nota);
	}
}
