export const store = {
  getStore: async (key: string): Promise<UserInfo | null> => {
    // Mock implementation for getting data from the store
    console.log(`Getting data for key: ${key}`);
    return null;
  },
  setStore: async (key: string, value: any) => {
    // Mock implementation for setting data in the store
    console.log(`Setting data for key: ${key}`, value);
  },
  subscribe: (key: string, callback: (value: any) => void) => {
    // Mock implementation for subscribing to store changes
    console.log(`Subscribed to changes for key: ${key}`);
    return () => console.log(`Unsubscribed from changes for key: ${key}`);
  },
};