$images = @{
    "wheat.jpg" = "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg"
    "corn.jpg" = "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg"
}

$webClient = New-Object System.Net.WebClient

foreach ($image in $images.GetEnumerator()) {
    Write-Host "Downloading $($image.Key)..."
    $webClient.DownloadFile($image.Value, "images/$($image.Key)")
}
