package controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonObject;

import model.Post;
import persistence.DatabaseManager;
import persistence.dao.PostDao;

/**
 * Servlet implementation class ShowPost
 */

public class ShowPost extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public ShowPost() {
		super();

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		Integer nPost = Integer.parseInt(request.getParameter("npost"));
		Integer maxPost = Integer.parseInt(request.getParameter("maxpost"));

		PostDao postDao = DatabaseManager.getInstance().getDaoFactory().getPostDao();
		ArrayList<Post> postTotali = (ArrayList<Post>) postDao.retrieve(nPost, maxPost);
		// non ce ne sono post
		if (postTotali == null)
			maxPost = 0;


		maxPost += nPost + 1;

		JsonObject risultato = new JsonObject();

		// per ogni commento creo un json e gli addo le proprietà
		for (int i = 0; i < postTotali.size(); i++) {
			JsonObject post = new JsonObject();
			post.addProperty("msg", postTotali.get(i).getMessaggio());
			post.addProperty("utente", postTotali.get(i).getUtente());
			post.addProperty("title", postTotali.get(i).getTitle());
			post.addProperty("id_post", postTotali.get(i).getIdPost());
			post.addProperty("img", postTotali.get(i).getImgname());

			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String reportDate = df.format(postTotali.get(i).getData());
			
			System.out.println(postTotali.get(i).getImgname());

			post.addProperty("data", reportDate);

			risultato.add("post" + String.valueOf(i), post);
		}

		response.getWriter().write(risultato.toString());

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
