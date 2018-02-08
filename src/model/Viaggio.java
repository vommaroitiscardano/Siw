 package model;

public class Viaggio {

	private long idViaggio;
	private long idBiglietti;
	private Luogo origine;
	private Luogo destinazione;

	
	public long getIdViaggio() {
		return idViaggio;
	}

	public void setIdViaggio(long idViaggio) {
		this.idViaggio = idViaggio;
	}
	public long getIdBiglietti() {
		return idBiglietti;
	}

	public void setIdBiglietti(long idBiglietti) {
		this.idBiglietti = idBiglietti;
	}
	
	
	public Luogo getOrigine() {
		return origine;
	}

	public void setOrigine(Luogo origine) {
		this.origine = origine;
	}

	public Luogo getDestinazione() {
		return destinazione;
	}

	public void setDestinazione(Luogo destinazione) {
		this.destinazione = destinazione;
	}


}
