package persistence;

public class MainJDBC {

	public static void main(String args[]) {

		DAOFactory factory = DAOFactory.getDAOFactory(DAOFactory.POSTGRESQL);
		UtilDao util = factory.getUtilDAO();

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
	
}
