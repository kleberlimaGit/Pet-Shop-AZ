package com.petshop.az.petshopaz.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.petshop.az.petshopaz.entities.Cliente;
import com.petshop.az.petshopaz.entities.Pet;
import com.petshop.az.petshopaz.entities.Raca;
import com.petshop.az.petshopaz.entities.dto.PetDTO;
import com.petshop.az.petshopaz.repositories.ClienteRepository;
import com.petshop.az.petshopaz.repositories.PetRepository;
import com.petshop.az.petshopaz.repositories.RacaRepository;
import com.petshop.az.petshopaz.services.exceptions.ResourceNotFoundException;

@Service
@Transactional
public class PetService {
	
	@Autowired
	private PetRepository repository;
	
	@Autowired
	private ClienteRepository clienteRepository;
	
	@Autowired
	private RacaRepository racaRepository;
	

	
	
		
		@Transactional(readOnly = true)
		public Page<PetDTO> BuscaPaginada(Long idCliente, PageRequest pageRequest){
			Page<Pet> page = repository.findByClienteId(idCliente,pageRequest);
			
			return page.map(pet -> new PetDTO(pet));
		}
	
	
	@Transactional(readOnly = true)
	public PetDTO buscarPorId(Long id) {
		Optional<Pet> obj = repository.findById(id);
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
		pet = repository.save(pet);
		
		return new PetDTO(pet);
	}
	
	public PetDTO atualizarPet(Long id, PetDTO petDto) {
		try {
			Raca raca = racaRepository.getOne(petDto.getRaca().getId());
			Pet pet = repository.getOne(id);
			pet.setNome(petDto.getNome());
			pet.setRaca(raca);
			pet = repository.save(pet);
			
			return new PetDTO(pet);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Pet não encontrado. " + id);
		}
	}
	
	public void deletarPet(Long id) {
		try {
			repository.deleteById(id);
		}
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Pet não encontrado. " + id);
		}
	}
	
	
}
