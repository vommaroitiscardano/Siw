package model;

import java.util.HashMap;
import java.util.Set;

public class Utente {

	private long id_Utente;
	private String nome;
	private String cognome;
	private String email;
	private String password;
	//private Integer amministratore; //  1 se è amministratore, altrimenti 0
	

	//private HashMap<Long, Post> post;
	
	public Utente() {}
	
	public Utente(long id, String n, String c, String e, String pass ) {
		this.id_Utente = id;
		this.nome = n;
		this.cognome = c;
		this.email = e;
		this.password = pass;
	//	this.post = new HashMap<>();
		//this.amministratore = amm;
	}
	
	//get e set
	
//	public HashMap<Long, Post> getPost() {
//		return post;
//	}
//
//	public void setPost(HashMap<Long, Post> post) {
//		this.post = post;
//	}

	public long getId_Utente() {
		return id_Utente;
	}
	public void setId_Utente(long id_Utente) {
		this.id_Utente = id_Utente;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getCognome() {
		return cognome;
	}
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

}
