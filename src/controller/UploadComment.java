package controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonObject;

import model.Commento;
import persistence.DatabaseManager;
import persistence.dao.CommentoDao;


public class UploadComment extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
       
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		CommentoDao commentoDao = DatabaseManager.getInstance().getDaoFactory().getCommentoDao();
		
		HttpSession session = request.getSession();
		 
		String nomeUtente = (String) session.getAttribute("nome"); // per l'utente
		String email = (String) session.getAttribute("email");
		String message = request.getParameter("content");
		Long postId = Long.parseLong(request.getParameter("id")) ;
		
		long time = System.currentTimeMillis();
		java.sql.Date date = new java.sql.Date(time);
		
		Commento commentToSave = new Commento(1, message, email, nomeUtente, postId, date);
		commentoDao.save(commentToSave);
		

		JsonObject comment = new JsonObject();
		comment.addProperty("msg", message);
		comment.addProperty("id_post", postId);
		comment.addProperty("utente", email);
		comment.addProperty("nome_utente",nomeUtente);
		comment.addProperty("id_commento",commentToSave.getIdCommento());

		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String reportDate = df.format(commentToSave.getDate());

		comment.addProperty("data", reportDate);

		response.getWriter().write(comment.toString());
	}

}
