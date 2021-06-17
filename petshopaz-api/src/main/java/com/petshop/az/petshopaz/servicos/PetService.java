package com.petshop.az.petshopaz.servicos;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.petshop.az.petshopaz.entidades.Cliente;
import com.petshop.az.petshopaz.entidades.Pet;
import com.petshop.az.petshopaz.entidades.Raca;
import com.petshop.az.petshopaz.entidades.dto.PetDTO;
import com.petshop.az.petshopaz.repositorios.ClienteRepositorio;
import com.petshop.az.petshopaz.repositorios.PetRepositorio;
import com.petshop.az.petshopaz.repositorios.RacaRepositorio;
import com.petshop.az.petshopaz.servicos.exceptions.ResourceNotFoundException;

@Service
@Transactional
public class PetService {
	
	@Autowired
	private PetRepositorio repositorio;
	
	@Autowired
	private ClienteRepositorio clienteRepository;
	
	@Autowired
	private RacaRepositorio racaRepository;
	

	
	
		
		@Transactional(readOnly = true)
		public Page<PetDTO> BuscaPaginada(Long idCliente, PageRequest pageRequest){
			Page<Pet> page = repositorio.findByClienteId(idCliente,pageRequest);
			
			return page.map(pet -> new PetDTO(pet));
		}
	
	
	@Transactional(readOnly = true)
	public PetDTO buscarPorId(Long id) {
		Optional<Pet> obj = repositorio.findById(id);
		Pet pet = obj.orElseThrow(() -> new ResourceNotFoundException("Pet não encontrado"));
		
		return new PetDTO(pet);
	}
	
	public PetDTO inserirPet(Long idCliente, PetDTO petDto) {
		Pet pet = new Pet();
		Cliente cliente = clienteRepository.getOne(idCliente);
		Raca raca = racaRepository.getOne(petDto.getRaca().getId());
		pet.setNome(petDto.getNome());
		pet.setRaca(raca);
		pet.setCorDoPelo(petDto.getCorDoPelo());
		pet.setCliente(cliente);
		pet = repositorio.save(pet);
		
		return new PetDTO(pet);
	}
	
	public PetDTO atualizarPet(Long id, PetDTO petDto) {
		try {
			Raca raca = racaRepository.getOne(petDto.getRaca().getId());
			Pet pet = repositorio.getOne(id);
			pet.setNome(petDto.getNome());
			pet.setRaca(raca);
			pet = repositorio.save(pet);
			
			return new PetDTO(pet);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Pet não encontrado. " + id);
		}
	}
	
	public void deletarPet(Long id) {
		try {
			repositorio.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Pet não encontrado. " + id);
		}
	}
	
	
}
