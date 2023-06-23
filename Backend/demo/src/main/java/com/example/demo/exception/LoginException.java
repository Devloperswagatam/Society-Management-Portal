package com.example.demo.exception;

public class LoginException extends Exception{
	public LoginException() {};
	public LoginException(String message) {
		super(message);
	}
}
