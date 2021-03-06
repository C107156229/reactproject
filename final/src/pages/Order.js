import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/order/CustomerListResults';
import CustomerListToolbar from 'src/components/order/CustomerListToolbar';
import customers from 'src/__mocks__/customers';
import { useContext, useState } from "react";
import { AppContext } from "../Context";
const Order = () => {
  //const a=new Date()
  //const b="今天日期是 " + a.getFullYear()+ " 年 " + (a.getMonth()+1) + " 月 " + a.getDate() + " 日"
  //console.log(b)
  const {product,salesorder} =
    useContext(AppContext);
  return(
  <div>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={salesorder} />
        </Box>
      </Container>
    </Box>
  </div>
  )};

export default Order;
