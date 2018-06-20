package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

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
			
			int id = getNextId(connection);
			connection = this.dataSource.getConnection();
			
			String insert = "insert into utente(id_utente, nome, cognome, email, password) values (?,?,?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, id);
			statement.setString(2, utente.getNome());
			statement.setString(3, utente.getCognome());
			//long secs = utente.getDataNascita()getTime();
			//statement.setDate(4,null);
			statement.setString(4, utente.getEmail());
			statement.setString(5, utente.getPassword());

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
	/** 
	 * 	This method is used to generate next user ID
	 */
	private final int getNextId(final Connection connection){
		try {
			PreparedStatement statement;
			final String query = "select id_utente from utente;";
			statement = connection.prepareStatement(query,ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
			ResultSet result = statement.executeQuery();
			
			if(result.last()){
				int tmp = result.getInt("id_utente");
				return ++tmp;
			}
			return 0;
				
			
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
	public Utente findByEmail(String email) {
		Connection connection = dataSource.getConnection();
		try {
			//query che mi trova l'ultente con l'email corrispondente a quella ricercata
			String query = " select * "
							+ "from utente as u "
							+ "where u.email=?";
			
			PreparedStatement statement = connection.prepareStatement(query);
			statement.setString(1, email);
			ResultSet result = statement.executeQuery();
			if (result.next()) {
				Utente  u  = new Utente();
				u.setId_Utente(result.getLong("id_utente"));
				u.setNome(result.getString("nome"));
				u.setCognome(result.getString("cognome"));
				u.setEmail(result.getString("email"));
				u.setPassword(result.getString("password"));
				
				return u;
			}
		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		} finally {
			try {
				if(connection!=null)
					connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
	
		
		return null;
	}
	

}
