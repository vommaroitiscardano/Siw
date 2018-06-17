package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CartContent extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

	}
	
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//dalla sessione posso recuperare
		/*
		 *  - children
		 *  -adults
		 *  -start-date
		 *  -end-date
		 *  -dep_name
		 *  -arr_name
		 */
		String action = req.getParameter("add");
		if(action.equals("true")){ //add obj in session
			System.out.println("aggiungo l'oggetto alla session");
		}
		else{ //remove from session
			System.out.println("rimuovo l'oggetto dalla session");
		}
		
		
		//quindi cerare JSON e memorizzarlo nella sessione
	}
}
