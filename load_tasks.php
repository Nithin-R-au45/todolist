<?php
// File to store task data
$file = 'task_data.json';

// If file doesn't exist, create an empty array
if (!file_exists($file)) {
  file_put_contents($file, '[]');
}

// Output file content (JSON) to JS
echo file_get_contents($file);
?>
