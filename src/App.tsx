import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { InquiryProvider } from './contexts/InquiryContext';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { ProductAlias } from './pages/ProductAlias';
import { Vehicles } from './pages/Vehicles';
import { VehicleBrand } from './pages/VehicleBrand';
import { VehicleModel } from './pages/VehicleModel';
import { SearchResults } from './pages/SearchResults';
import { About } from './pages/About';
import { Manufacturing } from './pages/Manufacturing';
import { Quality } from './pages/Quality';
import { Infrastructure } from './pages/Infrastructure';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <BrowserRouter>
      <InquiryProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<Products />} />
            <Route path="/products/:category/:brand/:model" element={<ProductAlias />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/:brand" element={<VehicleBrand />} />
            <Route path="/vehicles/:brand/:model" element={<VehicleModel />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </InquiryProvider>
    </BrowserRouter>);

}