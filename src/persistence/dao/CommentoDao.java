package persistence.dao;

import java.util.ArrayList;

import model.Commento;

public interface CommentoDao {

	public void save(Commento commento);
	
	public ArrayList<Commento> retrieve(Long idP);
	void delete(Long idCommento);
}
