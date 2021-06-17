package com.petshop.az.petshopaz.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.petshop.az.petshopaz.entities.Raca;
import com.petshop.az.petshopaz.entities.dto.RacaDTO;
import com.petshop.az.petshopaz.repositories.RacaRepository;
import com.petshop.az.petshopaz.services.exceptions.DatabaseException;
import com.petshop.az.petshopaz.services.exceptions.ResourceNotFoundException;

@Service
@Transactional
public class RacaService {
	
	@Autowired
	private RacaRepository repository;
	
	@Transactional(readOnly = true)
	public Page<RacaDTO> BuscaPaginada(PageRequest pageRequest){
		Page<Raca> page = repository.findAll(pageRequest);
		
		return page.map(raca -> new RacaDTO(raca));
	}
	
	@Transactional(readOnly = true)
	public RacaDTO buscarPorId(Long id) {
		Optional<Raca> obj = repository.findById(id);
		Raca raca = obj.orElseThrow(() -> new ResourceNotFoundException("Raca não encontrado"));
		
		return new RacaDTO(raca);
	}
	
	public RacaDTO inserirRaca(RacaDTO dto) {
		Raca raca = new Raca();
		raca.setTipoRaca(dto.getTipoRaca().toUpperCase());
		raca = repository.save(raca);
		
		return new RacaDTO(raca);
	}
	
	public RacaDTO atualizarRaca(Long id, RacaDTO dto) {
		try {
			Raca raca = repository.getOne(id);
			raca.setTipoRaca(dto.getTipoRaca());
			raca = repository.save(raca);
			return new RacaDTO(raca);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Raça não encontrada. " + id);
		}
	}
	
	public void deletarRaca(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Raça não encontrada. " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade");
		}
	}
	
	
}
