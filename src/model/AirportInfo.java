package model;

public class AirportInfo {
	
	private String airport_name;
	private String airport_iata;
	
	public AirportInfo(String airport_name, String airport_iata) {
		super();
		this.airport_name = airport_name;
		this.airport_iata = airport_iata;
	}
	
	
	public AirportInfo() {
		// TODO Auto-generated constructor stub
	}


	public String getAirport_name() {
		return airport_name;
	}
	public void setAirport_name(String airport_name) {
		this.airport_name = airport_name;
	}
	public String getAirport_iata() {
		return airport_iata;
	}
	public void setAirport_iata(String airport_iata) {
		this.airport_iata = airport_iata;
	}
	

}
