package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import model.AirportInfo;
import persistence.dao.AirportInfoDao;

public class AirportInfoDaoJDBC implements AirportInfoDao{
	
	private DataSource dataSource;

	public AirportInfoDaoJDBC(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	@Override
	public void save(AirportInfo airportInfo) {
		Connection connection = this.dataSource.getConnection();
		try {
			String insert = "insert into airport_info(id, name) values (?,?)";
			PreparedStatement statement = connection.prepareStatement(insert);
			statement.setString(1, airportInfo.getAirport_iata());
			statement.setString(2, airportInfo.getAirport_name());
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
	public AirportInfo findByPrimaryKey(String key) {

		Connection connection = this.dataSource.getConnection();
		AirportInfo airInfo = null;
		try {
			PreparedStatement statement;
			String query = "select * from airport_info where id=?";
			statement = connection.prepareStatement(query);
			statement.setString(1, key);
			ResultSet result = statement.executeQuery();
			while (result.next()) {
				airInfo = new AirportInfo();
				airInfo.setAirport_iata(result.getString("id"));
				airInfo.setAirport_name(result.getString("name"));
				
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
		return airInfo;
	
		
	}
	

}
