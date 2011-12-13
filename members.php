<?php

	require "passwords.php";
	require "db_connect.php";
	
	$house = "SELECT * 
	FROM  `house`
	ORDER BY  `state` ASC";
	$result = mysql_query($house);

	$xmlDoc = new DOMDocument();
	
	$xml_output = "<?xml version=\"1.0\"?>\n";
	$xml_output .= "<members>\n";

	while ($row = mysql_fetch_assoc($result)) {
		$xml_output .= "\t<member branch='house'>\n";
		
		$xml_output .= "\t\t<id>" . $row["memberID"] . "</id>\n";
		$xml_output .= "\t\t<state>" . $row["state"] . "</state>\n";
		$xml_output .= "\t\t<firstname>" . $row["firstName"] . "</firstname>\n";
		$xml_output .= "\t\t<lastname>" . $row["lastName"] . "</lastname>\n";
		$xml_output .= "\t\t<party>" . $row["party"] . "</party>\n";


		$xml_output .= "\t</member>\n"; 
	} 
	
	
	$senate = "SELECT * 
	FROM  `senate`
	ORDER BY  `state` ASC";
	$resultS = mysql_query($senate);


	while ($row = mysql_fetch_assoc($resultS)) {
		$xml_output .= "\t<member branch='senate'>\n";
		
		$xml_output .= "\t\t<id>" . $row["memberID"] . "</id>\n";
		$xml_output .= "\t\t<state>" . $row["state"] . "</state>\n";
		$xml_output .= "\t\t<firstname>" . $row["firstName"] . "</firstname>\n";
		$xml_output .= "\t\t<lastname>" . $row["lastName"] . "</lastname>\n";
		$xml_output .= "\t\t<party>" . $row["party"] . "</party>\n";

		$xml_output .= "\t</member>\n"; 
	} 

	$xml_output .= "</members>";
	

	$xmlDoc->loadXML($xml_output);
	echo $xmlDoc->saveXML();


?>