package controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.Commento;
import persistence.DatabaseManager;
import persistence.dao.CommentoDao;


public class UploadComment extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public UploadComment() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		CommentoDao commentoDao = DatabaseManager.getInstance().getDaoFactory().getCommentoDao();
		
		HttpSession session = request.getSession();
		 
		String userid = (String) session.getAttribute("email"); // per l'utente
		String message = request.getParameter("mess");
		Long postId = Long.parseLong(request.getParameter("idPost")) ;
		
		
		long time = System.currentTimeMillis();
		java.sql.Date date = new java.sql.Date(time);
		
		
		commentoDao.save(new Commento(1, message, userid, postId, date));	
		
		RequestDispatcher dis = request.getRequestDispatcher("blog.jsp");
		dis.forward(request, response);
		
	}

}
