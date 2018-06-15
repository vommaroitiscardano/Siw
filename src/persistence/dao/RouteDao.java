package persistence.dao;

import java.util.List;

import model.Route;

public interface RouteDao {
	
	public void save(Route route);
	public List<Route> findAllRoutes(String dep_airport, String arr_airport);
	public Route findRoute(String departure, String destination);

}
