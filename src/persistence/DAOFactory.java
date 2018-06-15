package persistence;

import persistence.dao.AirportInfoDao;
import persistence.dao.CommentoDao;
import persistence.dao.PostDao;
import persistence.dao.RouteDao;
import persistence.dao.UtenteDao;

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
		
	public abstract UtenteDao getUtenteDAO();
	
	public abstract UtilDao getUtilDAO();
	
	public abstract RouteDao getRouteDao();

	public abstract AirportInfoDao getAirportInfoDao();
	
	public abstract PostDao getPostDao();

	public abstract CommentoDao getCommentoDao();

}
