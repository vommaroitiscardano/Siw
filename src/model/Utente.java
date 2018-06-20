package model;

public class Utente {

	private long id_Utente;
	private String nome;
	private String cognome;
	private String email;
	private String password;

	public Utente() {}
	
	public Utente(long id, String n, String c, String e, String pass ) {
		this.id_Utente = id;
		this.nome = n;
		this.cognome = c;
		this.email = e;
		this.password = pass;
	}
	

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
