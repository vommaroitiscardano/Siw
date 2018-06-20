package controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import model.Utente;
import persistence.DatabaseManager;
import persistence.dao.UtenteDao;

public class SocialLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();

		// log-out
		session.removeAttribute("username");
		session.removeAttribute("loggato");
		session.removeAttribute("utente");
		session.removeAttribute("tipo");
		session.removeAttribute("email");

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		HttpSession session = request.getSession();
		String loggato = (String) session.getAttribute("loggato");

		if (loggato == null) {

			String email = request.getParameter("email");
			String nome = request.getParameter("nome");
			String cognome = request.getParameter("cognome");
			String password = "AAA";
			String tipo = request.getParameter("tipo");
			UtenteDao dao = DatabaseManager.getInstance().getDaoFactory().getUtenteDAO();

			Utente utente = dao.findByEmail(email);

			/*
			 * L'utente non è ancora registrato con l'email che ha inserito bisogna quindi
			 * registrare questo utente e poi farlo entrare.
			 */

			if (utente == null) {

				Utente alternativeUser = new Utente(1, nome, cognome, email, password);
				dao.save(alternativeUser);
			}

			// L'utente è stato registrato per la prima volta tramite facebook e
			// salvato nel database.
			session.setAttribute("email", email);
			session.setAttribute("nome", nome);
			session.setAttribute("cognome", cognome);
			session.setAttribute("loggato", email);
			session.setAttribute("tipo", tipo);

		}

	}

}
