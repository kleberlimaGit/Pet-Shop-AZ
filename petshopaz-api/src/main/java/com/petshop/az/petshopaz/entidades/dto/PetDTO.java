package com.petshop.az.petshopaz.entidades.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.petshop.az.petshopaz.entidades.Cliente;
import com.petshop.az.petshopaz.entidades.Pet;
import com.petshop.az.petshopaz.entidades.Raca;

public class PetDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "campo nome não pode ser vazio.")
	private String nome;
	
	@NotBlank(message = "campo raca não pode ser vazio.")
	private Raca raca;
	
	public PetDTO() {
		
	}

	public PetDTO(Long id, String nome, Raca raca,Cliente cliente) {
		this.id = id;
		this.nome = nome;
		this.raca = raca;
	}
	
	public PetDTO(Pet pets) {
		id = pets.getId();
		nome = pets.getNome();
		raca = pets.getRaca();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Raca getRaca() {
		return raca;
	}

	public void setRaca(Raca raca) {
		this.raca = raca;
	}

	
	
	
	
}
