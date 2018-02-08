package persistence.dao;

import java.util.List;

import model.Viaggio;

public interface ViaggioDao {
	
	public void save(Viaggio viaggio);
	public Viaggio findByPrimaryKey(long idViaggio);
	public List<Viaggio> findAll();
	public void delete(Viaggio viaggio);
	public void update(Viaggio viaggio);

}
