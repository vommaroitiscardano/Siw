package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import persistence.DatabaseManager;
import persistence.dao.PostDao;


public class DeletePost extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Long nPost = Long.parseLong(request.getParameter("npost"));
		PostDao postDao = DatabaseManager.getInstance().getDaoFactory().getPostDao();
		postDao.delete(nPost);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
