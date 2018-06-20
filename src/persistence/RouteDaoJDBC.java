package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import model.Route;
import persistence.dao.RouteDao;

public class RouteDaoJDBC implements RouteDao{
	
	private DataSource dataSource;
	
	public RouteDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
		
	}

	@Override
	public void save(Route route) {
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into route(id,from_a, to_b,connecting_ab) values (?,?,?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setInt(1, route.getId());
			statement.setString(2, route.getFrom());
			statement.setString(3, route.getTo());
			statement.setString(4, route.getConnectingAirport());
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
	 * Calcola tutte le rotte possibili con 1 scalo dati 2 aeroporti
	 */
	public List<Route> findAllRoutes(String dep_airport, String arr_airport) {
		Connection connection = this.dataSource.getConnection();
		List<Route> routes = new LinkedList<>();
		try {
			Route route = null;
			PreparedStatement statement;
			String query = "select r1.from_a, r1.to_b as connecting_ab, r2.from_a as to_b "
					+ " from route as r1, route as r2"
					+ " where r1.from_a = ? AND r2.from_a = ? AND r1.to_b = r2.to_b AND r1.connecting_ab = '---' ";
			statement = connection.prepareStatement(query);
			statement.setString(1, dep_airport);
			statement.setString(2, arr_airport);
			ResultSet result = statement.executeQuery();
			boolean matchFound = false;
			while (result.next()) {
				
				matchFound = true;
				route = new Route();
				route.setFrom(result.getString("from_a"));
				route.setTo(result.getString("to_b"));
				route.setConnectingAirport(result.getString("connecting_ab"));
				
				routes.add(route);
			}
			if(!matchFound){
				routes = null;
			}

		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		}	 finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
		return routes;
	}
	
	/**
	 * @return la rotta diretta tra l'aeroporto di partenza e arrivo
	 */
	public Route findRoute(String departure, String destination) {
		Connection connection = this.dataSource.getConnection();
		Route route = null;
		try {
			PreparedStatement statement;
			String query = "select * from route where from_a = ? AND to_b = ? AND connecting_ab = '---'";
			statement = connection.prepareStatement(query);
			statement.setString(1, departure);
			statement.setString(2, destination);
			ResultSet result = statement.executeQuery();
			while (result.next()) {
				route = new Route();
				route.setFrom(result.getString("from_a"));
				route.setTo(result.getString("to_b"));
			}
		} catch (SQLException e) {
			throw new PersistenceException(e.getMessage());
		}	 finally {
			try {
				connection.close();
			} catch (SQLException e) {
				throw new PersistenceException(e.getMessage());
			}
		}
		return route;
	}
}
