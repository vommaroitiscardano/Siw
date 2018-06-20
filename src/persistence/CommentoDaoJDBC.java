package persistence;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import model.Commento;
import persistence.dao.CommentoDao;

public class CommentoDaoJDBC implements CommentoDao {
	
	private DataSource dataSource;
	
	public CommentoDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public void save(Commento commento) {
		Connection connection = this.dataSource.getConnection();
		try {
			int id = getNextId(connection);
			connection = this.dataSource.getConnection();
			String insert = "insert into commento(id_commento, messaggio, id_utente, id_post, date) values (?,?,?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, id);
			statement.setString(2, commento.getMessaggio());
			statement.setString(3, commento.getUtente());
			statement.setLong(4, commento.getIdPost());
			statement.setDate(5, commento.getDate());

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
	

	private final int getNextId(final Connection connection) {
		try {
			PreparedStatement statement;
			final String query = "select id_commento from commento;";
			statement = connection.prepareStatement(query, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ResultSet result = statement.executeQuery();

			if (result.last()) {
				int tmp = result.getInt("id_commento");
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
	public void delete(Commento commento) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ArrayList<Commento> retrieve(Long idP) {
		ArrayList<Commento> result = new ArrayList<Commento>();
		Connection connection = this.dataSource.getConnection();
		try {	
			PreparedStatement create = connection.prepareStatement("SELECT * FROM commento WHERE id_post=?");
			create.setLong(1, idP);
			ResultSet rs;
			rs = create.executeQuery();
			while (rs.next()) {
				Long id = rs.getLong("id_commento");
				String message = rs.getString("messaggio");
				String idUtente = rs.getString("id_utente");
				Long t = rs.getLong("id_post");
				Date data = rs.getDate("date");
				Commento commento = new Commento(); // Creating a user object to fill with user data (I imagine that you have a user
										// class in your model)
				
				commento.setIdCommento(id);
				commento.setMessaggio(message);
				commento.setUtente(idUtente);
				commento.setIdPost(t);
				commento.setDate(data);
				// Add the retrived user to the list
				result.add(commento);

			}
			// Returning the list of users.
			return result;
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

}
