<?php
	//defining the variables and constants for mySQL

	require "passwords.php";
		
	DEFINE ('DB_USER', '$dbUser');
	DEFINE ('DB_PASSWORD', '$dbPassword');
	DEFINE ('DB_HOST', 'localhost');
	DEFINE('DB_CHARSET', 'utf8');
	DEFINE ('DB_NAME', '$dbName');
	
/*
	//---Database Settings for LOCAL---
	DEFINE ('DB_USER', 'root');
	DEFINE ('DB_PASSWORD', 'root');
	DEFINE ('DB_HOST', 'localhost');
	DEFINE('DB_CHARSET', 'utf8');
	DEFINE ('DB_NAME', 'congress');
*/	
	//connecting to mySQL database
	$dbConnect = mysql_connect (DB_HOST, DB_USER, DB_PASSWORD) OR die ('Could not connect to MySQL: ' . mysql_error() );
	mysql_select_db (DB_NAME) OR die ('Could not select the database: ' . mysql_error() );
?>