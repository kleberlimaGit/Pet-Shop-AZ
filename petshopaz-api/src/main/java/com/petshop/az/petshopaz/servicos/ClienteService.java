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

import com.petshop.az.petshopaz.entidades.Cliente;
import com.petshop.az.petshopaz.entidades.dto.ClienteDTO;
import com.petshop.az.petshopaz.repositorios.ClienteRepositorio;
import com.petshop.az.petshopaz.servicos.exceptions.DatabaseException;
import com.petshop.az.petshopaz.servicos.exceptions.ResourceNotFoundException;

@Service
@Transactional
public class ClienteService {
	
	@Autowired
	private ClienteRepositorio repositorio;
	
	@Transactional(readOnly = true)
	public Page<ClienteDTO> BuscaPaginada(String filtro, PageRequest pageRequest){
		Page<Cliente> page;
		if(filtro.isBlank() || !repositorio.buscarClientePorNome(filtro, pageRequest).isEmpty()){
			 page = repositorio.buscarClientePorNome(filtro, pageRequest);
		}else {
			page = repositorio.buscarClientePorPetOuRaca(filtro, pageRequest);
		}
		
//		repositorio.buscarClientesComPet(page.getContent());
		
		return page.map(cliente -> new ClienteDTO(cliente));
	}
	
	@Transactional(readOnly = true)
	public ClienteDTO buscarPorId(Long id) {
		Optional<Cliente> obj = repositorio.findById(id);
		Cliente cliente = obj.orElseThrow(() -> new ResourceNotFoundException("Cliente não encontrado"));
		
		return new ClienteDTO(cliente);
	}
	
	public ClienteDTO inserirCliente(ClienteDTO dto) {
		Cliente cliente = new Cliente();
		copiarEntidade(dto, cliente);
		cliente = repositorio.save(cliente);
		
		return new ClienteDTO(cliente);
	}
	
	public ClienteDTO atualizarCliente(Long id, ClienteDTO dto) {
		try {
			Cliente cliente = repositorio.getOne(id);
			copiarEntidade(dto, cliente);
			cliente = repositorio.save(cliente);
			
			return new ClienteDTO(cliente);
		}
		catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Cliente não encontrado. id: " + id);
		}
	}
	
	public void deletarCliente(Long id) {
		try {
			repositorio.deleteById(id);
		}
		
		catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Cliente não encontrado. id: " + id);
		}
		
		catch (DataIntegrityViolationException  e) {
			throw new DatabaseException("Violação de integridade");
		}
	}
	
	
	private void copiarEntidade(ClienteDTO dto, Cliente cliente) {
		cliente.setNome(dto.getNome());
		cliente.setBairro(dto.getBairro());
		cliente.setCep(dto.getCep());
		cliente.setCidade(dto.getCidade());
		cliente.setLogradouro(dto.getLogradouro());
		cliente.setNumero(dto.getNumero());
		cliente.setUf(dto.getUf());
		cliente.setTelefone(dto.getTelefone());
	}
}
