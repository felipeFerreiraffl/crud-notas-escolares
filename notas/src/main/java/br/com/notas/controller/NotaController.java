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

import br.com.notas.model.Nota;
import br.com.notas.service.NotaService;

@RestController
@RequestMapping("/nota")
public class NotaController {
	
	@Autowired
	private NotaService serv;
	
	@GetMapping
	public List<Nota> getAllNotas() {
		return serv.getAllNotas();
	}
	
	@GetMapping("/{id}")
	public Nota getNotabyId(@PathVariable Long id) {
		return serv.getNotaById(id);
	}
	
	@PostMapping
	public Nota createNota(@RequestBody Nota nota) {
		return serv.createNota(nota);
	}
	
	@PutMapping("/{id}")
	public Nota updateNota(@PathVariable Long id, @RequestBody Nota nota) {
		return serv.updateNota(id, nota);
	}
	
	@DeleteMapping("/{id}")
	public void deleteNota(@PathVariable Long id) {
		serv.deleteNota(id);
	}
	
}
