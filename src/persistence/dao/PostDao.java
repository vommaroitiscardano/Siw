package persistence.dao;

import java.util.ArrayList;

import model.Post;

public interface PostDao {
	public void save(Post post);
	public void delete(Long idPost);
	public ArrayList<Post> retrieve(Integer nPost, Integer maxPost);

	

}
