package com.petshop.az.petshopaz.tests.services;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.petshop.az.petshopaz.entities.Cliente;
import com.petshop.az.petshopaz.entities.dto.ClienteDTO;
import com.petshop.az.petshopaz.repositories.ClienteRepository;
import com.petshop.az.petshopaz.services.ClienteService;
import com.petshop.az.petshopaz.services.exceptions.ResourceNotFoundException;


@ExtendWith(SpringExtension.class)
public class ClienteServiceTests {
	
	@InjectMocks
	private ClienteService service;
	
	@Mock
	private ClienteRepository repository;
	
	private long idExistente;
	private long idNaoExistente;
	private Cliente cliente;
	private PageImpl<Cliente> page ;
	
	@BeforeEach
	 void setUp() throws Exception{
		idExistente = 1L;
		cliente = new Cliente(2L,"Kleber Lima","Rua Tal","Bairro Tal", "40400-123",123,"BA","Salvador","(71) 99999-9999");
		idNaoExistente = 3000L;
		page = new PageImpl<>(List.of(cliente));
		
		Mockito.doNothing().when(repository).deleteById(idExistente);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(idNaoExistente);
		Mockito.when(repository.buscarClientePorNome(ArgumentMatchers.anyString(), ArgumentMatchers.any())).thenReturn(page);
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(cliente);
	}
	
	@Test
	public void deletarNaoDeveFazNadaQuandoIdExistente() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.deletarCliente(idExistente);
		});
		
		Mockito.verify(repository,Mockito.times(1)).deleteById(idExistente);
	}
	
	@Test
	public void deletarDeveLancarExcecaoQuandoIdNaoExistente() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.deletarCliente(idNaoExistente);
		});
		
		Mockito.verify(repository,Mockito.times(1)).deleteById(idNaoExistente);
	}
	
	@Test
	public void buscarClientesPorNome() {
		String filtro = "";
		PageRequest pageRequest = PageRequest.of(0, 10);
		
		Page<ClienteDTO> resultado = service.BuscaPaginada(filtro, pageRequest);
		
		Assertions.assertNotNull(resultado);
		Assertions.assertFalse(resultado.isEmpty());
	}
	
	@Test
	public void inserirCliente() {
		ClienteDTO cliente = new ClienteDTO();
		
		cliente  = service.inserirCliente(cliente);
		Assertions.assertNotNull(cliente);
		
	}
	
	
	
	
	
	
	
}
