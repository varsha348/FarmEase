$images = @{
    "hero-farm.jpg" = "https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg"
    "crops.jpg" = "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg"
    "transport.jpg" = "https://images.pexels.com/photos/2889630/pexels-photo-2889630.jpeg"
    "storage.jpg" = "https://images.pexels.com/photos/7706455/pexels-photo-7706455.jpeg"
}

$webClient = New-Object System.Net.WebClient

foreach ($image in $images.GetEnumerator()) {
    Write-Host "Downloading $($image.Key)..."
    $webClient.DownloadFile($image.Value, "images/$($image.Key)")
}
