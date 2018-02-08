package persistence.dao;

import java.util.List;

import model.Aeroporto;

public interface AeroportoDao {
	public void save(Aeroporto aeroporto);
	public Aeroporto findByPrimaryKey(long idAeroporto);
	public List<Aeroporto> findAll();
	public void delete(Aeroporto aeroporto);
	public void update(Aeroporto aeroporto);
}
