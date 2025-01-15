import  Loading  from "../../hooks/Loading";
import { Loadingspinner } from '../index';

const PostItem = ({ post, onEdit, onDelete }) => {
  const { loading, startLoading, stopLoading } = Loading();

  const handleEdit = async () => {
    startLoading("edit");
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await onEdit(post);  
    } finally {
      stopLoading(); 
    }
  };

  const handleDelete = async () => {
    startLoading("delete");
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await onDelete(post.id);  
    } finally {
      stopLoading(); 
    }
  };

  return (
    <div className="p-4 bg-gray-50 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
      <p className="text-gray-600">{post.body}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handleEdit}
          disabled={loading === "edit"}
          className={`${
            loading === "edit"
              ? "bg-yellow-300"
              : "bg-yellow-500 hover:bg-yellow-600"
          } text-white px-4 py-2 rounded-lg`}
        >
          {loading === "edit" ? <Loadingspinner /> : "Editar"}
        </button>
        <button
          onClick={handleDelete}
          disabled={loading === "delete"}
          className={`${
            loading === "delete" ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
          } text-white px-4 py-2 rounded-lg`}
        >
          {loading === "delete" ? <Loadingspinner /> : "Excluir"}
        </button>
      </div>
    </div>
  );
};

export default PostItem;