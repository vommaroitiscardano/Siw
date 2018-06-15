package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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

		HttpSession session = request.getSession();

		String title = request.getParameter("title");
		String message = request.getParameter("mess");
		String userid = (String) request.getSession(false).getAttribute("email");
		//String userid = (String) session.getAttribute("username"); // per l'utente
		String pathimg = request.getParameter("link_image");
		System.out.println("this is the author of the post" + userid);

		// upload photo
		long time = System.currentTimeMillis();
		java.sql.Date date = new java.sql.Date(time);
		postDao.save(new Post(1, title, message, userid, pathimg, date));
		
		doGet(request, response);
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		RequestDispatcher dis = req.getRequestDispatcher("blog.jsp");
		dis.forward(req, resp);
	}

}