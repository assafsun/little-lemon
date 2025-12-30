import * as SQLite from "expo-sqlite";
import { MenuItem, MenuItems } from "../types";

// The database is opened asynchronously.
const dbPromise = SQLite.openDatabaseAsync("littleLemon.db");

export async function createTable(): Promise<void> {
    const db = await dbPromise;
    try {
        await db.execAsync(
            "create table if not exists menuitems (id integer primary key not null, title text, price text, description text, image text, category text);"
        );
    } catch (error) {
        console.error("Error executing SQL in createTable:", error);
        throw error;
    }
}

export async function getMenuItems(): Promise<MenuItems> {
    const db = await dbPromise;
    try {
        const allRows = await db.getAllAsync<MenuItem>("SELECT * FROM menuitems");
        return allRows || [];
    } catch (error) {
        console.error("Error executing SQL in getMenuItems:", error);
        throw error;
    }
}

export async function saveMenuItems(menuItems: MenuItems): Promise<void> {
    const db = await dbPromise;
    try {
        await db.withTransactionAsync(async () => {
            for (const item of menuItems) {
                await db.runAsync(
                    "INSERT OR REPLACE INTO menuitems (id, title, price, description, image, category) VALUES (?, ?, ?, ?, ?, ?)",
                    item.id,
                    item.title,
                    item.price,
                    item.description,
                    item.image,
                    item.category
                );
            }
        });
    } catch (error) {
        console.error("Error executing SQL in saveMenuItems:", error);
        throw error;
    }
}

export async function filterByQueryAndCategories(
    query: string,
    activeCategories: string[]
): Promise<MenuItems> {
    if (activeCategories.length === 0) {
        return [];
    }
    const db = await dbPromise;
    try {
        const placeholders = activeCategories.map(() => "?").join(", ");
        const sql = `SELECT * FROM menuitems WHERE title LIKE ? AND category IN (${placeholders})`;
        const params: (string | number)[] = [`%${query}%`, ...activeCategories];
        const result = await db.getAllAsync<MenuItem>(sql, params);
        return result || [];
    } catch (error) {
        console.error("Error executing SQL in filterByQueryAndCategories:", error);
        throw error;
    }
}
