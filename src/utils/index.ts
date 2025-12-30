import type { MenuItems, SectionItems, SectionListData } from "@/src/types";

import { useEffect, useRef } from "react";

function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getSectionListData(data: MenuItems): SectionListData {
    const sections: Record<string, SectionItems> = {};

    data.forEach((item) => {
        if (!sections[item.category]) {
            sections[item.category] = {
                title: capitalizeFirstLetter(item.category),
                data: [],
            };
        }
        sections[item.category].data.push({
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            image: item.image,
        });
    });

    return Object.values(sections);
}

export function useUpdateEffect(effect: () => void, dependencies: any[] = []) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
}

export const validateEmail = (email: string) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateName = (name: string) => {
    return name.match(/^[a-zA-Z]+$/);
};
