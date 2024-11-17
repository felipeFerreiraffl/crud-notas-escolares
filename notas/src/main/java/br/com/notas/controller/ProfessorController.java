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

import br.com.notas.model.Professor;
import br.com.notas.service.ProfessorService;

@RestController
@RequestMapping("/professor")
public class ProfessorController {
	
	@Autowired
	private ProfessorService serv;
	
	@GetMapping
	public List<Professor> getAllProfs() {
		return serv.getAllProfs();
	}
	
	@GetMapping("/{id}")
	public Professor getProfbyId(@PathVariable Long id) {
		return serv.getProfById(id);
	}
	
	@PostMapping
	public Professor createProf(@RequestBody Professor prof) {
		return serv.createProf(prof);
	}
	
	@PutMapping("/{id}")
	public Professor updateProf(@PathVariable Long id, @RequestBody Professor prof) {
		return serv.updateProf(id, prof);
	}
	
	@DeleteMapping("/{id}")
	public void deleteProf(@PathVariable Long id) {
		serv.deleteProf(id);
	}
	
}
