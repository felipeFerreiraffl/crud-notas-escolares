package br.com.notas.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.notas.model.Nota;
import br.com.notas.repository.NotaRepository;

@Service
public class NotaService {
	
	@Autowired
	private NotaRepository repo;
	
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
	
	public Nota createNota(Nota nota) {
		return repo.save(nota);
	}
	
	public Nota updateNota(Long id, Nota nota) {
		Nota existingNota = getNotaById(id);
		
		existingNota.setValoresNota(nota.getValoresNota());
		existingNota.setAluno(nota.getAluno());
		existingNota.setDisciplina(nota.getDisciplina());
		
		return repo.save(existingNota);
		
	}
	
	public void deleteNota(Long id) {
		Nota nota = getNotaById(id);
		repo.delete(nota);
	}
}
