package com.petshop.az.petshopaz.servicos.exceptions;

public class ResultDataAccessException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	public ResultDataAccessException(String msg) {
		super(msg);
	}
}
