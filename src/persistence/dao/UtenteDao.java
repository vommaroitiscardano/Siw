package persistence.dao;

import java.util.List;

import model.Utente;

public interface UtenteDao {
	
	public void save(Utente utente);
	public Utente findByPrimaryKey(long idUtente);
	public List<Utente> findAll();
	public void delete(Utente utente);
	public void update(Utente utente);
	
	
}
