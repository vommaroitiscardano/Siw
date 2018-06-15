package model;

import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class Ticket {
	
	private String number;
	private String departureTime;
	private String arrivalTime;
	
	private String departureAirport;
	private String arrivalAirport;
	private String flightTime;
	
	private String departureAirportReturn;
	private String arrivalAirportReturn;
	private String oneWayTime;
	private String returnTime;
	private String numberReturn;
	private String depTimeReturn;
	private String arrTimeReturn;
	
	
	/*
	 * variabili per i voli con scalo
	 */
	private String stopover;         //scalo
	private String dep_iata_airport; //aeroporto di partenza
	private String arr_iata_airport; //aeroporto di destinazione
	private String number_firststep; //numero dell'aereo di andata per la prima tratta
	private String number_secondstep; //numero dell'aereo di andata per la seconda tratta
	private String number_firststep_r; //numero dell'aereo di ritorno per la seconda tratta
	private String number_secondstep_r; //numero dell'aereo di ritorno per la seconda tratta
	private String dep_time_oneway_fs;  //ora di partenza prima tratta volo di andata
	private String arr_time_oneway_fs;  //ora di arrivo prima tratta
	private String dep_time_oneway_ss;  
	private String arr_time_oneway_ss;  
	private String dep_time_return_fs;  //ora di partenza prima tratta volo di ritorno
	private String arr_time_return_fs;  
	private String dep_time_return_ss;  
	private String arr_time_return_ss;  
	private String ft_ow_fs;			//durata del volo di andata per la prima tratta
	private String ft_ow_ss;			//durata del volo di andata per la seconda tratta
	private String ft_r_fs;				//durata del volo di ritorno per la prima tratta
	private String ft_r_ss;				//durata del volo di ritorno per la seconda tratta
	private String total_ow_ft;			//tempo totale del volo di andata (considerando anche lo scalo)
	private String total_r_ft;			//tempo totale del volo di ritorno (considerando anche lo scalo)

	

	public Ticket() {

	}
	
	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
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
	
	public String getFlightTime() {
		return flightTime;
	}

	public void setFlightTime() throws ParseException {
		DateFormat formatter = new SimpleDateFormat("HH:mm");
		Time arrTime = new Time(formatter.parse(arrivalTime).getTime());
		Time depTime = new Time(formatter.parse(departureTime).getTime());
		
		long timeDiff = arrTime.getTime() - depTime.getTime();
		flightTime = ((timeDiff / 3600000) + "h " + (timeDiff % 3600000) / 60000 + "min");
		
	}
	
	public static boolean checkTime(Ticket t1, Ticket t2) throws ParseException{
		String t1_arr = t1.getArrivalTime();
		String t2_dep = t2.getDepartureTime();
		
		SimpleDateFormat format = new SimpleDateFormat("HH:mm");
		
		return format.parse(t1_arr).after(format.parse(t2_dep));
	}
	
	public static boolean checkTime(String t1, String t2) throws ParseException{
		
		SimpleDateFormat format = new SimpleDateFormat("HH:mm");
		
		return format.parse(t1).after(format.parse(t2));
	}
	
	public String getDepartureAirportReturn() {
		return departureAirportReturn;
	}

	public void setDepartureAirportReturn(String departureAirportReturn) {
		this.departureAirportReturn = departureAirportReturn;
	}

	public String getArrivalAirportReturn() {
		return arrivalAirportReturn;
	}

	public void setArrivalAirportReturn(String arrivalAirportReturn) {
		this.arrivalAirportReturn = arrivalAirportReturn;
	}

	public String getOneWayTime() {
		return oneWayTime;
	}

	public void setOneWayTime(String oneWayTime) {
		this.oneWayTime = oneWayTime;
	}

	public String getReturnTime() {
		return returnTime;
	}

	public void setReturnTime(String returnTime) {
		this.returnTime = returnTime;
	}

	public String getNumberReturn() {
		return numberReturn;
	}

	public void setNumberReturn(String numberReturn) {
		this.numberReturn = numberReturn;
	}

	public void setFlightTime(String flightTime) {
		this.flightTime = flightTime;
	}

	public String getDepTimeReturn() {
		return depTimeReturn;
	}

	public void setDepTimeReturn(String depTimeReturn) {
		this.depTimeReturn = depTimeReturn;
	}

	public String getArrTimeReturn() {
		return arrTimeReturn;
	}

	public void setArrTimeReturn(String arrTimeReturn) {
		this.arrTimeReturn = arrTimeReturn;
	}
	
	public String getStopover() {
		return stopover;
	}

	public void setStopover(String stopover) {
		this.stopover = stopover;
	}

	public String getDep_iata_airport() {
		return dep_iata_airport;
	}

	public void setDep_iata_airport(String dep_iata_airport) {
		this.dep_iata_airport = dep_iata_airport;
	}

	public String getArr_iata_airport() {
		return arr_iata_airport;
	}

	public void setArr_iata_airport(String arr_iata_airport) {
		this.arr_iata_airport = arr_iata_airport;
	}

	public String getNumber_firststep() {
		return number_firststep;
	}

	public void setNumber_firststep(String number_firststep) {
		this.number_firststep = number_firststep;
	}

	public String getNumber_secondstep() {
		return number_secondstep;
	}

	public void setNumber_secondstep(String number_secondstep) {
		this.number_secondstep = number_secondstep;
	}

	public String getNumber_firststep_r() {
		return number_firststep_r;
	}

	public void setNumber_firststep_r(String number_firststep_r) {
		this.number_firststep_r = number_firststep_r;
	}

	public String getNumber_secondstep_r() {
		return number_secondstep_r;
	}

	public void setNumber_secondstep_r(String number_secondstep_r) {
		this.number_secondstep_r = number_secondstep_r;
	}

	public String getFt_ow_fs() {
		return ft_ow_fs;
	}

	public void setFt_ow_fs(String ft_ow_fs) {
		this.ft_ow_fs = ft_ow_fs;
	}

	public String getFt_ow_ss() {
		return ft_ow_ss;
	}

	public void setFt_ow_ss(String ft_ow_ss) {
		this.ft_ow_ss = ft_ow_ss;
	}

	public String getFt_r_fs() {
		return ft_r_fs;
	}

	public void setFt_r_fs(String ft_r_fs) {
		this.ft_r_fs = ft_r_fs;
	}

	public String getFt_r_ss() {
		return ft_r_ss;
	}

	public void setFt_r_ss(String ft_r_ss) {
		this.ft_r_ss = ft_r_ss;
	}

	public String getTotal_ow_ft() {
		return total_ow_ft;
	}

	public void setTotal_ow_ft(String total_ow_ft) {
		this.total_ow_ft = total_ow_ft;
	}

	public String getTotal_r_ft() {
		return total_r_ft;
	}

	public void setTotal_r_ft(String total_r_ft) {
		this.total_r_ft = total_r_ft;
	}
	
	
	public String getDep_time_oneway_fs() {
		return dep_time_oneway_fs;
	}

	public void setDep_time_oneway_fs(String dep_time_oneway_fs) {
		this.dep_time_oneway_fs = dep_time_oneway_fs;
	}

	public String getArr_time_oneway_fs() {
		return arr_time_oneway_fs;
	}

	public void setArr_time_oneway_fs(String arr_time_oneway_fs) {
		this.arr_time_oneway_fs = arr_time_oneway_fs;
	}

	public String getDep_time_oneway_ss() {
		return dep_time_oneway_ss;
	}

	public void setDep_time_oneway_ss(String dep_time_oneway_ss) {
		this.dep_time_oneway_ss = dep_time_oneway_ss;
	}

	public String getArr_time_oneway_ss() {
		return arr_time_oneway_ss;
	}

	public void setArr_time_oneway_ss(String arr_time_oneway_ss) {
		this.arr_time_oneway_ss = arr_time_oneway_ss;
	}

	public String getDep_time_return_fs() {
		return dep_time_return_fs;
	}

	public void setDep_time_return_fs(String dep_time_return_fs) {
		this.dep_time_return_fs = dep_time_return_fs;
	}

	public String getArr_time_return_fs() {
		return arr_time_return_fs;
	}

	public void setArr_time_return_fs(String arr_time_return_fs) {
		this.arr_time_return_fs = arr_time_return_fs;
	}

	public String getDep_time_return_ss() {
		return dep_time_return_ss;
	}

	public void setDep_time_return_ss(String dep_time_return_ss) {
		this.dep_time_return_ss = dep_time_return_ss;
	}

	public String getArr_time_return_ss() {
		return arr_time_return_ss;
	}

	public void setArr_time_return_ss(String arr_time_return_ss) {
		this.arr_time_return_ss = arr_time_return_ss;
	}



}
