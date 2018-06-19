package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import model.Ticket;
import persistence.dao.TicketDao;

public class TicketDaoJDBC implements TicketDao{

	private DataSource dataSource;
	
	public TicketDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public void save(Ticket ticket) {
		Connection connection = this.dataSource.getConnection();
		try {
			int id = getNextId(connection);

			String insert = "insert into ticket(id, user_key, dep_date, ret_date, dep_airport, arr_airport, stop, dep_time, arr_time, dep_time_r, arr_time_r, price) "
							+ "values (?,?,?,?,?,?,?,?,?,?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setLong(1, id);
			statement.setString(2, ticket.getUser());
			statement.setString(3, ticket.getDepartureDate());
			statement.setString(4, ticket.getReturnDate());
			statement.setString(5, ticket.getDepartureAirport());
			statement.setString(6, ticket.getArrivalAirport());
			statement.setString(7, ticket.getStop());
			statement.setString(8, ticket.getDepartureTime());
			statement.setString(9, ticket.getArrivalTime());
			statement.setString(10, ticket.getDepartureTime_r());
			statement.setString(11, ticket.getArrivalTime_r());
			statement.setString(12, ticket.getPrice());

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
			final String query = "select id from ticket;";
			statement = connection.prepareStatement(query, ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ResultSet result = statement.executeQuery();

			if (result.last()) {
				int tmp = result.getInt("id");
				return ++tmp;
			}
			return 0;

		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		}
	}

	@Override
	public List<Ticket> retrieveTicket(String user) {
		// TODO Auto-generated method stub
		return null;
	}

}
