
class ItemFetcher {
    execute(itemId) {
        let items = new Map();
        items.set(1, {
            name: 'Shirt',
            price: 2000,
            sizes: ['small', 'medium', 'large']
        });
        items.set(2, {
            name: 'Shoes',
            price: 4000,
            sizes: [13, 14, 15]
        });
        items.set(3, {
            name: 'Pants',
            price: 6000,
            sizes: [30, 32, 34, 36, 38, 40, 42, 44, 46]
        });

        return items.get(itemId);
    }

    static normalizeInteger(v) {
        return parseInt(v, 10);
    }

    static describe() {
        return {
            description: 'Sample command to fetch item information.',
            input: {
                params: {
                    itemId: {
                        type: 'integer',
                        description: "The ID of the item that we are getting information about",
                        default: 1,
                        normalize: ItemFetcher.normalizeInteger
                    }
                }
            },
            output: {
                type: 'object',
                describe: {
                    name: 'string',
                    price: 'integer',
                    sizes: ['integer|string']
                }
            }
        }
    }
}

module.exports = ItemFetcher;