package br.com.notas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.notas.model.Disciplina;
import br.com.notas.service.DisciplinaService;

@RestController
@RequestMapping("/disciplina")
public class DisciplinaController {
	
	@Autowired
	private DisciplinaService serv;
	
	@GetMapping
	public List<Disciplina> getAllDisc() {
		return serv.getAllDisciplina();
	}
	
	@GetMapping("/{id}")
	public Disciplina getDiscbyId(@PathVariable Long id) {
		return serv.getDisciplinaById(id);
	}
	
	@PostMapping
	public Disciplina createDisc(@RequestBody Disciplina disc) {
		return serv.createDisc(disc);
	}
	
	@PutMapping("/{id}")
	public Disciplina updateDisc(@PathVariable Long id, @RequestBody Disciplina disc) {
		return serv.updateDisc(id, disc);
	}
	
	@DeleteMapping("/{id}")
	public void deleteDisc(@PathVariable Long id) {
		serv.deleteDisc(id);
	}
	
}
