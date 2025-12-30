export type RootStackParamList = {
    onboarding: undefined;
    home: undefined;
    profile: undefined;
};

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photo: string;
    ordersStatus?: boolean;
    passwordChanges?: boolean;
    offers?: boolean;
    newsletter?: boolean;
};

export type Response = {
    menu: {
        name: string;
        price: number;
        description: string;
        image: string;
        category: string;
    }[];
};

export type MenuItem = {
    id: number;
    title: string;
    price: string;
    description: string;
    image: string;
    category: string;
};

export type MenuItems = MenuItem[];

export type SectionItems = {
    title: string;
    data: Array<Omit<MenuItem, "category">>;
};

export type SectionListData = SectionItems[];
