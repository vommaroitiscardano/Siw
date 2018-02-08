package model;

import java.sql.Time;
import java.util.Date;

public class Biglietto {
	
	private long idBiglietto;
	private Volo volo;
	private long prezzo;
	private Date dataAcquisto;
	private Time oraAcquisto;
	
	public long getIdBiglietto() {
		return idBiglietto;
	}
	public void setIdBiglietto(long idBiglietto) {
		this.idBiglietto = idBiglietto;
	}
	public Volo getVolo() {
		return volo;
	}
	public void setVolo(Volo volo) {
		this.volo = volo;
	}
	public long getPrezzo() {
		return prezzo;
	}
	public void setPrezzo(long prezzo) {
		this.prezzo = prezzo;
	}
	public Date getDataAcquisto() {
		return dataAcquisto;
	}
	public void setDataAcquisto(Date dataAcquisto) {
		this.dataAcquisto = dataAcquisto;
	}
	public Time getOraAcquisto() {
		return oraAcquisto;
	}
	public void setOraAcquisto(Time oraAcquisto) {
		this.oraAcquisto = oraAcquisto;
	}	
}
