package controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import com.google.gson.JsonObject;

import model.Post;
import persistence.DatabaseManager;
import persistence.dao.PostDao;

public class ShowPost extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		Integer nPost = Integer.parseInt(request.getParameter("npost"));
		Integer maxPost = Integer.parseInt(request.getParameter("maxpost"));
		
		
		String userid = (String) request.getSession(false).getAttribute("email");

		PostDao postDao = DatabaseManager.getInstance().getDaoFactory().getPostDao();
		ArrayList<Post> postTotali = (ArrayList<Post>) postDao.retrieve(nPost, maxPost);
		// non ci sono post
		if (postTotali == null) {
			maxPost = 0;
			JSONObject obj = new JSONObject();
			try {
				obj.put("nopost", true);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			response.getWriter().write(obj.toString());
			return;

		}

		maxPost += nPost + 1;
		JsonObject risultato = new JsonObject();

		for (int i = 0; i < postTotali.size(); i++) {
			JsonObject post = new JsonObject();
			post.addProperty("msg", postTotali.get(i).getMessaggio());
			post.addProperty("utente", postTotali.get(i).getUtente());
			post.addProperty("title", postTotali.get(i).getTitle());
			post.addProperty("id_post", postTotali.get(i).getIdPost());
			post.addProperty("img", postTotali.get(i).getImgname());
			post.addProperty("utente_sessione", userid);

			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			String reportDate = df.format(postTotali.get(i).getData());
			
			//System.out.println(postTotali.get(i).getImgname());

			post.addProperty("data", reportDate);

			risultato.add("post" + String.valueOf(i), post);
		}
		
		response.getWriter().write(risultato.toString());
		

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
