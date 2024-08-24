'use client'
import { useState } from 'react';
import Head from 'next/head';

interface Results {
  largeValue: number;
  smallValue: number;
  mediumValue: number;
  bestOption: string;
}

export default function Home() {
  const [results, setResults] = useState<Results | null>(null);

  const calculatePizzaValue = (diameter: number, price: number = 1): number => {
    const area = Math.PI * (diameter / 2) ** 2;
    return area / price;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const largeDiameter = Number(data.largeDiameter as string);
    const largePrice = data.largePrice ? Number(data.largePrice as string) : 1; // Default price to 1 if not provided
    const largeQuantity = Number(data.largeQuantity as string);

    const smallDiameter = Number(data.smallDiameter as string);
    const smallPrice = data.smallPrice ? Number(data.smallPrice as string) : 1; // Default price to 1 if not provided
    const smallQuantity = Number(data.smallQuantity as string);

    const mediumDiameter = Number(data.mediumDiameter as string);
    const mediumPrice = data.mediumPrice ? Number(data.mediumPrice as string) : 1; // Default price to 1 if not provided
    const mediumQuantity = Number(data.mediumQuantity as string);

    const largeValue = largeDiameter && largeQuantity ? calculatePizzaValue(largeDiameter, largePrice) * largeQuantity : 0;
    const smallValue = smallDiameter && smallQuantity ? calculatePizzaValue(smallDiameter, smallPrice) * smallQuantity : 0;
    const mediumValue = mediumDiameter && mediumQuantity ? calculatePizzaValue(mediumDiameter, mediumPrice) * mediumQuantity : 0;

    const values = [
      { value: largeValue, label: `${largeQuantity} large pizza(s)` },
      { value: smallValue, label: `${smallQuantity} small pizza(s)` },
      { value: mediumValue, label: `${mediumQuantity} medium pizza(s)` },
    ].filter(item => item.value > 0);

    if (values.length === 0) {
      setResults(null);
      return;
    }

    const bestValue = Math.max(...values.map(item => item.value));
    const bestOption = values.find(item => item.value === bestValue)?.label || '';

    setResults({
      largeValue,
      smallValue,
      mediumValue,
      bestOption: `${bestOption} offer the best value.`,
    });
  };

  return (
    <div className="bg-yellow-50 min-h-screen"> {/* Light yellow background resembling pizza dough */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4 text-red-700 text-center pt-8 sm:pt-12 lg:pt-16">🍕 Pizza Size and Price Comparison</h1>
        <form id="pizzaForm" onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-4">
          <div className="bg-red-100 p-4 rounded-lg w-full sm:w-auto border-2 border-black shadow-bottom"> {/* Light red background resembling tomato sauce */}
            <h2 className="text-xl font-semibold text-black mb-2">Large Pizza</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input type="number" name="largeDiameter" placeholder="Diameter" defaultValue="14" className="border p-2 bg-white" />
                <span className="ml-2">in</span>
              </div>
              <div className="flex items-center">
                <input type="number" name="largePrice" placeholder="Price" className="border p-2 bg-white" step="0.01" />
                <span className="ml-2">$</span>
              </div>
              <input type="number" name="largeQuantity" placeholder="Quantity" defaultValue="1" className="border p-2 bg-white" min="1" />
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg w-full sm:w-auto border-2 border-black shadow-bottom"> {/* Light green background resembling herbs */}
            <h2 className="text-xl font-semibold text-black mb-2">Small Pizzas</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input type="number" name="smallDiameter" placeholder="Diameter" defaultValue="10" className="border p-2 bg-white" />
                <span className="ml-2">in</span>
              </div>
              <div className="flex items-center">
                <input type="number" name="smallPrice" placeholder="Price" className="border p-2 bg-white" step="0.01" />
                <span className="ml-2">$</span>
              </div>
              <input type="number" name="smallQuantity" placeholder="Quantity" defaultValue="2" className="border p-2 bg-white" min="1" />
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg w-full sm:w-auto border-2 border-black shadow-bottom"> {/* Slightly darker yellow background resembling cheese */}
            <h2 className="text-xl font-semibold text-black mb-2">Medium Pizzas</h2>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <input type="number" name="mediumDiameter" placeholder="Diameter" defaultValue="12" className="border p-2 bg-white" />
                <span className="ml-2">in</span>
              </div>
              <div className="flex items-center">
                <input type="number" name="mediumPrice" placeholder="Price" className="border p-2 bg-white" step="0.01" />
                <span className="ml-2">$</span>
              </div>
              <input type="number" name="mediumQuantity" placeholder="Quantity" defaultValue="2" className="border p-2 bg-white" min="1" />
            </div>
          </div>
        </form>
        <div>
          <button 
            type="submit" 
            form="pizzaForm"
            className="bg-black hover:bg-gray-800 text-white px-3 py-3 rounded text-m font-medium"
          >
            Compare Pizzas
          </button>
        </div>
      </div>

      {results && (
        <div className="mt-8 bg-green-50 p-4 rounded-lg max-w-2xl mx-auto border-2 border-black shadow-bottom"> {/* Light green background for results */}
          <h2 className="text-2xl font-bold mb-2 text-black">Results</h2>
          <p className="text-gray-800">Large Pizza: {results.largeValue.toFixed(2)} sq inches per dollar</p>
          <p className="text-gray-800">Small Pizzas: {results.smallValue.toFixed(2)} sq inches per dollar</p>
          <p className="text-gray-800">Medium Pizzas: {results.mediumValue.toFixed(2)} sq inches per dollar</p>
          <p className="font-bold mt-2 text-black">{results.bestOption}</p>
        </div>
      )}
    </div>
  );
}