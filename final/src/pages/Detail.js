import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'src/components/detail/CustomerListResults';
import CustomerListToolbar from 'src/components/detail/CustomerListToolbar';
import customers from 'src/__mocks__/customers';
import { useContext, useState } from "react";
import { AppContext } from "../Context";
const Detail = () => {
  const {todetail} =
    useContext(AppContext);
  return(
  <>
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
          <CustomerListResults customers={todetail} />
        </Box>
      </Container>
    </Box>
  </>
)};

export default Detail;
