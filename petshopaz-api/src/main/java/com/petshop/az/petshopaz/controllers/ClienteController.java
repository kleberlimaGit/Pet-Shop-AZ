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

import com.petshop.az.petshopaz.entities.dto.ClienteDTO;
import com.petshop.az.petshopaz.services.ClienteService;

@RestController
@RequestMapping(value = "/clientes")
public class ClienteController {

	@Autowired
	private ClienteService service;
	
	@GetMapping
	public ResponseEntity<Page<ClienteDTO>> buscarTodosClientes(
			@RequestParam(value = "filtro", defaultValue = "") String filtro,
			@RequestParam(value = "page", defaultValue = "0") Integer pagina,
			@RequestParam(value = "linesPerPage", defaultValue = "6") Integer linhasPorPagina,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "id") String orderBy){
			PageRequest pageRequest = PageRequest.of(pagina, linhasPorPagina, Direction.valueOf(direction), orderBy);
			
			Page<ClienteDTO> page = service.BuscaPaginada(filtro.trim(), pageRequest);
			
			return ResponseEntity.ok(page);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<ClienteDTO> buscarPorId(@PathVariable Long id) {
		ClienteDTO clienteDto = service.buscarPorId(id);
		
		return ResponseEntity.ok(clienteDto);
	}
	
	@PostMapping
	public ResponseEntity<ClienteDTO> cadastrarCliente(@Valid @RequestBody ClienteDTO clienteDto){
		clienteDto = service.inserirCliente(clienteDto);

		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(clienteDto.getId()).toUri();
		return ResponseEntity.created(uri).body(clienteDto);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<ClienteDTO> atualizarCliente(@Valid @RequestBody ClienteDTO clienteDto, @PathVariable Long id){
		clienteDto = service.atualizarCliente(id, clienteDto);
		return ResponseEntity.ok().body(clienteDto);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ClienteDTO> deletarCliente(@PathVariable Long id){
		service.deletarCliente(id);
		return ResponseEntity.noContent().build();
	}
	
}
