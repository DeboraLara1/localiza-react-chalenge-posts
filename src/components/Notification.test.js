import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Notification from './Notification';

describe('Notification Component', () => {
  const mockOnClose = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Renderiza a mensagem corretamente quando fornecida', () => {
    render(<Notification message="Teste de sucesso" type="success" onClose={mockOnClose} />);

    expect(screen.getByText('Teste de sucesso')).toBeInTheDocument();
    expect(screen.getByText('Teste de sucesso')).toHaveClass('bg-green-500');
  });

  test('Aplica o estilo correto para notificações de erro', () => {
    render(<Notification message="Teste de erro" type="error" onClose={mockOnClose} />);

    expect(screen.getByText('Teste de erro')).toBeInTheDocument();
    expect(screen.getByText('Teste de erro')).toHaveClass('bg-red-500');
  });

  test('Não renderiza nada quando a mensagem não é fornecida', () => {
    const { container } = render(<Notification message="" type="success" onClose={mockOnClose} />);

    expect(container.firstChild).toBeNull();
  });

  test('Chama onClose após 2 segundos', () => {
    jest.useFakeTimers(); 
    render(<Notification message="Teste de fechamento" type="success" onClose={mockOnClose} />);

    expect(mockOnClose).not.toHaveBeenCalled();

    jest.advanceTimersByTime(2000);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('Limpa o timer ao desmontar o componente', () => {
    jest.useFakeTimers();
    const { unmount } = render(
      <Notification message="Teste de desmontagem" type="success" onClose={mockOnClose} />
    );

    unmount();

    jest.advanceTimersByTime(2000);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
