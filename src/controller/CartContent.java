package controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONException;
import org.json.JSONObject;

public class CartContent extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();
		PrintWriter writer = resp.getWriter();
		if(session.getAttribute("cartContent") != null)
			writer.print((session.getAttribute("cartContent")).toString());
		else
			writer.print("emptyCart");
	}
	
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		HttpSession session = req.getSession();
		
		String action = req.getParameter("add");
		if(action.equals("true")){ //add obj in session
			String start_date = (String) session.getAttribute("start_date");
			String end_date = (String) session.getAttribute("end_date");
			String dep_name = (String) session.getAttribute("dep_name");
			String arr_name = (String) session.getAttribute("arr_name");
			String adults = (String) session.getAttribute("adults");
			String children = (String) session.getAttribute("children");
			
			String index = req.getParameter("index"); //indica il tipo di volo selezionato
			String current_stop = req.getParameter("current_stop"); //lo scalo
			//partenza e arrivo per voli di sola andata
			String dep_time = req.getParameter("dep_time");
			String arr_time = req.getParameter("arr_time");
			//partenza e arrivo per i voli di ritorno: usato per i voli con scalo di andata per la 2a tratta
			String dep_time_r = req.getParameter("dep_time_r");
			String arr_time_r = req.getParameter("arr_time_r");
			//partenza e arrivo per i voli di ritorno con scalo: questo per la prima tratta
			String dep_time1 = req.getParameter("dep_time1");
			String arr_time_1 = req.getParameter("arr_time_1");
			//questo per la seconda tratta
			String dep_time_r1 = req.getParameter("dep_time_r1");
			String arr_time_r1 = req.getParameter("arr_time_r1");
			//il prezzo del volo 
			String price = req.getParameter("price");
			//contenuto html del carrello
			String htmlContent = req.getParameter("htmlContent");
			
			JSONObject obj = new JSONObject();
			try {
				obj.put("start_date", start_date);
				obj.put("end_date", end_date);
				obj.put("dep_name", dep_name);
				obj.put("arr_name", arr_name);
				obj.put("adults", adults);
				obj.put("children", children);
				obj.put("index", index);
				obj.put("current_stop", current_stop);
				obj.put("dep_time", dep_time);
				obj.put("arr_time", arr_time);
				obj.put("dep_time_r", dep_time_r);
				obj.put("arr_time_r", arr_time_r);
				obj.put("dep_time1", dep_time1);
				obj.put("arr_time_1", arr_time_1);
				obj.put("dep_time_r1", dep_time_r1);
				obj.put("arr_time_r1", arr_time_r1);
				obj.put("price", price);
				obj.put("htmlContent", htmlContent);
				
				session.setAttribute("cartContent", obj);
				
			} catch (JSONException e) {
				
			}
		}
		else{ //remove from session
			session.removeAttribute("cartContent");
		}
	}
}
