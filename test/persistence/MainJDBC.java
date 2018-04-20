package persistence;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Time;
import java.util.Calendar;
import java.util.Date;

import model.Aeroporto;
import model.Biglietto;
import model.Luogo;
import model.Utente;
import model.Viaggio;
import model.Volo;
import persistence.dao.AeroportoDao;
import persistence.dao.BigliettoDao;
import persistence.dao.LuogoDao;
import persistence.dao.UtenteDao;
import persistence.dao.ViaggioDao;
import persistence.dao.VoloDao;

public class MainJDBC {
	// ESERCIZIO (richiede Java8
	// install Postgres https://www.postgresql.org/download/
	// scegliere utente: postgres -- password: postgres
	//
	// Lanciare PGADIMN oppure psql
	// create database test;
	//
	//
	//
	// - Vedere MainJDBC File.
	// - Testare i Dao Studente e Gruppo.
	// - Aggiungere l'entita' INDIRIZZO(codice, nome) per lo studente
	// (uno studente ha un solo indirizzo)
	// - Aggiungere l'entita' CORSO(codice, nome), molti a molti con Studente.

	public static void main(String args[]) {
		Calendar cal = Calendar.getInstance();
		cal.set(1995, Calendar.MARCH, 21);
		Date date1 = cal.getTime();

		Time time = new Time(0);

		DAOFactory factory = DAOFactory.getDAOFactory(DAOFactory.POSTGRESQL);
		UtilDao util = factory.getUtilDAO();

		AeroportoDao aeroportoDao = factory.getAeroportoDAO();
		BigliettoDao bigliettoDao = factory.getBigliettoDAO();
		LuogoDao luogoDao = factory.getLuogoDAO();
		UtenteDao utenteDao = factory.getUtenteDAO();
		ViaggioDao viaggioDao = factory.getViaggioDAO();
		VoloDao voloDao = factory.getVoloDAO();
		Utente utente1 = new Utente(002, "Ciccio", "Pasticcio", "cicciopasticcio@gmail.com", "renata");

		/*
		util.dropDatabase();

		util.createDatabase();

		Luogo luogo1 = new Luogo();
		luogo1.setIdLuogo(001);
		luogo1.setCitta("Roma");
		luogo1.setNazione("Italia");

		Luogo luogo2 = new Luogo();
		luogo2.setIdLuogo(002);
		luogo2.setCitta("Milano");
		luogo2.setNazione("Italia");

		Aeroporto aeroporto1 = new Aeroporto();
		aeroporto1.setIdAeroporto(001);
		aeroporto1.setNome("Ciampino");
		aeroporto1.setLuogo(luogo1);

		Aeroporto aeroporto2 = new Aeroporto();
		aeroporto2.setIdAeroporto(002);
		aeroporto2.setNome("Malpensa");
		aeroporto2.setLuogo(luogo2);

		Volo volo1 = new Volo();
		volo1.setIdVolo(001);
		volo1.setPartenza(aeroporto1);
		volo1.setArrivo(aeroporto2);
		volo1.setDurataVolo(1.0f);
		volo1.setOrarioVolo(time);

		Biglietto biglietto1 = new Biglietto();
		biglietto1.setIdBiglietto(001);
		biglietto1.setDataAcquisto(date1);
		biglietto1.setOraAcquisto(time);
		biglietto1.setVolo(volo1);

		Viaggio viaggio1 = new Viaggio();
		viaggio1.setIdViaggio(001);
		viaggio1.setOrigine(luogo1);
		viaggio1.setDestinazione(luogo2);
		viaggio1.setIdBiglietti(biglietto1.getIdBiglietto());

		// CREATE

		luogoDao.save(luogo1);
		luogoDao.save(luogo2);
		aeroportoDao.save(aeroporto1);
		aeroportoDao.save(aeroporto2);
		voloDao.save(volo1);
		bigliettoDao.save(biglietto1);
		viaggioDao.save(viaggio1);
		
		*/
		//util.resetLuogo();s
		//utenteDao.save(utente1);
		//util.dropDatabase();
		util.createDatabase();
		//saveAirportData(aeroportoDao, luogoDao);
		

	}
	
	private static void saveAirportData(AeroportoDao aeroportoDao, LuogoDao luogoDao) {
		String path = "resources/airports.txt";
		
		String airportCode;
		String airportName; //nome dell'aeroporto
		
		String country; //nome della nazione
		String city; //nome della città
		
		BufferedReader reader = null;
		try {
			
			reader = new BufferedReader(new FileReader(path));
			String line;
			int count = -1;
			System.out.println("Inizio memorizzazione dati nel db...");
			while((line = reader.readLine()) != null){
				
				if(count ++ == -1)
					continue;	
				String[] fields = line.split(",");
				airportCode = fields[0];
				airportName = fields[1];
				city = fields[2];
				country = fields[3];
				
				Luogo l = new Luogo(count,city,country);
				luogoDao.save(l);
				Aeroporto a = new Aeroporto(airportCode,airportName,l);
				aeroportoDao.save(a);
				
			}
			
			System.out.println("Fine memorizzazione dati nel db.");
			
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally{
			try {
				reader.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

		}
		
	}
	
	
}
