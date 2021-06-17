package com.petshop.az.petshopaz.entities.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.petshop.az.petshopaz.entities.Cliente;

public class ClienteDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "campo nome não pode ser vazio.")
	private String nome;

	@NotBlank(message = "Campo logradouro não pode ser vazio")
	private String logradouro;

	@NotBlank(message = "Campo bairro não pode ser vazio")
	private String bairro;

	@Size(min = 8, max = 10)
	@NotBlank(message = "Campo CEP não pode ser vazio")
	private String cep;
	
	@NotNull(message = "Campo número não pode ser vazio")
	private int numero;

	@NotBlank(message = "Campo UF não pode ser vazio")
	private String uf;

	@NotBlank(message = "Campo cidade não pode ser vazio")
	private String cidade;

	@NotBlank(message = "campo telefone não pode ser vazio.")
	@Size(min = 15, max=15)
	private String telefone;

	Set<PetDTO> pets = new HashSet<>();

	public ClienteDTO() {

	}

	public ClienteDTO(Cliente cliente) {
		id = cliente.getId();
		nome = cliente.getNome();
		bairro = cliente.getBairro();
		cep = cliente.getCep();
		cidade = cliente.getCidade();
		logradouro = cliente.getLogradouro();
		numero = cliente.getNumero();
		uf = cliente.getUf();
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

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
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
