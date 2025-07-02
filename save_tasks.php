<?php
// Get raw JSON from frontend (main.js)
$data = json_decode(file_get_contents("php://input"), true);

// Save it into the file with pretty formatting
file_put_contents("task_data.json", json_encode($data, JSON_PRETTY_PRINT));
?>
