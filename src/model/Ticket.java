package model;

public class Ticket {
	
	/* ANDATA */
	
	private String departureDate; //data di partenza
	private String departureTime; //ora di partenza
	private String arrivalTime;   //ora di arrivo
	private String departureAirport; //aeroporto di partenza
	private String arrivalAirport;   //aeroporto d'arrivo
	
	/* RITORNO */
	private String returnDate; //data di ritorno
	private String departureTime_r; //ora di partenza
	private String arrivalTime_r;   //ora di arrivo
	
	private String stop;
	private String price;
	
	private String user;
	

	public Ticket() {

	}
	
		
	public String getDepartureDate() {
		return departureDate;
	}

	public void setDepartureDate(String departureDate) {
		this.departureDate = departureDate;
	}

	public String getDepartureTime() {
		return departureTime;
	}

	public void setDepartureTime(String departureTime) {
		this.departureTime = departureTime;
	}

	public String getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public String getDepartureAirport() {
		return departureAirport;
	}

	public void setDepartureAirport(String departureAirport) {
		this.departureAirport = departureAirport;
	}

	public String getArrivalAirport() {
		return arrivalAirport;
	}

	public void setArrivalAirport(String arrivalAirport) {
		this.arrivalAirport = arrivalAirport;
	}

	public String getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}

	public String getDepartureTime_r() {
		return departureTime_r;
	}

	public void setDepartureTime_r(String departureTime_r) {
		this.departureTime_r = departureTime_r;
	}

	public String getArrivalTime_r() {
		return arrivalTime_r;
	}

	public void setArrivalTime_r(String arrivalTime_r) {
		this.arrivalTime_r = arrivalTime_r;
	}

	public String getStop() {
		return stop;
	}

	public void setStop(String stop) {
		this.stop = stop;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

}
