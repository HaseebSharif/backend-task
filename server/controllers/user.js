
import { generateToken, authenticateUser }  from '../middlewares/auth.js'
import connection from '../connection.js'





export const logIn = async (req, res) => {
    try {
        const {username , password} = req.body;
        const user = {username: 'task' , password:'task7864' };
        if(user.username === username && user.password === password  ){
            let expiresIn = '1h'; 
            if (req.body.rememberMe) {
              expiresIn = '365d'; 
            }
            const token = generateToken(user, expiresIn);
            req.session.token = token;
            res.json({ token });
        }
        else{
            res.send("Invalid Credentials")
        }
      
      } 
     catch (err) {
      res.send(err);
    }
  };

  export const register = async (req, res) => {
    try {
        const {name , email ,password} = req.body;
      connection.query('INSERT INTO register (name, email, password) VALUES (?, ? , ?)', [name, email , password], (err, results) => {
          if (err) {
              console.error('Error inserting data into MySQL:', err);
              res.status(500).json({ error: 'Error inserting data into the database' });
          } else {
              console.log('Data inserted successfully.');
              res.status(201).json({ message: 'Data inserted successfully.' , 
            name: name,
            email: email ,
            password: password
            });
          }
      });
      } 
     catch (err) {
      res.send(err);
    }
  };

  export const update = async (req, res) => {
    try {
      const mail = 'update@gmail.com'
        const {name , email ,password} = req.body;
      connection.query(`UPDATE  register SET name = ?, email = ?, password= ?  WHERE email = ?`, [name, email , password, mail], (err, results) => {
          if (err) {
              console.error('Error inserting data into MySQL:', err);
              res.status(500).json({ error: 'Error updating data into the database' });
          } else {
              console.log('Data updated successfully.');
              res.status(201).json({ message: 'Data updated successfully.' , 
            name: name,
            email: email ,
            password: password
            });
          }
      });
      } 
     catch (err) {
      res.send(err);
    }
  };
  

  export const getAllUsers = async(req,res) =>{
const search = 'haseeb'
    try{
      connection.query(`SELECT * FROM register WHERE name = '${search}' `  ,(err, results)=>{
        if(err){
          console.log('error' , err)
          return res.status(500).json({error: "Error while fetching"})
        }
        else{
          console.log("data fetched", results);
          return res.status(200).json({error: "Data Fetched successfully" ,
        results
      })

        }
      })

    }catch(err){
      res.send(err)
    }

  }


  export const logOut = async(req,res) =>{
    try{
        req.session.destroy();
        res.json({ message: 'Logged out' });

    }catch(err){
        res.send(err)
    }
  }