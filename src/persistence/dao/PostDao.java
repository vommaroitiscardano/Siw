package persistence.dao;

import java.util.ArrayList;
import java.util.List;

import model.Post;

public interface PostDao {
	public void save(Post post);
	
	public List<Post> findAll();
	public void delete(Long idPost);
	public void update(Post post);
	

	ArrayList<Post> retrieve(Integer nPost, Integer maxPost);

	

}
