import { useState, useEffect } from "react";
import { getPosts, createPost, updatePost, deletePost } from "./services/api";
import { PostList, PostForm, Notification } from './components';


export function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" }); 

  useEffect(() => {
    const loadPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  const handleSavePost = async (id, post) => {
    try {
      if (id) {
        if (id > 100) {
          setPosts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...post } : p))
          );
        } else {
          const updatedPost = await updatePost(id, post);
          setPosts((prev) => prev.map((p) => (p.id === id ? updatedPost : p)));
        }
      } else {
        const newPost = await createPost(post);
        setPosts((prev) => [newPost, ...prev]);
      }
      setEditingPost(null);
      setNotification({ message: "Post salvo com sucesso!", type: "success" }); 
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      setNotification({ message: "Erro ao salvar post. Tente novamente.", type: "error" }); 
    }
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setNotification({ message: "Post excluído com sucesso!", type: "success" }); 
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setNotification({ message: "Edição cancelada.", type: "info" }); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Gerenciador de Posts</h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <PostForm
          onSubmit={handleSavePost}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
          handleCancel={handleCancelEdit} 
        />
        <PostList posts={posts} onEdit={setEditingPost} onDelete={handleDeletePost} />
      </div>

      <Notification 
        message={notification.message} 
        type={notification.type} 
        onClose={() => setNotification({ message: "", type: "" })} 
      />
    </div>
  );
}

export default App;
