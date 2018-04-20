package model;

public class Luogo {
	
	private long idLuogo;
	private String citta;
	private String nazione;
	
	public Luogo(long id, String city, String country) {

		this.idLuogo = id;
		this.citta = city;
		this.nazione = country;
	}
	
	
	public long getIdLuogo() {
		return idLuogo;
	}
	public void setIdLuogo(long idLuogo) {
		this.idLuogo = idLuogo;
	}
	public String getCitta() {
		return citta;
	}
	public void setCitta(String citta) {
		this.citta = citta;
	}
	public String getNazione() {
		return nazione;
	}
	public void setNazione(String nazione) {
		this.nazione = nazione;
	}
	
}
