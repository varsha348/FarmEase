$webClient = New-Object System.Net.WebClient
Write-Host "Downloading farmer avatar..."
$webClient.DownloadFile("https://images.pexels.com/photos/5466188/pexels-photo-5466188.jpeg", "images/farmer-avatar.jpg")
