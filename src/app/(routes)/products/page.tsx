'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Loading products...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-[4/3] bg-gray-200" />
              <CardHeader className="p-4">
                <CardTitle><div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div></CardTitle>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </CardHeader>
              <CardContent className="px-4 pb-2 pt-0">
                <div className="h-3 bg-gray-200 rounded w-full mb-1.5"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </CardContent>
              <CardFooter className="px-4 pb-4 pt-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-9 bg-gray-200 rounded w-24 ml-auto"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
                <Link href={`/products/${product.id}`} className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={product.image_url || '/placeholder-product.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg line-clamp-1">
                      <Link href={`/products/${product.id}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </CardTitle>
                    <Badge 
                      variant={product.stock > 0 ? 'default' : 'destructive'} 
                      className="shrink-0 text-xs"
                    >
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs mt-1">
                    {product.category}
                  </Badge>
                </CardHeader>
                <CardContent className="px-4 pb-2 pt-0 flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter className="px-4 pb-4 pt-2">
                  <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                  <Button 
                    size="sm" 
                    className="ml-auto"
                    disabled={product.stock === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Add to cart:', product.id);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}