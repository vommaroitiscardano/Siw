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

import model.Commento;
import persistence.DatabaseManager;
import persistence.dao.CommentoDao;

public class ShowComment extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
    		throws ServletException, IOException {
    	
    	//num del post
        Long idP = Long.parseLong(request.getParameter("npost"));
    	String userid = (String) request.getSession(false).getAttribute("email");

        CommentoDao commentoDao = DatabaseManager.getInstance().getDaoFactory().getCommentoDao();
        
        //tutti i commenti del post 
        ArrayList < Commento > commenti = commentoDao.retrieve(idP);

//        if (commenti.isEmpty())
//            System.out.println("commenti vuoti");
//
//        for (int i = 0; i < commenti.size(); i++)
//            System.out.println(commenti.get(i).getIdCommento() + " " + commenti.get(i).getMessaggio());


        JsonObject risultato = new JsonObject();
        
        //per ogni commento creo un json e gli addo le proprietà
        for (int i = 0; i < commenti.size(); i++) {
            JsonObject commento = new JsonObject();
            commento.addProperty("msg", commenti.get(i).getMessaggio());
            commento.addProperty("utente", commenti.get(i).getUtente());
            commento.addProperty("id_commento", commenti.get(i).getIdCommento());
            commento.addProperty("utente_sessione", userid);
            commento.addProperty("nome_utente", commenti.get(i).getNomeUtente());
            

            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            String reportDate = df.format(commenti.get(i).getDate());
            
            commento.addProperty("data", reportDate);
          

            risultato.add("commento" + String.valueOf(i), commento);
        }
        userid= "";

        response.getWriter().write(risultato.toString());

    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws ServletException, IOException {
        doGet(request, response);

    }
}