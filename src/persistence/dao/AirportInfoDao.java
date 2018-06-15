package persistence.dao;

import model.AirportInfo;

public interface AirportInfoDao {
	public void save(AirportInfo airportInfo);
	public AirportInfo findByPrimaryKey(String key);

}
