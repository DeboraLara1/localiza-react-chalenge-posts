import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostItem from './PostItem';
import * as LoadingHook from '../hooks/loading'; 

jest.mock('../hooks/loading'); 
jest.mock('./Loadingspinner', () => () => <div>Loading...</div>); 

import '@testing-library/jest-dom';

describe('PostItem Component', () => {
  const mockPost = { id: 1, title: 'Post Title', body: 'Post Body' };
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    LoadingHook.default.mockReturnValue({
      loading: null,
      startLoading: jest.fn(),
      stopLoading: jest.fn(),
    });
  });

  test('Renderiza o item de postagem corretamente', () => {
    render(<PostItem post={mockPost} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.body)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /editar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /excluir/i })).toBeInTheDocument();
  });

  test('Aciona onEdit quando o botão de edição é clicado', async () => {
    const { startLoading, stopLoading } = LoadingHook.default();
    render(<PostItem post={mockPost} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByRole('button', { name: /editar/i }));

    await waitFor(() => {
      expect(startLoading).toHaveBeenCalledWith('edit');
    });

    await waitFor(() => {
      expect(mockOnEdit).toHaveBeenCalledWith(mockPost);
      expect(stopLoading).toHaveBeenCalled();
    });
  });

  test('Aciona onDelete quando o botão delete é clicado', async () => {
    const { startLoading, stopLoading } = LoadingHook.default();
    render(<PostItem post={mockPost} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getByRole('button', { name: /excluir/i }));

    await waitFor(() => {
      expect(startLoading).toHaveBeenCalledWith('delete');
    });

    await waitFor(() => {
      expect(mockOnDelete).toHaveBeenCalledWith(mockPost.id);
      expect(stopLoading).toHaveBeenCalled();
    });
  });
  
});
