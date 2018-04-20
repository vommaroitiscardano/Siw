package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import model.Aeroporto;
import persistence.dao.AeroportoDao;

public class AeroportoDaoJDBC implements AeroportoDao {
	
	private DataSource dataSource;
	
	public AeroportoDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	@Override
	public void save(Aeroporto aeroporto) {
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into aeroporto(id_aeroporto, nome, luogo) values (?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setString(1, aeroporto.getIdAeroporto());
			statement.setString(2, aeroporto.getNome());
			statement.setLong(3, aeroporto.getLuogo().getIdLuogo());
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
	public Aeroporto findByPrimaryKey(long idAeroporto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Aeroporto> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void update(Aeroporto aeroporto) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(Aeroporto aeroporto) {
		// TODO Auto-generated method stub
		
	}

}
