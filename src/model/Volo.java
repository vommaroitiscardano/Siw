package model;

import java.sql.Time;

public class Volo {
	
	private long idVolo;
	private Aeroporto partenza;
	private Aeroporto arrivo;
	private long prezzo;
	private Float durataVolo;
	private Time orarioVolo;


	//set e get
	public long getIdVolo() {
		return idVolo;
	}
	public void setIdVolo(long idVolo) {
		this.idVolo = idVolo;
	}
	public Aeroporto getPartenza() {
		return partenza;
	}
	public void setPartenza(Aeroporto partenza) {
		this.partenza = partenza;
	}
	public Aeroporto getArrivo() {
		return arrivo;
	}
	public void setArrivo(Aeroporto arrivo) {
		this.arrivo = arrivo;
	}
	
	public long getPrezzo() {
		return prezzo;
	}
	public void setPrezzo(long prezzo) {
		this.prezzo = prezzo;
	}
	
	public Float getDurataVolo() {
		return durataVolo;
	}
	public void setDurataVolo(Float durataVolo) {
		this.durataVolo = durataVolo;
	}
	public Time getOrarioVolo() {
		return orarioVolo;
	}
	public void setOrarioVolo(Time orarioVolo) {
		this.orarioVolo = orarioVolo;
	}
	
	
	
}
