package com.petshop.az.petshopaz.entidades.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.br.CPF;

import com.petshop.az.petshopaz.entidades.Cliente;

public class ClienteDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "campo nome não pode ser vazio.")
	private String nome;
	
	@NotBlank(message = "campo cpf não pode ser vazio.")
	@CPF(message = "Digite um cpf válido")
	private String cpf;
	
	@NotBlank(message = "campo telefone não pode ser vazio.")
	private String telefone;
	
	@OneToMany(mappedBy = "cliente")
	Set<PetDTO> pets = new HashSet<>();

	public ClienteDTO() {
		
	}

	public ClienteDTO(Long id, String nome, String cpf, String telefone) {
		this.id = id;
		this.nome = nome;
		this.cpf = cpf;
		this.telefone = telefone;
	}
	
	public ClienteDTO(Cliente cliente) {
		id = cliente.getId();
		nome = cliente.getNome();
		cpf = cliente.getCpf();
		telefone = cliente.getTelefone();
		cliente.getPets().forEach(pet -> this.pets.add(new PetDTO(pet)));
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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public Set<PetDTO> getPets() {
		return pets;
	}
	
	
	
	
	
}
