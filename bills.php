<?php

	require "passwords.php";
	
	$a = $_GET["q"];

	$xml = "http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/" . $a . "/bills/introduced.xml?api-key=" . $apiKey;

	$xmlDoc = new DOMDocument();
	$xmlDoc->load($xml);

	echo $xmlDoc->saveXML();

?>