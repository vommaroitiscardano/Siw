	package model;

import java.sql.Date;

public class Commento {

	private Long idCommento;
	private String messaggio;
	private String utente;
	private Long idPost;
	
	public String getNomeUtente() {
		return nomeUtente;
	}

	public void setNomeUtente(String nomeUtente) {
		this.nomeUtente = nomeUtente;
	}


	private String nomeUtente;


	private Date date;

	
	public Commento() {
	}
	
	public Commento(long i, String mex, String ute, String nomeU, Long idP, Date data) {
		
		this.idCommento = i;
		this.messaggio = mex;
		this.utente = ute;
		this.nomeUtente = nomeU;
		this.idPost = idP;
		this.date = data;
		
	}
	

	public Long getIdCommento() {
		return idCommento;
	}

	public void setIdCommento(Long idCommento) {
		this.idCommento = idCommento;
	}

	public String getMessaggio() {
		return messaggio;
	}

	public void setMessaggio(String messaggio) {
		this.messaggio = messaggio;
	}

	public String getUtente() {
		return utente;
	}

	public void setUtente(String utente) {
		this.utente = utente;
	}
	
	public Long getIdPost() {
		return idPost;
	}

	public void setIdPost(Long idPost) {
		this.idPost = idPost;
	}
	
	public Date getDate() {
		return date;
	}
	

	public void setDate(Date date) {
		this.date = date;
	}
	
}
