package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import model.Biglietto;
import persistence.dao.BigliettoDao;

public class BigliettoDaoJDBC implements BigliettoDao{

	private DataSource dataSource;
	
	public  BigliettoDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	
	@Override
	public void save(Biglietto biglietto) {
		// TODO Auto-generated method stub
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into biglietto(id_biglietto, volo, prezzo, data_acquisto, ora_acquisto) values (?,?,?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, biglietto.getIdBiglietto());
			statement.setLong(2, biglietto.getVolo().getIdVolo());
			statement.setLong(3, biglietto.getPrezzo());
			long secs = biglietto.getDataAcquisto().getTime();
			statement.setDate(4, new java.sql.Date(secs));
			statement.setTime(5, new java.sql.Time(secs));
			statement.executeUpdate();
		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
		
	}

	@Override
	public void update(Biglietto biglietto) {
/*		Connection connection = this.dataSource.getConnection();
		try {
			String update = "update biglietto as b, viaggio as v SET "; 
			PreparedStatement statement = connection.prepareStatement(update);
			statement.setLong(1, biglietto.getIdBiglietto());
			
			//join con 
			statement.setLong(2, corso.getCodice());
			
			statement.setFloat(3, biglietto.getPrezzo());
			long secs = biglietto.getDataAcquisto().getTime();
			statement.setDate(4, new java.sql.Date(secs));
			statement.setTime(5, new java.sql.Time(secs));

		} catch (SQLException e) {
			if (connection != null) {
				try {
					connection.rollback();
				} catch(SQLException excep) {
					throw new PersistenceException(e.getMessage());
				}
			} 
		} finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
		*/
	}


	@Override
	public Biglietto findByPrimaryKey(long idBiglietto) {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public List<Biglietto> findAll() {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public void delete(Biglietto biglietto) {
		// TODO Auto-generated method stub
		
	}

}
