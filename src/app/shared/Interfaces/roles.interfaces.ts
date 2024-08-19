
export interface Permission {
    id: number;
    slug: string;
    description: string;
    name: string;
    active: boolean;
}

export interface Role {
    id: number;
    name: string;
    active: boolean;
    organization: any; 
    permissions: Permission[];
    user_count: number;
}

export type RolesResponse = Role[];
