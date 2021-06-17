package com.petshop.az.petshopaz.controllers;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.petshop.az.petshopaz.entities.dto.PetDTO;
import com.petshop.az.petshopaz.services.PetService;

@RestController
@RequestMapping(value = "/pets")
public class PetController {

	@Autowired
	private PetService service;
	
	
	@GetMapping(value="/clientes/{clienteId}")
	public ResponseEntity<Page<PetDTO>> buscarPetsPorCliente(
			@PathVariable Long clienteId,
			@RequestParam(value = "page", defaultValue = "0") Integer pagina,
			@RequestParam(value = "linesPerPage", defaultValue = "5") Integer linhasPorPagina,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "id") String orderBy){
			PageRequest pageRequest = PageRequest.of(pagina, linhasPorPagina, Direction.valueOf(direction), orderBy);
			
			Page<PetDTO> page = service.BuscaPaginada(clienteId,pageRequest);
			
			return ResponseEntity.ok(page);
	}
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<PetDTO> buscarPorId(@PathVariable Long id) {
		PetDTO petDto = service.buscarPorId(id);
		
		return ResponseEntity.ok(petDto);
	}
	
	@PostMapping("/{idCliente}")
	public ResponseEntity<PetDTO> cadastrarPet(@Valid @RequestBody PetDTO petDto, @PathVariable Long idCliente){
		petDto = service.inserirPet(idCliente,petDto);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(petDto.getId()).toUri();
		return ResponseEntity.created(uri).body(petDto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<PetDTO> atualizarPet(@Valid @RequestBody PetDTO petDto, @PathVariable Long id){
		petDto = service.atualizarPet(id, petDto);
		return ResponseEntity.ok().body(petDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<PetDTO> deletarPet(@PathVariable Long id){
		service.deletarPet(id);
		return ResponseEntity.noContent().build();
	}
	
}
