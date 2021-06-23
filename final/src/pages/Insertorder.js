import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useState,useContext } from 'react';
import { AppContext } from "../Context";
const Insertorder = () => {
  const [selectid, setSelectid] = useState([]);
  const [inselectid, insetSelectid] = useState('');
  const [visual, setVisual] = useState('');
  const navigate = useNavigate();
  const {product,inserProduct,useravatar,salesorder,insertorder,allcust} =
  useContext(AppContext);

  console.log()
  const doinert=(value)=>{

  const inorderid=parseInt(salesorder[salesorder.length-1].orderid)+1
  const a=new Date()
    const pro=
      {empid : useravatar.id,
        orderid:inorderid,
      custid : selectid.custid,
      orderdate:a.toISOString().substring(0, 10),
      descript : value.descript,}
    
      //inserProduct(pro)
      console.log(selectid)
      insertorder(pro)
    
  }
  const back=()=>{
    navigate('/app/order', { replace: true });
  }
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'background.default',
      }}
    >
    <Button sx={{ mx: 1 }}
        color="primary"
        variant="contained"
        onClick={back}
      >
        back
      </Button>
      </Box>
      <Helmet>
        <title>Register | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{

             
              
              descript:"",
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                //custid: Yup.string().required('custid is required'),
               // firstName: Yup.string().required('First name is required'),
               // email: Yup.number().required('Email is required'),
                
              //  lastName: Yup.number().required('Last name is required'),
               
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={(value) => {
              doinert(value)
              navigate('/app/order', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new order
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your custid to create new order
                  </Typography>
                </Box>
                <Autocomplete
          value={selectid}
          inputValue={inselectid}
          onChange={(event, selectid) => {
            setSelectid(selectid);
            try {
              setVisual(selectid.custname)
            } catch (error) {
              setVisual("")
            }
          }}
          onInputChange={(event, inselectid) => {
            insetSelectid(inselectid);
          }}
          fullWidth
  id="combo-box-demo"
  options={allcust}
  getOptionLabel={(option) => option.custid}
  //style={{ width: 300 }}
  renderInput={(params) => <TextField {...params} label="顧客代號" variant="outlined" />}
/>
<Box sx={{ mt: 3 }}>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    顧客名稱:{visual}
                  </Typography>
                  </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="備註"
                  margin="normal"
                  name="descript"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.descript}
                  variant="outlined"
                />
                
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    新增訂單
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Insertorder;
