package persistence;

import persistence.dao.AeroportoDao;
import persistence.dao.BigliettoDao;
import persistence.dao.LuogoDao;
import persistence.dao.UtenteDao;
import persistence.dao.ViaggioDao;
import persistence.dao.VoloDao;

public abstract class DAOFactory {

	/**
	 * Numeric constant '1' corresponds to explicit Hsqldb choice
	 */
	public static final int HSQLDB = 1;
	
	/**
	 * Numeric constant '2' corresponds to explicit Postgres choice
	 */
	public static final int POSTGRESQL = 2;
	
	
	/**
	 * Depending on the input parameter
	 * this method returns one out of several possible 
	 * implementations of this factory spec 
	 */
	public static DAOFactory getDAOFactory(int whichFactory) {
		switch ( whichFactory ) {
		
		case HSQLDB:
			return null;//new HsqldbDAOFactory();
		case POSTGRESQL:
			return new PostgresDAOFactory();
		default:
			return null;
		}
	}
	
	
	
	// --- Factory specification: concrete factories implementing this spec must provide this methods! ---
	
	/**
	 * Method to obtain a DATA ACCESS OBJECT
	 * for the datatype 'Student'
	 */
	public abstract AeroportoDao getAeroportoDAO();
	
	public abstract BigliettoDao getBigliettoDAO();
	
	public abstract LuogoDao getLuogoDAO();
	
	public abstract UtenteDao getUtenteDAO();
	
	public abstract ViaggioDao getViaggioDAO();
	
	public abstract VoloDao getVoloDAO();
	
	public abstract UtilDao getUtilDAO();

}
