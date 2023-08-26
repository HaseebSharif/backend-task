import multer from "multer";
import connection from '../connection.js';
import fs from 'fs';
import csv from 'csv-parser';


const upload = multer({ dest: 'uploads/' });

export const uploadFile = (req, res) => {

    const saveCSVDataToDatabase = (file) => {
        return new Promise(async (resolve, reject) => {
            const results = [];

            fs.createReadStream(file.path)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    try {
                        const dbConnection = connection.promise();

                        for (const row of results) {
                            // console.log('results', results);
                            await dbConnection.query('INSERT INTO stock SET ?', row);
                        }

                        fs.unlinkSync(file.path);
                     

                        resolve();
                    } catch (error) {
                        console.error(error);
                        reject(error);
                    }
                });
        });
    };

    const file = req.file;

    saveCSVDataToDatabase(file)
        .then(() => {
            res.send('CSV data saved successfully');
        })
        .catch((error) => {
            res.status(500).send('Error saving CSV data: ' + error.message);
        });
};



