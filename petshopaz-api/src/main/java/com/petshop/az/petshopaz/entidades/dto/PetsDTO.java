package com.petshop.az.petshopaz.entidades.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.petshop.az.petshopaz.entidades.Cliente;
import com.petshop.az.petshopaz.entidades.Pets;
import com.petshop.az.petshopaz.entidades.Raca;

public class PetsDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "campo nome não pode ser vazio.")
	private String nome;
	
	@NotBlank(message = "campo raca não pode ser vazio.")
	private Raca raca;
	
	@NotBlank(message = "campo cliente não pode ser vazio.")
	private Cliente cliente;

	public PetsDTO() {
		
	}

	public PetsDTO(Long id, String nome, Raca raca,Cliente cliente) {
		this.id = id;
		this.nome = nome;
		this.raca = raca;
		this.cliente = cliente;
	}
	
	public PetsDTO(Pets pets) {
		id = pets.getId();
		nome = pets.getNome();
		raca = pets.getRaca();
		cliente = pets.getCliente();
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

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	
	
	
	
}
