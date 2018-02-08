package model;

public class Aeroporto {

	private long idAeroporto;
	private String nome;
	private Luogo luogo;

	//set e get
	public long getIdAeroporto() {
		return idAeroporto;
	}
	public void setIdAeroporto(long idAeroporto) {
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
