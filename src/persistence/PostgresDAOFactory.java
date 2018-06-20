package persistence;


import persistence.dao.AirportInfoDao;
import persistence.dao.CardDao;
import persistence.dao.CommentoDao;
import persistence.dao.PostDao;
import persistence.dao.RouteDao;
import persistence.dao.TicketDao;
import persistence.dao.UtenteDao;

public class PostgresDAOFactory extends DAOFactory {

	private static DataSource dataSource;

	static {
		
		try {
			Class.forName("org.postgresql.Driver").newInstance();
			dataSource = new DataSource("jdbc:postgresql://localhost:5432/FlydownDatabase", "postgres", "postgres");
//			dataSource = new DataSource("jdbc:postgresql://stampy.db.elephantsql.com:5432/imdyiyek", "imdyiyek", "5v4DWc03gjBVZ2NEV9RdZKM4T7Wwch3w");
		} catch (Exception e) {
			System.err.println("PostgresDAOFactory.class: failed to load MySQL JDBC driver\n" + e);
			e.printStackTrace();
		}
	}


	@Override
	public UtenteDao getUtenteDAO() {
		return new UtenteDaoJDBC(dataSource);
	}

	@Override
	public UtilDao getUtilDAO() {
		return new UtilDao(dataSource);
	}
	
	@Override
	public RouteDao getRouteDao(){
		return new RouteDaoJDBC(dataSource);
	}
	
	@Override
	public AirportInfoDao getAirportInfoDao(){
		return new AirportInfoDaoJDBC(dataSource);
	}
	
	@Override
	public PostDao getPostDao() {
		return new PostDaoJDBC(dataSource);
		
	}
	
	@Override
	public CommentoDao getCommentoDao() {
		return new CommentoDaoJDBC(dataSource);
	}

	@Override
	public TicketDao getTicketDao() {
		return new TicketDaoJDBC(dataSource);
	}

	@Override
	public CardDao getCardDao() {
		return new CardDaoJDBC(dataSource);
	}

}
