#Docker variables
$version = "1.0-local"
$env:ngversion = "6.0.8"
$env:npmversion = "6.14.8"
$env:nginxversion = "1.15.1"

#Build variables
$image = "investips-portal"
$acr = "investips.azurecr.io"
$v = "${version}"

# sonar
$env:sonarscannerversion = "2.7.0"
$env:sonarkey = "investips_investips-portal"
$localsonartoken = "27cd4302ec52739df3edb5ebaa620bd995476e7b"
$localsonarhost = "https://sonarcloud.io"
