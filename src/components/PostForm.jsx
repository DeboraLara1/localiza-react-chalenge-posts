import { useState, useEffect } from "react";

const PostForm = ({ onSubmit, editingPost, handleCancel }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPost) {
      onSubmit(editingPost.id, { title, body });
    } else {
      onSubmit(null, { title, body });
      setTitle("");
      setBody("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Título
        </label>
        <input
          id="title"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
          Conteúdo
        </label>
        <textarea
          id="body"
          placeholder="Conteúdo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {editingPost ? "Atualizar" : "Criar"}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;