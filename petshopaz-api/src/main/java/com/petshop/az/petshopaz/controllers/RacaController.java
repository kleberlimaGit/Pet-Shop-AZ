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

import com.petshop.az.petshopaz.entidades.dto.RacaDTO;
import com.petshop.az.petshopaz.servicos.RacaService;

@RestController
@RequestMapping(value = "/racas")
public class RacaController {

	@Autowired
	private RacaService service;
	
	@GetMapping
	public ResponseEntity<Page<RacaDTO>> buscarTodosRacas(
			@RequestParam(value = "page", defaultValue = "0") Integer pagina,
			@RequestParam(value = "linesPerPage", defaultValue = "5") Integer linhasPorPagina,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "id") String orderBy){
			PageRequest pageRequest = PageRequest.of(pagina, linhasPorPagina, Direction.valueOf(direction), orderBy);
			
			Page<RacaDTO> page = service.BuscaPaginada(pageRequest);
			
			return ResponseEntity.ok(page);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<RacaDTO> buscarPorId(@PathVariable Long id) {
		RacaDTO racaDto = service.buscarPorId(id);
		
		return ResponseEntity.ok(racaDto);
	}
	
	@PostMapping
	public ResponseEntity<RacaDTO> cadastrarRaca(@Valid @RequestBody RacaDTO racaDto){
		racaDto = service.inserirRaca(racaDto);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(racaDto.getId()).toUri();
		return ResponseEntity.created(uri).body(racaDto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<RacaDTO> atualizarRaca(@Valid @RequestBody RacaDTO racaDto, @PathVariable Long id){
		racaDto = service.atualizarRaca(id, racaDto);
		return ResponseEntity.ok().body(racaDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<RacaDTO> deletarRaca(@PathVariable Long id){
		service.deletarRaca(id);
		return ResponseEntity.noContent().build();
	}
	
}
