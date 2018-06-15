package model;

public class Route {
	
	private int id;
	private String from;
	private String to;
	private String connectingAirport;
	
	public Route() {
	}

	public Route(int id, String from, String to, String connectingAirport) {
		this.id = id;
		this.from = from;
		this.to = to;
		this.connectingAirport = connectingAirport;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public String getConnectingAirport() {
		return connectingAirport;
	}

	public void setConnectingAirport(String connectingAirport) {
		this.connectingAirport = connectingAirport;
	}
	
	@Override
	public String toString() {
		String json = "{"+"\"from\":"+"\""+getFrom()+"\","+ "\"to\":"+"\""+getTo()+"\""+"}";
		return json;
	}

}
