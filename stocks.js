// This File is implementing all the API call for the stock IEX Trading API

const request = require('request');

//Properties
const API_URL = 'https://api.iextrading.com/1.0';
var Table = require("terminal-table");
// Table Formatting byy terminal-table module


/*
 * @function  [getBatch]
 @Param
 types	    •  Required
            • Comma delimited list of endpoints to call.
              The names should match the individual endpoint names. Limited to 10 types.
 symbols    • Optional
            • Comma delimited list of symbols limited to 100.
              This parameter is used only if market option is used .
 range	    • Optional
            • Used to specify a chart range if chart is used in types parameter.
 *	        • Optional
            • Parameters that are sent to individual endpoints can be specified in batch calls and will be applied to each supporting endpoint.
 * @returns {Json} symbols
 */
 const getBatch = (types, symbols, range ) => {
     let data = {
         "url": API_URL + '/stock/market/batch' ,
         "qs":{
             "types": types,
             "symbols":symbols,
             "range"  : range
         }
     };
     request.get(
         data,
          (error,response,body) => {
          if(error){
              console.log("Error Occured");

          }else{

             let res =  JSON.parse(body);
             let t = new Table();
             t.push(["Symbol", "Company Name","Open", "Latest Price", "high", "low",
                    "Latest Volume","AVG Total Volume"]);
             for (let symbol in res) {
                 let quote = res[symbol].quote;
                 let news  = res[symbol].news;
                 let chart = res[symbol].chart;
                 t.insertRow(1, [quote.symbol, quote.companyName,quote.open,
                     quote.latestPrice,quote.high, quote.low, quote.latestVolume, quote.avgTotalVolume ]);
             }



             console.log("" + t);
          }
     });
 };

 /*
  * @function  [getlist]
  @Param
  Parameter	Details
  displayPercent	• Optional
                    • If set to true, all percentage values will be multiplied by a factor of 100
                    (Ex: /stock/aapl/quote?displayPercent=true)
* @returns {Json} symbols
  */
 const getlist = (listOptions) => {
     let data = {
          "url": API_URL + '/stock/market/list/'+listOptions
     }
     console.log(data.url);
     request.get(
         data,
          (error,response,body) => {
          if(error){
              console.log("Error Occured");

          }else{
             let res =  JSON.parse(body);
             let t = new Table();
             t.push(["Symbol", "Company Name","Open", "Latest Price", "high", "low",
                    "Latest Volume","AVG Total Volume"]);
             for (let symbol of res) {
                 t.insertRow(1, [symbol.symbol, symbol.companyName,symbol.open,
                     symbol.latestPrice,symbol.high, symbol.low, symbol.latestVolume, symbol.avgTotalVolume ]);
             }
             console.log("" + t);
          }
     });


 }



 // Export all methods
 module.exports = {  getBatch, getlist };
