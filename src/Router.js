import React from "react";
import { Route, IndexRoute } from "react-router";
import Products from './screens/product'
import Imeis from './screens/product/imei'



const Router = () => (
    <>
        <Route path="/" exact={true} component={Products} />
        <Route path="/products" component={Products} />
        <Route path="/imeis/:upc" component={Imeis} />
        {/* <IndexRoute component={Dashboard} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="form" component={FormPage} />
        <Route path="customer" component={CustomerFormPage} />
        <Route path="customer/:id" component={CustomerFormPage} />
        <Route path="order" component={OrderFormPage} />
        <Route path="order/:id" component={OrderFormPage} />
        <Route path="product" component={ProductFormPage} />
        <Route path="product/:id" component={ProductFormPage} />
        <Route path="customers" component={CustomerListPage} />
        <Route path="orders" component={OrderListPage} />
        <Route path="products" component={ProductListPage} />
        <Route path="about" component={AboutPage} />
        <Route path="*" component={NotFoundPage} /> */}
    </>
)
export default Router