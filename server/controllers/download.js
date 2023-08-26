import connection from '../connection.js';
import xlsx from 'xlsx';


export const exportData = async(req,res) =>{
    
    try {
      const [rows] = await connection.promise().query('SELECT * FROM stock');
  
      const data = [
        ['sku', 'stock_id'], // Headers
        ...rows.map((row) => [row.variant, row.stock]), // Data
      ];
  
      const workbook = xlsx.utils.book_new();
      const worksheet = xlsx.utils.aoa_to_sheet(data);
  
      xlsx.utils.book_append_sheet(workbook, worksheet, 'stock Data');
  
      const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
      res.setHeader('Content-Disposition', 'attachment; filename=stock_data.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  
      res.end(buffer);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error exporting data to XLSX');
    }
  }