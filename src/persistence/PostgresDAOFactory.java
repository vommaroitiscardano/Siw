package persistence;


import persistence.dao.AeroportoDao;
import persistence.dao.BigliettoDao;
import persistence.dao.LuogoDao;
import persistence.dao.UtenteDao;
import persistence.dao.ViaggioDao;
import persistence.dao.VoloDao;

public class PostgresDAOFactory extends DAOFactory {

	private static DataSource dataSource;

	static {
		
		try {
			Class.forName("org.postgresql.Driver").newInstance();
			// DataSource("jdbc:postgresql://52.39.164.176:5432/xx","xx","p@xx");
			dataSource = new DataSource("jdbc:postgresql://localhost:5432/FlydownDatabase", "postgres", "postgres");
		} catch (Exception e) {
			System.err.println("PostgresDAOFactory.class: failed to load MySQL JDBC driver\n" + e);
			e.printStackTrace();
		}
	}

	@Override
	public AeroportoDao getAeroportoDAO() {
		return new AeroportoDaoJDBC(dataSource);
	}

	@Override
	public BigliettoDao getBigliettoDAO() {
		return new BigliettoDaoJDBC(dataSource);
	}

	@Override
	public LuogoDao getLuogoDAO() {
		return new LuogoDaoJDBC(dataSource);
	}

	@Override
	public UtenteDao getUtenteDAO() {
		return new UtenteDaoJDBC(dataSource);
	}

	@Override
	public ViaggioDao getViaggioDAO() {
		return new ViaggioDaoJDBC(dataSource);
	}

	@Override
	public VoloDao getVoloDAO() {
		return new VoloDaoJDBC(dataSource);
	}

	@Override
	public UtilDao getUtilDAO() {
		return new UtilDao(dataSource);
	}

}
