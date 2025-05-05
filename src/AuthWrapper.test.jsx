import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthWrapper from './AuthWrapper';

const ProtectedPage = () => <div>Protected Content</div>;
const AdminPage = () => <div>Admin Dashboard</div>;

describe('AuthWrapper', () => {
  test('redirects unauthenticated users', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated: false, loading: false }}>
          <AuthWrapper>
            <ProtectedPage />
          </AuthWrapper>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.queryByText('Protected Content')).toBeNull();
  });

  test('renders loading spinner while loading', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated: false, loading: true }}>
          <AuthWrapper>
            <ProtectedPage />
          </AuthWrapper>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders children for authenticated users', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuthenticated: true, loading: false }}>
          <AuthWrapper>
            <ProtectedPage />
          </AuthWrapper>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  test('shows unauthorized modal for users without required roles', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isAuthenticated: true,
            loading: false,
            currentUser: { roles: ['customer'] },
          }}
        >
          <AuthWrapper requiredRoles={['admin']}>
            <ProtectedPage />
          </AuthWrapper>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/you do not have the required permissions/i)).toBeInTheDocument();
  });

  test('allows access with correct roles', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            isAuthenticated: true,
            loading: false,
            currentUser: { roles: ['admin'] },
          }}
        >
          <AuthWrapper requiredRoles={['admin']}>
            <AdminPage />
          </AuthWrapper>
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
  });
});