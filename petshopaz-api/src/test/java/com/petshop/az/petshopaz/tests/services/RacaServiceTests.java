package com.petshop.az.petshopaz.tests.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.petshop.az.petshopaz.repositories.RacaRepository;
import com.petshop.az.petshopaz.services.RacaService;
import com.petshop.az.petshopaz.services.exceptions.DatabaseException;

@ExtendWith(SpringExtension.class)
public class RacaServiceTests {
	
	@InjectMocks
	private RacaService service;
	
	@Mock
	private RacaRepository repository;
	
	
	private long idDependente;
	
	
	@BeforeEach
	 void setUp() throws Exception{
		
		idDependente = 2L;
		
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(idDependente);
		
	}
	
	
	@Test
	
	public void deletarDeveRetornarDatabaseException() {
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.deletarRaca(idDependente);
		});
		
		Mockito.verify(repository,Mockito.times(1)).deleteById(idDependente);
	}

}
