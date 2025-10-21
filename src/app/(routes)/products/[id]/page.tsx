'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
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
  details?: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p>{error}</p>
        <Button variant="link" className="mt-4 p-0" onClick={() => window.history.back()}>
          &larr; Back to products
        </Button>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" asChild className="mb-6 pl-0">
        <a href="/products" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Products
        </a>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image_url || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        
        <div>
          <div className="flex justify-between items-start gap-4 mb-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <Badge variant={product.stock > 0 ? 'default' : 'destructive'} className="text-sm">
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Badge>
          </div>
          
          <Badge variant="outline" className="mb-6">
            {product.category}
          </Badge>
          
          <p className="text-2xl font-bold text-primary mb-6">
            ${product.price.toFixed(2)}
          </p>
          
          <p className="text-gray-700 mb-8">
            {product.details || product.description}
          </p>
          
          <div className="flex items-center gap-4">
            <Button 
              size="lg" 
              className="flex-1"
              disabled={product.stock === 0}
              onClick={() => console.log('Add to cart:', product.id)}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            
            {product.stock > 0 && (
              <span className="text-sm text-gray-500">
                {product.stock} available
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}