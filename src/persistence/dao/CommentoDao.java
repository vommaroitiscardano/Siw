package persistence.dao;

import java.util.ArrayList;

import model.Commento;

public interface CommentoDao {

	public void save(Commento commento);
	public void delete(Commento commento);
	public ArrayList<Commento> retrieve(Long idP);
}
