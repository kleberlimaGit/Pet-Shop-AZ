package com.petshop.az.petshopaz.entidades.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.petshop.az.petshopaz.entidades.Pet;

public class PetDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "campo nome não pode ser vazio.")
	private String nome;
	
	@NotBlank(message = "campo nome não pode ser vazio.")
	private String corDoPelo;
	
	private RacaDTO raca;
	
	public PetDTO() {
		
	}


	
	public PetDTO(Long id, String nome,String corDoPelo, RacaDTO raca) {
		this.id = id;
		this.nome = nome;
		this.raca = raca;
		this.corDoPelo = corDoPelo;
	}



	public PetDTO(Pet pets) {
		id = pets.getId();
		nome = pets.getNome().toLowerCase();
		corDoPelo = pets.getCorDoPelo();
		raca = new RacaDTO(pets.getRaca());
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

	
	public String getCorDoPelo() {
		return corDoPelo;
	}



	public void setCorDoPelo(String corDoPelo) {
		this.corDoPelo = corDoPelo;
	}



	public RacaDTO getRaca() {
		return raca;
	}

	public void setRaca(RacaDTO raca) {
		this.raca = raca;
	}



	
	
	
	
}
