package com.petshop.az.petshopaz.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petshop.az.petshopaz.entities.Raca;

@Repository
public interface RacaRepository extends JpaRepository<Raca, Long> {

}
