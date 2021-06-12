package com.petshop.az.petshopaz.entidades.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import com.petshop.az.petshopaz.entidades.Raca;

public class RacaDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo não pode ser vazio")
	private String tipoRaca;
	
	public RacaDTO() {
		
	}

	public RacaDTO(Long id, String tipoRaca) {
		this.id = id;
		this.tipoRaca = tipoRaca;
	}
	
	public RacaDTO(Raca raca) {
		id = raca.getId();
		tipoRaca = raca.getTipoRaca();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipoRaca() {
		return tipoRaca;
	}

	public void setTipoRaca(String tipoRaca) {
		this.tipoRaca = tipoRaca;
	}
	
	
}
