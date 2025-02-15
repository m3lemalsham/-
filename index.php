<?php
// Header information
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>معلم الشام</title>
    
    <!-- Google AdSense Code -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3047116489558029" crossorigin="anonymous"></script>
    
    <!-- Other meta tags and stylesheets -->
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body>
    <?php
    // AdSense ad placement
    echo '<div class="ad-container">';
    echo '<ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-3047116489558029"
         data-ad-slot="YOUR_AD_SLOT_ID"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>';
    echo '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
    echo '</div>';
    ?>

    <!-- Your existing content here -->
    <div class="main-content">
        <!-- Content will go here -->
    </div>

    <?php
    // Footer section
    echo '<footer>';
    echo '<p>جميع الحقوق محفوظة &copy; ' . date('Y') . ' معلم الشام</p>';
    echo '</footer>';
    ?>
</body>
</html>