package persistence.dao;

import java.util.List;

import model.Card;

public interface CardDao {
	public void save(Card card);
	public List<Card> retrieveCards(String user);

}
