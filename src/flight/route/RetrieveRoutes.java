package flight.route;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import model.AirportInfo;
import model.Route;
import persistence.DatabaseManager;
import persistence.UtilDao;
import persistence.dao.AirportInfoDao;
import persistence.dao.RouteDao;

public class RetrieveRoutes {
	
	private final String ROUTE_URL = "http://apigateway.ryanair.com/pub/v1/core/3/routes?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
	private final String AIRPORT_URL = "http://apigateway.ryanair.com/pub/v1/core/3/airports?apikey=oItfM9w7Un1FbiEwgNUdfP8di0RRFFLX";
	
	private String call(String ryr_url){
		String output = null;
		BufferedReader br=null;
		StringBuilder sb = new StringBuilder();
		try {

			URL url = new URL(ryr_url);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException("Failed : HTTP error code : "+ conn.getResponseCode());
			}

			 br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			while ((output = br.readLine()) != null) {
				sb.append(output+"\n");
			}

			conn.disconnect();

		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return sb.toString();

	}
	private void createRouteTable(){
		UtilDao utilDAO = DatabaseManager.getInstance().getDaoFactory().getUtilDAO();
		utilDAO.createRouteTable();
		//utilDAO.createAirportNameTable();
	}
	
	private void handleResult(String object) throws JSONException{
		RouteDao routeDao = DatabaseManager.getInstance().getDaoFactory().getRouteDao();
		JSONArray elements = new JSONArray(object);
		for(int i = 0; i < elements.length(); i++){
			JSONObject route = (JSONObject) elements.get(i);
			if(!(route.get("operator").equals("RYANAIR"))){
				continue;
			}
			String from = (String) route.get("airportFrom");
			String to = (String) route.get("airportTo");
			Object connecting = (Object) route.get("connectingAirport");
			if(!(connecting instanceof String)){
				connecting = "---";
			}

			Route r = new Route(i, from, to, (String) connecting);
			routeDao.save(r);
	
		}
	}
	
	private void handleAirportResult(String object) throws JSONException{
		AirportInfoDao airportInfoDao = DatabaseManager.getInstance().getDaoFactory().getAirportInfoDao();
		JSONArray elements = new JSONArray(object);
		for(int i = 0; i < elements.length(); i++){
			JSONObject info = (JSONObject) elements.get(i);
			String iata_code = (String) info.get("iataCode");
			String name = (String) info.get("name");

			AirportInfo a_info = new AirportInfo(name, iata_code);
			airportInfoDao.save(a_info);
		}
	}
	
	public void saveRoutes() throws JSONException{
		String result = call(ROUTE_URL);
		//String air_result = call(AIRPORT_URL);
		//createRouteTable();
		handleResult(result);
		//handleAirportResult(air_result);
	}
	
	public static void main(String[] args) {
		try {
			new RetrieveRoutes().saveRoutes();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
