package com.petshop.az.petshopaz.servicos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.petshop.az.petshopaz.entidades.Cliente;
import com.petshop.az.petshopaz.entidades.dto.ClienteDTO;
import com.petshop.az.petshopaz.repositorios.ClienteRepositorio;

@Service
@Transactional
public class ClienteService {
	
	@Autowired
	private ClienteRepositorio repositorio;
	
	@Transactional(readOnly = true)
	public Page<ClienteDTO> BuscaPaginada(String filtro, PageRequest pageRequest){
		
		Page<Cliente> page = repositorio.BuscarClientePorNomeOuPetOuRaca(filtro, pageRequest);
		
		Page<ClienteDTO> pageDto = page.map(cliente -> new ClienteDTO(cliente));
		
		return pageDto;
	}
}
