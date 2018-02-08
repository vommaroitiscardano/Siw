package persistence;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UtilDao {

	
private DataSource dataSource;

public UtilDao(DataSource dataSource) {
		this.dataSource=dataSource;
	}

public void dropDatabase(){
	
	Connection connection = dataSource.getConnection();
	try {
		String delete = "drop SEQUENCE if EXISTS sequenza_id;"
				
				+ "drop table if exists viaggio;"
				+ "drop table if exists biglietto;"
				+ "drop table if exists volo;"
				+ "drop table if exists aeroporto;"
				+ "drop table if exists luogo;"
				+ "drop table if exists utente;"
				

				;
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

public void createDatabase(){
	
	Connection connection = dataSource.getConnection();
	try {
		
		String delete = "create SEQUENCE sequenza_id;"
				+ "create table luogo (\"id_luogo\" bigint primary key, citta varchar(255), nazione varchar(255));"
				+ "create table utente(\"id_utente\" bigint primary key,nome varchar(255), cognome varchar(255), data_di_nascita DATE, email varchar(255), password varchar(255));"

				+ "create table aeroporto (\"id_aeroporto\" bigint primary key, nome varchar(255), luogo bigint REFERENCES luogo(\"id_luogo\"));"
				+ "create table volo(\"id_volo\" bigint primary key, aeroporto_partenza bigint REFERENCES aeroporto(\"id_aeroporto\"), aeroporto_arrivo bigint REFERENCES aeroporto(\"id_aeroporto\"), prezzo bigint, durata bigint, orario TIME);"
				+ "create table biglietto (\"id_biglietto\" bigint primary key, volo bigint REFERENCES volo(\"id_volo\"), prezzo bigint, data_acquisto DATE, ora_acquisto TIME);"

				+ "create table viaggio(\"id_viaggio\" bigint primary key, origine bigint REFERENCES luogo(\"id_luogo\"), destinazione bigint REFERENCES luogo(\"id_luogo\"));"				
				;
		
		PreparedStatement statement = connection.prepareStatement(delete);
		
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
}

/*
public  void resetDatabase() {
		
		Connection connection = dataSource.getConnection();
		try {
			String delete = "delete FROM studente";
			PreparedStatement statement = connection.prepareStatement(delete);
			
			statement.executeUpdate();

			delete = "delete FROM gruppo";
			statement = connection.prepareStatement(delete);
			
			delete = "delete FROM corso";
			statement = connection.prepareStatement(delete);
			
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

}
*/
