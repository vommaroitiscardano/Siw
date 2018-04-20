package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import model.Luogo;
import model.Volo;
import persistence.dao.LuogoDao;

public class LuogoDaoJDBC implements LuogoDao{
	
	private DataSource dataSource;
	
	public LuogoDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	@Override
	public void save(Luogo luogo) {
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into luogo(id_Luogo, citta, nazione) values (?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, luogo.getIdLuogo());
			statement.setString(2, luogo.getCitta());
			statement.setString(3, luogo.getNazione());
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
	public Volo findByPrimaryKey(long idLuogo) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Volo> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Luogo luogo) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Luogo luogo) {
		// TODO Auto-generated method stub
		
	}

}
