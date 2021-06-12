package com.petshop.az.petshopaz.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petshop.az.petshopaz.entidades.Pet;

@Repository
public interface PetRepositorio extends JpaRepository<Pet, Long> {

}
