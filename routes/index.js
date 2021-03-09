var express = require('express');
var router = express.Router();
//Initiallising connection string
var dbConfig  ={
  server: '',
  database: '',
  user:'',
  password:'',
  driver: "",
  options: {
                trustedConnection:true,
                useUTC: true}
};

var  executeQuery = function(res, query){
  console.log("Inside Execute Query function");
  var conn=new sql.ConnectionPool(dbConfig);
  console.log("Connection Made");
  var req=new sql.Request(conn);
  console.log("Request object created");
  conn.connect(function(err){
      if (err){
          console.log(err);
          return;
      }
      console.log("Executing the query");
      req.query(query,function(err,recordSet){
              if (err){
                  console.log(err);
              }
              else{
                  //res.setHeader('Content-Type', 'application/json');
                  console.log(recordSet['recordsets'][0][0]);
                  //console.log(JSON.stringify(recordSet['recordsets'][0][0]).length);
                  //res.send(JSON.stringify({'recordSet':recordSet}));
                  //res.status(200).render('home',{'studentlist' : recordSet['recordsets'][0]});
                  //res.send([{ name: 'lilly' }, { name: 'lucy' }])
                  res.send(recordSet['recordsets'][0])
              }
              console.log("The connection is closed");
              conn.close();
      });
  });
}

var  executeQuery_post = function(res, query){
  console.log("Inside Execute Query POST function");
  var conn=new sql.ConnectionPool(dbConfig);
  console.log("Connection Made");
  var req=new sql.Request(conn);
  console.log("Request object created");
  conn.connect(function(err){
      if (err){
          console.log(err);
          return;
      }
      console.log("Executing the query");
      req.query(query,function(err,recordSet){
              if (err){
                  console.log(err);
              }
              else{
                  console.log("Inside else")
                  //res.setHeader('Content-Type', 'application/json');
                  //console.log(recordSet['recordsets'][0][0]);
                  //console.log(JSON.stringify(recordSet['recordsets'][0][0]).length);
                  //res.send(JSON.stringify({'recordSet':recordSet}));
                  //res.status(200).render('home',{'studentlist' : recordSet['recordsets'][0]});
                  //res.send([{ name: 'lilly' }, { name: 'lucy' }])
                  res.send("Data successfully uploaded")
              }
              console.log("The connection is closed");
              conn.close();
      });
  });
}


var fs = require('fs');
var sql = require("mssql/msnodesqlv8");
/* GET home page. */
router.get('/', function(req, res, next) {
  var query='select top 10  FRST_DSPCH_ID,RPT_DSPCH_ID,Root_Cause_Tier_1,Root_Cause_Tier_2,New_Root_Cause_Tier_1,New_Root_Cause_Tier_2 from SDS_COST_MODEL_DB.dbo.SC_RDR_RCA_Excel_temp1'
  console.log(query)
  executeQuery (res, query);
  //res.render('index', { title: 'Express' });
});

router.post('/',function(req,res,next)
{
  console.log("Calling the post api");
  console.log("The request object is ",req.body)
  console.log(req.body.FRST_DSPCH_ID);
  console.log(req.body.New_Root_Cause_Tier_1);
  console.log(req.body.New_Root_Cause_Tier_2);
  //var query = "UPDATE [SDS_COST_MODEL_DB].[dbo].[SC_RDR_RCA_Excel_temp1] SET New_Root_Cause_Tier_1= " + req.body.New_Root_Tier_1  +  " , New_Root_Cause_Tier_2=  " + req.body.New_Root_Tier_2 + "  WHERE ASST_ID= " + req.body.id;
  //var query = "UPDATE [SDS_COST_MODEL_DB].[dbo].[SC_RDR_RCA_Excel_temp1] SET New_Root_Cause_Tier_1 = '" + req.body.New_Root_Tier_1  +  '" , New_Root_Tier_2 =  " '+ req.body.New_Root_Tier_2 + '"  WHERE ASST_ID = " '+ req.body.id +"'";
  var query="UPDATE [SDS_COST_MODEL_DB].[dbo].[SC_RDR_RCA_Excel_temp1] SET New_Root_Cause_Tier_1= '" + req.body.New_Root_Cause_Tier_1  +  "' , New_Root_Cause_Tier_2=  '" + req.body.New_Root_Cause_Tier_2 + "'  WHERE FRST_DSPCH_ID= '" + req.body.FRST_DSPCH_ID +"'";
  console.log(query);
  executeQuery_post (res, query);
})
module.exports = router;
