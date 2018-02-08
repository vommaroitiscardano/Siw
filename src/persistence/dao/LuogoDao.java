package persistence.dao;

import java.util.List;

import model.Luogo;
import model.Volo;

public interface LuogoDao {
	
	public void save(Luogo luogo);
	public Volo findByPrimaryKey(long idLuogo);
	public List<Volo> findAll();
	public void delete(Luogo luogo);
	public void update(Luogo luogo);
}
