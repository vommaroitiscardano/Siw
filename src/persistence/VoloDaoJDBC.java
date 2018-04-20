package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import model.Volo;
import persistence.dao.VoloDao;

public class VoloDaoJDBC implements VoloDao {
	private DataSource dataSource;
	
	public VoloDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	@Override
	public void save(Volo volo) {
		// TODO Auto-generated method stub
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into volo(id_volo, aeroporto_partenza, aeroporto_arrivo, prezzo, durata, orario) values (?,?,?,?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, volo.getIdVolo());
			statement.setString(2, volo.getPartenza().getIdAeroporto());
			statement.setString(3, volo.getArrivo().getIdAeroporto());
			statement.setLong(4, volo.getPrezzo());
			statement.setFloat(5, volo.getDurataVolo());
			
			long secs = volo.getOrarioVolo().getTime();
			statement.setTime(6, new java.sql.Time(secs));

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
	public Volo findByPrimaryKey(long idVolo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Volo> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void update(Volo volo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(Volo volo) {
		// TODO Auto-generated method stub
		
	}

}
