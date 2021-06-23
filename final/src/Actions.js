import { useEffect, useState } from "react";

export const Actions = () => {
  let [users, setUsers] = useState([]);
let[product,setProduct]=useState([]);
    //userLength is for showing the Data Loading message.
  let [userLength, setUserLength] = useState(null);
  let [productLength, setProductLength] = useState(null);
const all_user=()=>{
  fetch("http://localhost/php-react/all-users.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
          setUserLength(true);
        } else {
          setUserLength(0);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const all_product=()=>{
    fetch("http://localhost/php-react/all-product.php")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setProduct(data.product);
            setProductLength(true);
          } else {
            setProductLength(0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

  useEffect(() => {
    all_user()
    all_product()
    }, []);

  // Inserting a new user into the database.
  const insertUser = (newUser) => {
    fetch("http://localhost/php-react/add-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setUsers([
            {
              id: data.id,
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Enabling the edit mode for a listed user.
  const editMode = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = true;
        return user;
      }
      user.isEditing = false;
      return user;
    });
    setUsers(users);
  };

  // Cance the edit mode.
  const cancelEdit = (id) => {
    users = users.map((user) => {
      if (user.id === id) {
        user.isEditing = false;
        return user;
      }
      return user;
    });
    setUsers(users);
  };

  // Updating a user.
  const updateUser = (userData) => {
    fetch("http://localhost/php-react/update-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          users = users.map((user) => {
            if (user.id === userData.id) {
              user.isEditing = false;
              user.user_name = userData.user_name;
              user.user_email = userData.user_email;
              return user;
            }
            return user;
          });
          setUsers(users);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Deleting a user.
  const deleteUser = (theID) => {
      // filter outing the user.
    let userDeleted = users.filter((user) => {
      return user.id !== theID;
    });
    fetch("http://localhost/php-react/delete-user.php", {
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
          setUsers(userDeleted);
          if (users.length === 1) {
            setUserLength(0);
          }
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteProduct = (theID) => {
    // filter outing the user.
  let productDeleted = product.filter((pro) => {
    return pro.proid !== theID;
  });
  fetch("http://localhost/php-react/delete-product.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ proid: theID }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        setProduct(productDeleted);
        if (users.length === 1) {
          setUserLength(0);
        }
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const editProduct = (proid) => {
  product = product.map((pro) => {
    if (pro.proid === proid) {
      pro.isEditing = true;
      return pro;
    }
    pro.isEditing = false;
    return pro;
  });
  setProduct(product);
};
const cancelPro = (proid) => {
  product = product.map((pro) => {
    if (pro.proid === proid) {
      pro.isEditing = false;
      return pro;
    }
    return pro;
  });
  setProduct(product);
};
const updateProduct = (newproduct) => {
  fetch("http://localhost/php-react/update-product.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newproduct),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.success) {
        product = product.map((pro) => {
          if (pro.proid === newproduct.proid) {
            pro.isEditing = false;
            pro.proname = newproduct.proname;
            pro.price = newproduct.price;
            pro.cost=newproduct.cost;
            
            return pro;
          }
          return pro;
        });
        setProduct(product);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const inserProduct = (value) => {
  fetch("http://localhost/php-react/add-product.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
    //mode: 'no-cors',
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      
      if (data.success)  {
        setProduct([
          {...value} ,
          ...product,
        ]);
        setUserLength(true);
      } else {
        alert(data.msg);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
  return {
    users,
    product,
    editMode,
    cancelEdit,
    updateUser,
    insertUser,
    deleteUser,
    userLength,
    deleteProduct,
    editProduct,
    cancelPro,
    updateProduct,
    inserProduct,
  };
};