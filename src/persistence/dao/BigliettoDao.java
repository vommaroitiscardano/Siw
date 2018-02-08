package persistence.dao;

import java.util.List;

import model.Biglietto;

public interface BigliettoDao {

		public void save(Biglietto biglietto);
		public Biglietto findByPrimaryKey(long idBiglietto);
		public List<Biglietto> findAll();
		public void delete(Biglietto biglietto);
		public void update(Biglietto biglietto);
}


