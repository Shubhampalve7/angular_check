import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserdataService } from './userdata.service';
  import express from 'express';

import axios from 'axios';
// import{UserdataService} from ' ';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',

  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hello ho';
  // users:any
  // constructor(private userdata:UserdataService){
  //   userdata.users().subscribe((data)=>{
  //     // console.warn("data",data)
  //     this.users=data
  //   })
  //   // console.log(this.users)

  // }


 app = express();
 port = 3000;
 error: string = "Error fetching data:";


constructor(apiData:any){
 // Variable to store API response data

async function fetchStockPriceList() {
  try {
    const response = await axios.get('https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-11?adjusted=true&apiKey=7EU3spVPbR9mdePwPsoFTklb0EQ3SKW5');
    
    apiData = response.data; // Update the API data
    console.log(apiData);
  } catch (error) {
    console.error('Error fetching data:');
    // Handle the error if needed (e.g., send an alert, retry, etc.)
  }
}

// Call the fetchStockPriceList function initially
fetchStockPriceList();

// Set an interval to refresh the data every 5 seconds
const interval = setInterval(fetchStockPriceList, 5000);

// Define a route to serve the updated data
  this.app.get('/getData', (req, res) => {
  res.json(apiData); // Return the stored API data
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  clearInterval(interval); // Stop the interval on process termination
  process.exit(0);
});

// Start the server
const server = this.app.listen(this.port, () => {
  console.log(`Server is running on http://localhost:3000`);
});

  
}
}
