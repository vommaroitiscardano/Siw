package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import model.Viaggio;
import persistence.dao.ViaggioDao;

public class ViaggioDaoJDBC implements ViaggioDao{
	private DataSource dataSource;
	
	public ViaggioDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	

	@Override
	public void save(Viaggio viaggio) {
		// TODO Auto-generated method stub
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into viaggio(id_viaggio, origine, destinazione) values (?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, viaggio.getIdViaggio());
			statement.setLong(2, viaggio.getOrigine().getIdLuogo());
			statement.setLong(3, viaggio.getDestinazione().getIdLuogo());

			
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
	public Viaggio findByPrimaryKey(long idViaggio) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Viaggio> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Viaggio viaggio) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Viaggio viaggio) {
		// TODO Auto-generated method stub
		
	}

}
