import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostForm from './PostForm';

describe('PostForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockHandleCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Renderiza o formulário corretamente', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Conteúdo/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Criar/i })).toBeInTheDocument();
  });

  test('submete os dados corretamente ao criar um novo post', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Novo Post' } });
    fireEvent.change(screen.getByLabelText(/Conteúdo/i), { target: { value: 'Conteúdo do Post' } });
    fireEvent.click(screen.getByRole('button', { name: /Criar/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith(null, {
      title: 'Novo Post',
      body: 'Conteúdo do Post',
    });
  });

  test('preenche os campos ao editar um post existente', () => {
    const editingPost = { id: 1, title: 'Título Editado', body: 'Conteúdo Editado' };

    render(<PostForm onSubmit={mockOnSubmit} editingPost={editingPost} />);

    expect(screen.getByLabelText(/Título/i)).toHaveValue('Título Editado');
    expect(screen.getByLabelText(/Conteúdo/i)).toHaveValue('Conteúdo Editado');
    expect(screen.getByRole('button', { name: /Atualizar/i })).toBeInTheDocument();
  });

  test('submete os dados corretamente ao atualizar um post', () => {
    const editingPost = { id: 1, title: 'Título Original', body: 'Conteúdo Original' };

    render(<PostForm onSubmit={mockOnSubmit} editingPost={editingPost} />);

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Título Atualizado' } });
    fireEvent.change(screen.getByLabelText(/Conteúdo/i), { target: { value: 'Conteúdo Atualizado' } });
    fireEvent.click(screen.getByRole('button', { name: /Atualizar/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith(1, {
      title: 'Título Atualizado',
      body: 'Conteúdo Atualizado',
    });
  });

  test('chama handleCancel ao clicar em "Cancelar"', () => {
    const editingPost = { id: 1, title: 'Título Original', body: 'Conteúdo Original' };

    render(<PostForm onSubmit={mockOnSubmit} editingPost={editingPost} handleCancel={mockHandleCancel} />);

    fireEvent.click(screen.getByRole('button', { name: /Cancelar/i }));

    expect(mockHandleCancel).toHaveBeenCalled();
  });

  test('limpa os campos após a criação de um novo post', () => {
    render(<PostForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Post Temporário' } });
    fireEvent.change(screen.getByLabelText(/Conteúdo/i), { target: { value: 'Conteúdo Temporário' } });
    fireEvent.click(screen.getByRole('button', { name: /Criar/i }));

    expect(screen.getByLabelText(/Título/i)).toHaveValue('');
    expect(screen.getByLabelText(/Conteúdo/i)).toHaveValue('');
  });
});
