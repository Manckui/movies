import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from './use-user.types';

interface IUserStore {
  user: IUser;
  updateUser: (user: Partial<IUser>) => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: { name: 'Stan Lee', avatarUrl: '/profile.jpg' },
      updateUser: (user) =>
        set((state) => ({ user: { ...state.user, ...user } })),
    }),
    { name: 'user-profile' }
  )
);
