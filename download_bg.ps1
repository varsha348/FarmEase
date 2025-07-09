$webClient = New-Object System.Net.WebClient
Write-Host "Downloading welcome-bg.jpg..."
$webClient.DownloadFile("https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg", "images/welcome-bg.jpg")
