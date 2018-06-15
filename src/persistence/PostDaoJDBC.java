package persistence;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Post;
import persistence.dao.PostDao;

public class PostDaoJDBC implements PostDao {

	private DataSource dataSource;

	public PostDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public void save(Post post) {
		Connection connection = this.dataSource.getConnection();
		try {
			int id = getNextId(connection);

			String insert = "insert into post(id_post, title, messaggio, id_utente, imgsrc, date) values (?,?,?,?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, id);
			statement.setString(2, post.getTitle());
			statement.setString(3, post.getMessaggio());
			statement.setString(4, post.getUtente());
			statement.setString(5, post.getImgname());
			statement.setDate(6, post.getData());

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
	 * This method is used to generate next user ID
	 */
	private final int getNextId(final Connection connection) {
		try {
			PreparedStatement statement;
			final String query = "select id_post from post;";
			statement = connection.prepareStatement(query, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ResultSet result = statement.executeQuery();

			if (result.last()) {
				int tmp = result.getInt("id_post");
				return ++tmp;
			}
			return 0;

		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		}
	}

	

	@Override
	public List<Post> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void delete(Post post) {
		// TODO Auto-generated method stub

	}

	@Override
	public void update(Post post) {
		// TODO Auto-generated method stub

	}

	@Override
	public ArrayList<Post> retrieve() {
		ArrayList<Post> result = new ArrayList<Post>();
		try {

			Connection connection = this.dataSource.getConnection();

			PreparedStatement create = connection.prepareStatement("SELECT * FROM post");

			ResultSet rs;
			rs = create.executeQuery();
			while (rs.next()) {
				Long id = rs.getLong("id_post");
				String title = rs.getString("title");
				String message = rs.getString("messaggio");
				String idUtente = rs.getString("id_utente");
				String imgsrc = rs.getString("imgsrc");
				Date data = rs.getDate("date");

				Post post = new Post(); // Creating a user object to fill with user data (I imagine that you have a user
										// class in your model)
				post.setIdPost(id);
				post.setTitle(title);
				post.setMessaggio(message);
				post.setUtente(idUtente);
				post.setImgname(imgsrc);
				post.setData(data);
				// Add the retrived user to the list
				result.add(post);

			}
			// Returning the list of users.
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

}
