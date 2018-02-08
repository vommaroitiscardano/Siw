package persistence.dao;

import java.util.List;

import model.Volo;

public interface VoloDao {

	public void save(Volo volo);
	public Volo findByPrimaryKey(long idVolo);
	public List<Volo> findAll();
	public void update(Volo volo);
	public void delete(Volo volo);

	
}
