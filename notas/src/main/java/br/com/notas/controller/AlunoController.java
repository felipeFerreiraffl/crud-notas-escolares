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

import br.com.notas.model.Aluno;
import br.com.notas.service.AlunoService;

@RestController
@RequestMapping("/aluno")
public class AlunoController {
	
	@Autowired
	private AlunoService serv;
	
	@GetMapping
	public List<Aluno> getAllAlunos() {
		return serv.getAllAlunos();
	}
	
	@GetMapping("/{id}")
	public Aluno getAlunobyId(@PathVariable Long id) {
		return serv.getAlunoById(id);
	}
	
	@PostMapping
	public Aluno createAluno(@RequestBody Aluno aluno) {
		return serv.createAluno(aluno);
	}
	
	@PutMapping("/{id}")
	public Aluno updateAluno(@PathVariable Long id, @RequestBody Aluno aluno) {
		return serv.updateAluno(id, aluno);
	}
	
	@DeleteMapping("/{id}")
	public void deleteAluno(@PathVariable Long id) {
		serv.deleteAluno(id);
	}
	
}
