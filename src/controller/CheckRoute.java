package controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import model.AirportInfo;
import model.Route;
import persistence.DatabaseManager;
import persistence.dao.AirportInfoDao;
import persistence.dao.RouteDao;

public class CheckRoute extends HttpServlet{
	
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String origin_iata = req.getParameter("origin_iata");
		String destination_iata = req.getParameter("destination_iata");
		String dep_name = req.getParameter("dep_name");
		String arr_name = req.getParameter("arr_name");
		String start_date = req.getParameter("start-date");
		String end_date = req.getParameter("end-date");
		String adults = req.getParameter("adults");
		String children = req.getParameter("children");
		String f_class = req.getParameter("class");
		
		RouteDao routeDao = DatabaseManager.getInstance().getDaoFactory().getRouteDao();
		
		//lista delle rotte possibili con uno scalo
		List<Route> stops = routeDao.findAllRoutes(origin_iata, destination_iata);
		//rotta diretta;
		Route route = routeDao.findRoute(origin_iata, destination_iata); 
		
		HttpSession session = req.getSession();
		
		//non ci sono voli per la tratta specificata
		if(stops == null && route == null){
			session.setAttribute("noflights",true);
			req.getRequestDispatcher("searchFlight.jsp").forward(req, resp);
			return;
		}
		try {
			AirportInfoDao airInfo = DatabaseManager.getInstance().getDaoFactory().getAirportInfoDao();
			JSONArray stops_name = new JSONArray();
			for(Route r : stops){
				String s = r.getConnectingAirport();
				AirportInfo a_info = airInfo.findByPrimaryKey(s);
				JSONObject obj = new JSONObject();
				obj.put("iata", a_info.getAirport_iata());
				obj.put("name", a_info.getAirport_name());
				
				stops_name.put(obj);
			}
	
			JSONObject obj = new JSONObject();
		
			obj.put("nonstop", route != null ? new JSONObject(route.toString()) : "");
			JSONArray json_stops = new JSONArray();
			for (Route r : stops) {
				json_stops.put(r.getConnectingAirport());
			}
			obj.put("stops", json_stops);
			
			
			session.setAttribute("noflights",false);
			session.setAttribute("flights", obj);
			session.setAttribute("stops_name", stops_name);
			session.setAttribute("origin_iata", origin_iata);
			session.setAttribute("destination_iata", destination_iata);
			session.setAttribute("dep_name", dep_name);
			session.setAttribute("arr_name", arr_name);
			session.setAttribute("start_date", start_date);
			session.setAttribute("end_date", end_date);
			session.setAttribute("adults", adults);
			session.setAttribute("children", children);
			session.setAttribute("f_class", f_class);
			
			req.getRequestDispatcher("searchFlight.jsp").forward(req, resp);
			
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		
		

	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		HttpSession session = req.getSession();
		
		JSONObject obj = new JSONObject();
		try {
			obj.put("origin_iata", session.getAttribute("origin_iata"));
			obj.put("destination_iata", session.getAttribute("destination_iata"));
			obj.put("dep_name", session.getAttribute("dep_name"));
			obj.put("arr_name", session.getAttribute("arr_name"));
			obj.put("start_date", session.getAttribute("start_date"));
			obj.put("end_date", session.getAttribute("end_date"));
			obj.put("adults", session.getAttribute("adults"));
			obj.put("children", session.getAttribute("children"));
			obj.put("f_class", session.getAttribute("f_class"));
			obj.put("flights", session.getAttribute("flights"));
			obj.put("noflights", session.getAttribute("noflights"));
			obj.put("stops_name", session.getAttribute("stops_name"));
			
			resp.getWriter().write(obj.toString());
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
	
}
