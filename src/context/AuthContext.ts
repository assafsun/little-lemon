import type { User } from "@/src/types";

import { createContext } from "react";

export interface AuthContextType {
    user: User | null;
    onboard: (data: User) => void;
    update: (data: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    onboard: () => {},
    update: () => {},
    logout: () => {},
});

export default AuthContext;
