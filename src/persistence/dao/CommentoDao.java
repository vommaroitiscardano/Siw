package persistence.dao;

import java.util.ArrayList;
import java.util.List;

import model.Commento;

public interface CommentoDao {
public void save(Commento commento);
	
	public List<Commento> findAll();
	public void delete(Commento commento);
	public void update(Commento commento);
	public ArrayList<Commento> retrieve(Long idP);
}
