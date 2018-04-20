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
//			String delete = "drop SEQUENCE if EXISTS sequenza_id;"
//
//					+ "drop table if exists viaggio;" + "drop table if exists biglietto;" + "drop table if exists volo;"
//					+ "drop table if exists aeroporto;" + "drop table if exists luogo;" + "drop table if exists utente;"
//
//			;
			String delete = "drop table if exists utente;";
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
//					+ "create table luogo (\"id_luogo\" bigint primary key, citta varchar(255), nazione varchar(255));"
//					+ "create table utente(\"id_utente\" bigint primary key,nome varchar(255), cognome varchar(255), data_di_nascita DATE, email varchar(255), password varchar(255));"
//
//					+ "create table aeroporto (\"id_aeroporto\" varchar(6) primary key, nome varchar(255), luogo bigint REFERENCES luogo(\"id_luogo\"));"
//					+ "create table volo(\"id_volo\" bigint primary key, aeroporto_partenza varchar(6) REFERENCES aeroporto(\"id_aeroporto\"), aeroporto_arrivo varchar(6) REFERENCES aeroporto(\"id_aeroporto\"), prezzo bigint, durata bigint, orario TIME);"
//					+ "create table biglietto (\"id_biglietto\" bigint primary key, volo bigint REFERENCES volo(\"id_volo\"), prezzo bigint, data_acquisto DATE, ora_acquisto TIME);"
//
//					+ "create table viaggio(\"id_viaggio\" bigint primary key, origine bigint REFERENCES luogo(\"id_luogo\"), destinazione bigint REFERENCES luogo(\"id_luogo\"));";

			
			String create = "create table utente(\"id_utente\" bigint primary key,nome varchar(255), cognome varchar(255), data_di_nascita DATE, email varchar(255), password varchar(255));";


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

	public void resetLuogo() {
		Connection connection = dataSource.getConnection();

		try {
			String aeroporto = "delete FROM aeroporto";
			PreparedStatement statement = connection.prepareStatement(aeroporto);			
			statement.executeUpdate();
			
			String luogo = "delete FROM luogo";
			statement = connection.prepareStatement(luogo);
			statement.executeUpdate();

			System.out.println("La tabella luogo è stata resettata.");

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
