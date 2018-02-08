package model;

import java.util.Date;
import java.util.Set;

public class Utente {

	private long id_Utente;
	private String nome;
	private String cognome;
	private Date dataNascita;
	private String email;
	private String password;
	//private Integer amministratore; //  1 se è amministratore, altrimenti 0
	private Set<Viaggio> viaggi;
	
	
	//public Utente() {}
	
	public Utente(long id, String n, String c, Date ddn, String e, String pass) {
		this.id_Utente = id;
		this.nome = n;
		this.cognome = c;
		this.dataNascita = ddn;
		this.email = e;
		this.password = pass;
		//this.amministratore = amm;
	}
	
	//get e set
	
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
	public Date getDataNascita() {
		return dataNascita;
	}
	public void setDataNascita(Date dataNascita) {
		this.dataNascita = dataNascita;
	}
//	public Integer getAmministratore() {
//		return amministratore;
//	}
//	public void setAmministratore(Integer amministratore) {
//		this.amministratore = amministratore;
//	}
	public Set<Viaggio> getViaggi() {
		return viaggi;
	}
	public void setViaggi(Set<Viaggio> viaggi) {
		this.viaggi = viaggi;
	}
}
