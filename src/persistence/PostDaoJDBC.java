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
	public ArrayList<Post> retrieve(Integer nPost, Integer maxPost) {
		ArrayList<Post> result = null;
		try {

			Connection connection = this.dataSource.getConnection();

			PreparedStatement maxpost = connection.prepareStatement("SELECT max(id_post) from post");

			ResultSet rsMax = maxpost.executeQuery();

			rsMax.next();

			Integer idMax = (int) rsMax.getLong("max");
			
			if ((maxPost + nPost) == idMax)
				return null;

			Integer from = idMax - maxPost;
			Integer to = from - nPost;

			PreparedStatement create = connection.prepareStatement("SELECT * FROM post WHERE id_post <= ? and id_post > ?");
			create.setInt(1, from);
			create.setInt(2, to);
			ResultSet rs;
			rs = create.executeQuery();
			boolean found = true;
			
			while (rs.next()) {
				if (found) {
					result = new ArrayList<>();
					found = false;
					
				}
				
				Long id = rs.getLong("id_post");
				String title = rs.getString("title");
				String message = rs.getString("messaggio");
				String idUtente = rs.getString("id_utente");
				String imgsrc = rs.getString("imgsrc");
				Date data = rs.getDate("date");

				Post post = new Post(); // Creating a user object to fill with user data
				post.setIdPost(id);
				post.setTitle(title);
				post.setMessaggio(message);
				post.setUtente(idUtente);
				post.setImgname(imgsrc);
				post.setData(data);
				// Add the retrived user to the list
				result.add(post);

			}
			
			if(result != null) {
				
				ArrayList<Post> orderedPost = new ArrayList<>();
				for (int i = result.size()-1; i>=0; i--) {
					orderedPost.add(result.get(i));
					
				}
				return orderedPost;
			}
			// Returning the list of users.
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

}
