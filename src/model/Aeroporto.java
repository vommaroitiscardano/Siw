package model;

public class Aeroporto {

	private String idAeroporto;
	private String nome;
	private Luogo luogo;
	
	public Aeroporto(String idAeroporto, String nome, Luogo luogo) {
		this.idAeroporto = idAeroporto;
		this.nome = nome;
		this.luogo = luogo;		
	}

	//set e get
	public String getIdAeroporto() {
		return idAeroporto;
	}
	public void setIdAeroporto(String idAeroporto) {
		this.idAeroporto = idAeroporto;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Luogo getLuogo() {
		return luogo;
	}
	public void setLuogo(Luogo luogo) {
		this.luogo = luogo;
	}

}
