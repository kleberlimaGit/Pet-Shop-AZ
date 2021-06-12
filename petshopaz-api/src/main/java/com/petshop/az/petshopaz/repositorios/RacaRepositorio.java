package com.petshop.az.petshopaz.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.petshop.az.petshopaz.entidades.Raca;

@Repository
public interface RacaRepositorio extends JpaRepository<Raca, Long> {

}
