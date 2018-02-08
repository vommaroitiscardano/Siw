package persistence;

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
//ESERCIZIO (richiede Java8	
//	install Postgres https://www.postgresql.org/download/
//  scegliere utente: postgres -- password: postgres
//	
//	Lanciare PGADIMN oppure psql 
//	create database test;
//
//
//
//	- Vedere MainJDBC File.
//	- Testare i Dao Studente e Gruppo.
//	- Aggiungere l'entita' INDIRIZZO(codice, nome) per lo studente 
	//(uno studente ha un solo indirizzo)
//	- Aggiungere l'entita' CORSO(codice, nome), molti a molti con Studente.
	
	public static void main(String args[]) {
		Calendar cal = Calendar.getInstance();
		cal.set(1995, Calendar.MARCH, 21); // // 21 marzo 1995
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
		
		util.dropDatabase();
		
		util.createDatabase();
		
		Utente utente1 = new Utente(001, "Ciccio", "Pasticcio", date1, "cicciopasticcio@gmail.com", "renata");
		
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
		
		
		//CREATE
		
		utenteDao.save(utente1);
		luogoDao.save(luogo1);
		luogoDao.save(luogo2);
		aeroportoDao.save(aeroporto1);
		aeroportoDao.save(aeroporto2);
		voloDao.save(volo1);
		bigliettoDao.save(biglietto1);
		viaggioDao.save(viaggio1);

	}
}
