import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import type { CategoryId } from '../types/catalogue';

/**
 * Supports SEO-friendly catalogue URLs such as
 * /products/brake-disc/tata/ace  →  /product/tata-ace-brake-disc
 */
export function ProductAlias() {
  const { category, brand, model } = useParams<{
    category: string;
    brand: string;
    model: string;
  }>();

  const match = products.find(
    (product) =>
    product.category === category as CategoryId &&
    product.brandSlug === brand &&
    product.modelSlug === model
  );

  if (match) return <Navigate to={`/product/${match.id}`} replace />;
  if (brand && model) return <Navigate to={`/vehicles/${brand}/${model}`} replace />;
  return <Navigate to="/products" replace />;
}