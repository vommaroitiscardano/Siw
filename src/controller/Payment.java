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

import model.Card;
import model.Ticket;
import persistence.DatabaseManager;
import persistence.dao.CardDao;
import persistence.dao.TicketDao;

public class Payment extends HttpServlet{
	
	private static final long serialVersionUID = 1L;
	
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		if(session.getAttribute("email") != null){
			String user = (String)session.getAttribute("email");
			CardDao cardDao = DatabaseManager.getInstance().getDaoFactory().getCardDao();
			List<Card> cards = cardDao.retrieveCards(user);
			
			JSONObject obj = new JSONObject();
			JSONArray array = new JSONArray();
			try {
				if(cards == null){
					JSONObject c = new JSONObject();
					c.put("cards", false);
					resp.getWriter().write(c.toString());
					return;
				}
			
				for(Card i : cards){
					JSONObject tmp = new JSONObject();
					tmp.put("number", i.getCard_number());
					tmp.put("name", i.getCard_name());
					tmp.put("date",i.getExpiration_date());
					tmp.put("cvv", i.getCard_cvv());
					array.put(tmp);
				}
				obj.put("cards", array);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			
			resp.getWriter().write(obj.toString());
			
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		String user = (String) session.getAttribute("email");
		String card_name = req.getParameter("card_name");
		String card_number = req.getParameter("card_number");
		String month_expiration = req.getParameter("month_expiration");
		String year_expiration = req.getParameter("year_expiration");
		String card_cvv = req.getParameter("card_cvv");
		String checkbox = req.getParameter("checkbox");
		
		String selected_card = req.getParameter("selected_card");
		
		//memorizzo la carta nel db
		if(checkbox != null && selected_card == null){
			String fullDate = year_expiration+"-"+(month_expiration.length() == 1 ?("0"+month_expiration)  : month_expiration);
			Card c = new Card();
			c.setUser(user);
			c.setCard_name(card_name);
			c.setCard_number(card_number);
			c.setExpiration_date(fullDate);
			c.setCard_cvv(card_cvv);
			CardDao cardDao = DatabaseManager.getInstance().getDaoFactory().getCardDao();
			cardDao.save(c);
			
		}
		
		//se non è presente un volo nel carrello, non è possibile completare il salvataggio
		if(session.getAttribute("cartContent") == null){
			req.getRequestDispatcher("index.jsp").forward(req, resp);
			return;
		}
		
		JSONObject cart = (JSONObject) session.getAttribute("cartContent");
		
		try{
			//rendo il volo persistente
			String start_date = cart.getString("start_date");
			String end_date = (cart.getString("index").equals("1") || cart.getString("index").equals("3")) ? "": cart.getString("end_date");
			String dep_name = cart.getString("dep_name");
			String arr_name = cart.getString("arr_name");
			String index = cart.getString("index");
			String current_stop = cart.getString("current_stop");
			String dep_time = cart.getString("dep_time");
			String arr_time = cart.getString("arr_time");
			String dep_time_r = cart.getString("dep_time_r");
			String arr_time_r = cart.getString("arr_time_r");
			String price = cart.getString("price");
			
			TicketDao ticketDao = DatabaseManager.getInstance().getDaoFactory().getTicketDao();
			Ticket t = new Ticket(start_date, dep_time, arr_time, dep_name, arr_name, end_date, dep_time_r, arr_time_r, current_stop, price, user, index);
			ticketDao.save(t);
			
			session.removeAttribute("cartContent");
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
