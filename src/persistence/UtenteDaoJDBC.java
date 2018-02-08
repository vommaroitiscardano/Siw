package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

import model.Utente;
import persistence.dao.UtenteDao;

public class UtenteDaoJDBC implements UtenteDao{
	
	private DataSource dataSource;
	
	public UtenteDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	@Override
	public void save(Utente utente) {
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into utente(id_utente, nome, cognome, data_di_nascita, email, password) values (?,?,?,?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, utente.getId_Utente());
			statement.setString(2, utente.getNome());
			statement.setString(3, utente.getCognome());
			//long secs = utente.getDataNascita()getTime();
			statement.setDate(4,null);
			statement.setString(5, utente.getEmail());
			statement.setString(6, utente.getPassword());

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
	public Utente findByPrimaryKey(long idUtente) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Utente> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Utente utente) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(Utente utente) {
		// TODO Auto-generated method stub
		
	}

}
