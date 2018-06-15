package controller;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		PostDao postDao = DatabaseManager.getInstance().getDaoFactory().getPostDao();
		ArrayList<Post> post = (ArrayList<Post>) postDao.retrieve();

		if (post.isEmpty())
			System.out.println("vuota");
		request.setAttribute("allPosts", post);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
