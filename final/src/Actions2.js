import { useEffect, useState } from "react";

export const Actions2 = () => {
    //userLength is for showing the Data Loading message.
let [salesorder,setSalesorder]=useState([]);
let [orderlenght,setOrderlenght]=useState(null);
let [orderdetail,setOrderdetail]=useState([]);
let [detaillenght,setdDtaillenght]=useState(null);
let [allcust,setAllcust]=useState([]);
let [custenght,setdCustenght]=useState(null);
let [todetail,setTodetail]=useState([]);
let [detailid,setDetailid]=useState([]);
  const all_salesorder=()=>{
    fetch("http://localhost/php-react/all-order.php")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
           /* data.order=data.order.map((order)=>{
              if (order.descript){return(order)}
              else{return({
                 seq: order.seq,
                 orderid: order.orderid,
                   empid:order.empid,
                custid: order.custid,
                orderdate: order.orderdate,
            descript:"",
              })}
            })*/
            setSalesorder(data.order);
            setOrderlenght(true);
          } else {
            setOrderlenght(0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const all_orderdetail=()=>{
      fetch("http://localhost/php-react/all-detail.php")
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.success) {
              setOrderdetail(data.detail);
              setdDtaillenght(true);
            } else {
              setdDtaillenght(0);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      const all_cust=()=>{
        fetch("http://localhost/php-react/all-customer.php")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              if (data.success) {
                setAllcust(data.allcust);
                setdCustenght(true);
              } else {
                setdCustenght(0);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
  useEffect(() => {
    all_salesorder()
    all_orderdetail()
    all_cust()
    }, []);
const deleteOrder = (theID) => {
      // filter outing the user.
    let salesorderDeleted = salesorder.filter((user) => {
      return user.seq !== theID;
    });
    fetch("http://localhost/php-react/delete-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theID }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSalesorder(salesorderDeleted);
          if (orderlenght.length === 1) {
            setOrderlenght(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateOrder = (neworder) => {
    fetch("http://localhost/php-react/update-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(neworder),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          salesorder = salesorder.map((order) => {
            if (order.seq === neworder.seq) {
              order.isEditing = false;
              order.descript = neworder.descript;
              
              return order;
            }
            return order;
          });
          setSalesorder(salesorder);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editOrder = (seq) => {
    salesorder = salesorder.map((order) => {
      if (order.seq === seq) {
        order.isEditing = true;
        return order;
      }
      order.isEditing = false;
      return order;
    });
    setSalesorder(salesorder);
  };
  const cancelProduct = (seq) => {
    salesorder = salesorder.map((order) => {
      if (order.seq === seq) {
        order.isEditing = false;
        return order;
      }
      return order;
    });
    setSalesorder(salesorder);
  };
  const deletedetail = (theID) => {
    // filter outing the user.
  let orderdetailDeleted = orderdetail.filter((user) => {
    return user.seq !== theID;
  });
  fetch("http://localhost/php-react/delete-detail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: theID }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setOrderdetail(orderdetailDeleted);
        if (detaillenght.length === 1) {
          setdDtaillenght(0);
        }
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const editDetail = (seq) => {
  orderdetail = orderdetail.map((detail) => {
    if (detail.seq === seq) {
      detail.isEditing = true;
      return detail;
    }
    detail.isEditing = false;
    return detail;
  });
  setOrderdetail(orderdetail);
};
const updateDetail = (newdetail) => {
  fetch("http://localhost/php-react/update-detail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newdetail),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        orderdetail = orderdetail.map((detail) => {
          if (detail.seq === newdetail.seq) {
            detail.isEditing = false;
            detail.qty = newdetail.qty;
            detail.discount = newdetail.discount;
            return detail;
          }
          return detail;
        });
        setOrderdetail(orderdetail);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const sadetail=(newData)=>{
  todetail =todetail.map((detail) => {
    if (detail.seq === newData.seq) {
      detail.isEditing = false;
      detail.qty = newData.qty;
      detail.discount = newData.discount;
      return detail;
    }
    return detail;
  })
  setTodetail(todetail)
};
const cancelDetail = (seq) => {
  orderdetail = orderdetail.map((detail) => {
    if (detail.seq === seq) {
      detail.isEditing = false;
      return detail;
    }
    return detail;
  });
  setOrderdetail(orderdetail);
};
const checkdetail=(id,product)=>{
  let chdetail=[]
  orderdetail.map((detail)=>{
    
    if(detail.orderid===id){
      let proname=product.map((pro)=>{
        if(pro.proid===detail.proid){return(pro.proname)}
      })
      detail={...detail,proname:proname}
      chdetail=[...chdetail,detail]
    }
  })
  setTodetail(chdetail)
}
const insertdetail=(newdetail,product)=>{
  console.log(newdetail.orderid)
  fetch("http://localhost/php-react/add-detail.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newdetail),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.id) {
        setOrderdetail([
          {
            seq: data.id,
            ...newdetail,
          },
          ...orderdetail,
        ]);
        let proname=product.map((pro)=>{
          if(pro.proid===newdetail.proid){return(pro.proname)}
        })
        setTodetail([
          {
            seq: data.id,
            pro:proname,
            ...newdetail,
          },
          ...todetail,
        ])
        setdDtaillenght(true);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const insertorder=(neworder)=>{
  fetch("http://localhost/php-react/add-order.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(neworder),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setSalesorder([
            {
              seq: data.id,
              ...neworder,
            },
            ...salesorder,
          ]);
          setOrderlenght(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    todetail,setTodetail,sadetail,checkdetail,setDetailid,detailid,
    salesorder,
    setSalesorder,
    deleteOrder,
    updateOrder,
    editOrder,
    cancelProduct,
    orderdetail,
    allcust,
    deletedetail,
    editDetail,
    updateDetail,
    cancelDetail,
    setOrderdetail,
    insertdetail,
    insertorder,
  };
};