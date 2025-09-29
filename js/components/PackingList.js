// PackingList Component
const PackingList = ({ destination, onClose }) => {
    if (!destination) return null;

    // Helper function to generate packing suggestions
    const getPackingSuggestions = (dest) => {
        const suggestions = {
            essentials: ['ID & Tickets', 'Phone & Charger', 'Wallet (Cash/Cards)', 'Medications'],
            clothing: [],
            footwear: ['Comfortable Shoes'],
            toiletries: ['Toothbrush & Paste', 'Soap/Shampoo', 'Sunscreen'],
            extras: []
        };

        const temp = parseInt(dest.temperature);

        // Clothing based on temperature
        if (temp > 25) {
            suggestions.clothing.push('T-Shirts & Shorts', 'Light Cotton Clothes', 'Sun Hat');
        } else if (temp < 15) {
            suggestions.clothing.push('Warm Jacket', 'Sweaters', 'Thermals', 'Beanie & Gloves');
        } else {
            suggestions.clothing.push('Light Jacket', 'Full-sleeve T-shirts', 'Jeans/Trousers');
        }

        // Suggestions based on activities
        if (dest.activities.some(a => a.toLowerCase().includes('beach'))) {
            suggestions.clothing.push('Swimsuit');
            suggestions.footwear.push('Flip-flops');
            suggestions.extras.push('Beach Towel');
        }
        if (dest.activities.some(a => a.toLowerCase().includes('trekking'))) {
            suggestions.footwear.push('Hiking Boots');
            suggestions.extras.push('Backpack', 'Water Bottle');
        }
        if (dest.activities.some(a => a.toLowerCase().includes('yoga'))) {
            suggestions.clothing.push('Yoga Pants / Comfortable Wear');
        }

        return suggestions;
    };

    const packingItems = getPackingSuggestions(destination);

    const renderCategory = (title, items, icon) => (
        <div className="mb-4">
            <h4 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                <i className={`${icon} mr-2 text-blue-500`}></i>
                {title}
            </h4>
            <ul className="space-y-1">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                        <i className="fas fa-check-circle text-green-500 mr-2 text-sm"></i>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>
                
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        <i className="fas fa-suitcase-rolling mr-2 text-blue-500"></i>
                        Packing List for {destination.name}
                    </h2>
                    <p className="text-gray-500">AI-powered suggestions for your trip</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        {renderCategory('Essentials', packingItems.essentials, 'fas fa-id-card')}
                        {renderCategory('Toiletries', packingItems.toiletries, 'fas fa-pump-soap')}
                    </div>
                    <div>
                        {renderCategory('Clothing', packingItems.clothing, 'fas fa-tshirt')}
                        {renderCategory('Footwear', packingItems.footwear, 'fas fa-shoe-prints')}
                        {packingItems.extras.length > 0 && renderCategory('Extras', packingItems.extras, 'fas fa-plus-square')}
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

window.PackingList = PackingList;