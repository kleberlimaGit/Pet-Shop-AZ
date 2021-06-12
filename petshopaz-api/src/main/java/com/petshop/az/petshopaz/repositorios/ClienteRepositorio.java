package com.petshop.az.petshopaz.repositorios;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.petshop.az.petshopaz.entidades.Cliente;

@Repository
public interface ClienteRepositorio extends JpaRepository<Cliente, Long> {
	
	
	@Query("SELECT DISTINCT obj from Cliente obj "
			+ "join obj.pets pets "
			+ "join pets.raca raca "
			+ "WHERE :filtro IS NULL OR obj.nome LIKE :filtro OR pets.nome LIKE :filtro OR raca.tipoRaca LIKE :filtro")
	Page<Cliente> BuscarClientePorNomeOuPetOuRaca(String filtro, Pageable pageable);
}
