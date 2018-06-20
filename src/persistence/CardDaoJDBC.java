package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Card;
import persistence.dao.CardDao;

public class CardDaoJDBC implements CardDao {

	private DataSource dataSource;
	
	public CardDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public void save(Card card) {
		Connection connection = this.dataSource.getConnection();
		try {
			
			int id = getNextId(connection);
			connection = this.dataSource.getConnection();
			String insert = "insert into card(id,user_key, card_name, card_number, expiration_date, cvv) values (?,?,?,?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setInt(1,id);
			statement.setString(2, card.getUser());
			statement.setString(3, card.getCard_name());
			statement.setString(4, card.getCard_number());
			statement.setString(5, card.getExpiration_date());
			statement.setString(6, card.getCard_cvv());
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
	public List<Card> retrieveCards(String user) {

		ArrayList<Card> cards = null;
		Connection connection = this.dataSource.getConnection();
		try {
			PreparedStatement statement = connection.prepareStatement("SELECT * from card where user_key=?");
			statement.setString(1, user);
			ResultSet result = statement.executeQuery();
			boolean found = true;
			while (result.next()) {
				if (found) {
					cards = new ArrayList<>();
					found = false;					
				} 
				Card c = new Card();
				c.setUser(user);
				c.setCard_name(result.getString("card_name"));
				c.setCard_number(result.getString("card_number"));
				c.setExpiration_date(result.getString("expiration_date"));
				c.setCard_cvv(result.getString("cvv"));
				
				cards.add(c);

			}
			return cards;

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
			final String query = "select id from card;";
			statement = connection.prepareStatement(query, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ResultSet result = statement.executeQuery();

			if (result.last()) {
				int tmp = result.getInt("id");
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



}
