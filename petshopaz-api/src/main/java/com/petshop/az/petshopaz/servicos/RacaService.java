package com.petshop.az.petshopaz.servicos;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.petshop.az.petshopaz.entidades.Raca;
import com.petshop.az.petshopaz.entidades.dto.RacaDTO;
import com.petshop.az.petshopaz.repositorios.RacaRepositorio;
import com.petshop.az.petshopaz.servicos.exceptions.DatabaseException;
import com.petshop.az.petshopaz.servicos.exceptions.ResourceNotFoundException;

@Service
@Transactional
public class RacaService {
	
	@Autowired
	private RacaRepositorio repositorio;
	
	@Transactional(readOnly = true)
	public Page<RacaDTO> BuscaPaginada(PageRequest pageRequest){
		Page<Raca> page = repositorio.findAll(pageRequest);
		
		return page.map(raca -> new RacaDTO(raca));
	}
	
	@Transactional(readOnly = true)
	public RacaDTO buscarPorId(Long id) {
		Optional<Raca> obj = repositorio.findById(id);
		Raca raca = obj.orElseThrow(() -> new ResourceNotFoundException("Raca não encontrado"));
		
		return new RacaDTO(raca);
	}
	
	public RacaDTO inserirRaca(RacaDTO dto) {
		Raca raca = new Raca();
		raca.setTipoRaca(dto.getTipoRaca());
		raca = repositorio.save(raca);
		
		return new RacaDTO(raca);
	}
	
	public RacaDTO atualizarRaca(Long id, RacaDTO dto) {
		try {
			Raca raca = repositorio.getOne(id);
			raca.setTipoRaca(dto.getTipoRaca());
			raca = repositorio.save(raca);
			return new RacaDTO(raca);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Raça não encontrada. " + id);
		}
	}
	
	public void deletarRaca(Long id) {
		try {
			repositorio.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Raça não encontrada. " + id);
		}
		catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade");
		}
	}
	
	
}
