package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UtilDao {

	private DataSource dataSource;

	public UtilDao(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public void dropDatabase() {

		Connection connection = dataSource.getConnection();
		try {
			String delete = "drop table if exists utente;"
					+ "drop table if exists post;"
					+ "drop table if exists commento";

			PreparedStatement statement = connection.prepareStatement(delete);

			statement.executeUpdate();
			System.out.println("Executed drop database");

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

	public void createDatabase() {

		Connection connection = dataSource.getConnection();
		try {

//			String create = "create SEQUENCE sequenza_id;"
//					+ "create table route (\"id\" bigint primary key, from_a varchar(3), to_b varchar(3), connecting_ab varchar(3));"
//					+ "create table airport_info (\"id\" varchar(3) primary key, name varchar(100));";
		
//			String create = "create table utente(\"id_utente\" bigint primary key,nome varchar(255), cognome varchar(255), data_di_nascita DATE, email varchar(255), password varchar(255));"
//					+ "create table post(\"id_post\" bigint primary key, title varchar(255), messaggio varchar(255), id_utente varchar(255), imgsrc varchar(255), date date);"
////					+ "create table route (\"id\" bigint primary key, from_a varchar(3), to_b varchar(3), connecting_ab varchar(3));"
//					+ "create table commento(\"id_commento\" bigint primary key, messaggio varchar(255), id_utente varchar(255), id_post bigint, date date)";

			String create = "create table ticket(\"id\" bigint primary key,user_key varchar(15), dep_date varchar(10), ret_date varchar(10), dep_airport varchar(25), arr_airport varchar(25), stop varchar(25), dep_time varchar(5), arr_time varchar(5), dep_time_r varchar(5), arr_time_r varchar(5), price varchar(4) );";
			
			PreparedStatement statement = connection.prepareStatement(create);

			statement.executeUpdate();
			System.out.println("Executed create database");

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

	/*
	 * public void resetDatabase() {
	 * 
	 * Connection connection = dataSource.getConnection(); try { String delete =
	 * "delete FROM studente"; PreparedStatement statement =
	 * connection.prepareStatement(delete);
	 * 
	 * statement.executeUpdate();
	 * 
	 * delete = "delete FROM gruppo"; statement =
	 * connection.prepareStatement(delete);
	 * 
	 * delete = "delete FROM corso"; statement =
	 * connection.prepareStatement(delete);
	 * 
	 * statement.executeUpdate(); } catch (SQLException e) {
	 * 
	 * throw new PersistenceException(e.getMessage()); } finally { try {
	 * connection.close(); } catch (SQLException e) {
	 * 
	 * throw new PersistenceException(e.getMessage()); } } }
	 * 
	 * }
	 */
	
	public void createRouteTable(){
		Connection connection = dataSource.getConnection();
		try {

			String create = "create table route (\"id\" bigint primary key, from_a varchar(3), to_b varchar(3), connecting_ab varchar(3));";
					
			PreparedStatement statement = connection.prepareStatement(create);

			statement.executeUpdate();
			System.out.println("Executed create route table");

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
	
	public void createAirportNameTable(){
		Connection connection = dataSource.getConnection();
		try {

			String create = "create table airport_info (\"id\" varchar(3) primary key, name varchar(100));";
					
			PreparedStatement statement = connection.prepareStatement(create);

			statement.executeUpdate();
			System.out.println("Executed create airport_info table");

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
