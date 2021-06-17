package com.petshop.az.petshopaz.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.petshop.az.petshopaz.entities.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
	
	
	@Query("SELECT DISTINCT obj from Cliente obj "
			+ "join obj.pets pets "
			+ "join pets.raca raca "
			+ "WHERE "
			+ "LOWER(pets.nome) LIKE LOWER(CONCAT('%', :filtro , '%' )) "
			+ "OR LOWER(raca.tipoRaca) LIKE LOWER(CONCAT('%', :filtro , '%' )) "
			+ "")
	Page<Cliente> buscarClientePorPetOuRaca(String filtro, Pageable pageable);
	
	@Query("SELECT DISTINCT obj from Cliente obj "
			+ "WHERE (:filtro IS NULL OR LOWER(obj.nome) LIKE LOWER(CONCAT('%', :filtro , '%' ))) ") 
	Page<Cliente> buscarClientePorNome(String filtro, Pageable pageable);
	
	
	
}
