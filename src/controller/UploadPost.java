package controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

import model.Post;
import persistence.DatabaseManager;
import persistence.dao.PostDao;

public class UploadPost extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * Directory where uploaded files will be saved, its relative to the web
	 * application directory.
	 */

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PostDao postDao = DatabaseManager.getInstance().getDaoFactory().getPostDao();

		// prendo i dati dalla js
		String title = request.getParameter("title");
		String message = request.getParameter("content");
		String userid = (String) request.getSession(false).getAttribute("email");
		String pathimg = request.getParameter("img");

		System.out.println("this is the author of the post" + userid);

		// creo la data del giorno corrente
		long time = System.currentTimeMillis();
		java.sql.Date date = new java.sql.Date(time);
		
		Post postToSave = new Post(1, title, message, userid, pathimg, date);

		postDao.save(postToSave);

		

		// per ogni commento creo un json e gli addo le proprietà

		JsonObject post = new JsonObject();
		post.addProperty("msg",postToSave.getMessaggio());
		post.addProperty("title", postToSave.getTitle());
		post.addProperty("utente", postToSave.getUtente());
		post.addProperty("img", postToSave.getImgname());
		post.addProperty("id_post", postToSave.getIdPost());

		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		String reportDate = df.format(postToSave.getData());

		post.addProperty("data", reportDate);

		
	

		response.getWriter().write(post.toString());

	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
	}

}