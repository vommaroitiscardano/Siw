package persistence.dao;

import java.util.List;

import model.Ticket;

public interface TicketDao {
	public void save(Ticket ticket);
	public List<Ticket> retrieveTicket(String user);
}
