package persistence.dao;

import model.Utente;

public interface UtenteDao {
	
	public void save(Utente utente);
	public Utente findByEmail(String email);
	
	
}
