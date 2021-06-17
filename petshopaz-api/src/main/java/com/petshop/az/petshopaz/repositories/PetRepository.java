package com.petshop.az.petshopaz.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petshop.az.petshopaz.entities.Pet;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
	
	Page<Pet> findByClienteId(Long idCliente,Pageable pageable);

}
