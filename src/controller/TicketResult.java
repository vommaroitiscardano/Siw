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

import model.Ticket;
import persistence.DatabaseManager;
import persistence.dao.TicketDao;

public class TicketResult extends HttpServlet{
	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		String user = (String) session.getAttribute("email");
		
		TicketDao ticketDao = DatabaseManager.getInstance().getDaoFactory().getTicketDao();
		List<Ticket> tickets = ticketDao.retrieveTicket(user);
		try {
			if(tickets == null){
				JSONObject res = new JSONObject();
				res.put("tickets", false);
				resp.getWriter().write(res.toString());
				return;
			}
			
			JSONObject result = new JSONObject();
			JSONArray array = new JSONArray();
			for(Ticket t : tickets){
				JSONObject curr = new JSONObject();
				curr.put("dep_date",t.getDepartureDate());
				curr.put("ret_date",t.getReturnDate());
				curr.put("dep_name",t.getDepartureAirport());
				curr.put("arr_name",t.getArrivalAirport());
				curr.put("stop",t.getStop());
				curr.put("dep_time",t.getDepartureTime());
				curr.put("arr_time",t.getArrivalTime());
				curr.put("dep_time_r",t.getDepartureTime_r());
				curr.put("arr_time_r",t.getArrivalTime_r());
				curr.put("price",t.getPrice());
				curr.put("index",t.getFlightType());
				
				array.put(curr);
			}
			result.put("tickets", array);
			resp.getWriter().write(result.toString());
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}
}
