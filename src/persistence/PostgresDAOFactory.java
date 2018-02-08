package persistence;



import persistence.dao.AeroportoDao;
import persistence.dao.BigliettoDao;
import persistence.dao.LuogoDao;
import persistence.dao.UtenteDao;
import persistence.dao.ViaggioDao;
import persistence.dao.VoloDao;

class PostgresDAOFactory extends DAOFactory {

	
	
	private static  DataSource dataSource;
	

	// --------------------------------------------

	static {
		try {
			Class.forName("org.postgresql.Driver").newInstance();
			//questi vanno messi in file di configurazione!!!	
//			dataSource=new DataSource("jdbc:postgresql://52.39.164.176:5432/xx","xx","p@xx");
			dataSource = new DataSource("jdbc:postgresql://localhost:5432/database","postgres","postgrespass");
		} 
		catch (Exception e) {
			System.err.println("PostgresDAOFactory.class: failed to load MySQL JDBC driver\n"+e);
			e.printStackTrace();
		}
	}


	@Override
	public AeroportoDao getAeroportoDAO() {
		// TODO Auto-generated method stub
		return new AeroportoDaoJDBC(dataSource);
	}


	@Override
	public BigliettoDao getBigliettoDAO() {
		// TODO Auto-generated method stub
		return new BigliettoDaoJDBC(dataSource);
	}


	@Override
	public LuogoDao getLuogoDAO() {
		// TODO Auto-generated method stub
		return new LuogoDaoJDBC(dataSource);
	}


	@Override
	public UtenteDao getUtenteDAO() {
		// TODO Auto-generated method stub
		return new UtenteDaoJDBC(dataSource);
	}


	@Override
	public ViaggioDao getViaggioDAO() {
		// TODO Auto-generated method stub
		return new ViaggioDaoJDBC(dataSource);
	}


	@Override
	public VoloDao getVoloDAO() {
		// TODO Auto-generated method stub
		return new VoloDaoJDBC(dataSource);
	}


	@Override
	public UtilDao getUtilDAO() {
		// TODO Auto-generated method stub
		return new UtilDao(dataSource);
	}

	
	// --------------------------------------------
	

}
