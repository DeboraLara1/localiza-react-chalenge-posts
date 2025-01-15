import React from 'react';
import { render, screen } from '@testing-library/react';
import PostList from './PostList';
import '@testing-library/jest-dom';

describe('PostList', () => {
  const mockPosts = [
    { id: 1, title: 'Post 1', content: 'Content 1' },
    { id: 2, title: 'Post 2', content: 'Content 2' },
  ];

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  test('Renderiza postagens corretamente', () => {
    render(<PostList posts={mockPosts} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  test('Não renderiza posts quando a matriz está vazia', () => {
    render(<PostList posts={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.queryByText('Post 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Post 2')).not.toBeInTheDocument();
  });
});
