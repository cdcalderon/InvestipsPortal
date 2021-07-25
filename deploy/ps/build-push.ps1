#Parameters to be passed from CI
[cmdletBinding()]
param(
  [Parameter(Mandatory = $false)]
  [string]$branch,
  [Parameter(Mandatory = $false)]
  [string]$dockerpath = "Dockerfile.*",
  [Parameter(Mandatory = $true)]
  [string]$dockercontext,
  [Parameter(Mandatory = $false)]
  [string]$linuxdocker,
  [Parameter(Mandatory = $false)]
  [string]$buildconfiguration = "Debug",
  [Parameter(Mandatory = $false)]
  [string]$windowsdocker,
  [Parameter(Mandatory = $false)]
  [ValidateSet("true", "false")]
  [string]$local = "true",
  [Parameter(Mandatory = $false)]
  [string]$OctopusEndpoint,
  [Parameter(Mandatory = $false)]
  [string]$OctopusApiKey,
  [Parameter(Mandatory = $false)]
  [string]$nugetfeed = "http://oa-utility.investips.local:81/nuget/develop/",
  [Parameter(Mandatory = $false)]
  [string]$OctopusVersion,
  [Parameter(Mandatory = $false)]
  [string]$BuildCommitHash,
  [Parameter(Mandatory = $false)]
  [string]$username,
  [Parameter(Mandatory = $false)]
  [string]$password
)

#Load environment variables from PS folder
. $PSScriptRoot\version.ps1
. $PSScriptRoot\build-common.ps1
$env:branch = $branch

if ($OctopusVersion) {
  $version = $OctopusVersion
  $v = $OctopusVersion
  write-output "Using version of $version"
}
else {
  write-output "Using Default version of $version"
}

if ($local -eq "true") {
  $linuxdocker = $null
  $windowsdocker = $null
  $env:SonarToken = $localsonartoken
  $env:SonarHost = $localsonarhost
  $env:branch = Invoke-Exe -cmd git -args "rev-parse --abbrev-ref HEAD"
}
else {
  write-output "`tDocker Hosts:", "`tLinux: $linuxdocker", "`tWindows: $windowsdocker"

  write-output "====`n Docker Login`n ===="
  docker login $acr -u $username -p $password
}

# get pr info from bitbucket cloud (function lives in build-common.ps1)
# values used in docker-compose.build.yml to pass in to dockerfile for pull request vs branch analysis modes
$pullRequest = Get-PullRequest -branch $env:branch -repositorySlug "investips-portal"

# create analysis type arguments, depending on whether we already have an open pull request or not
$env:analysisArgs = ""
if ($pullRequest -and $pullRequest.Id -gt 0) {
  $env:analysisArgs = if ($BuildCommitHash) { "-Dsonar.pullrequest.bitbucketcloud.triggerCommit=$BuildCommitHash " }
  $env:analysisArgs += "-Dsonar.pullrequest.key=$($pullRequest.Id) -Dsonar.pullrequest.base=$($pullRequest.Target) -Dsonar.pullrequest.branch=$branch"
}
else {
  $target = if ($env:branch -eq "develop") { "master" } else { "develop" }
  $targetArg = if ($env:branch -ne "master" ) { "-Dsonar.branch.target=$target" }
  $env:analysisArgs = "-Dsonar.branch.name=$env:branch $targetArg"
}

write-verbose $version
write-verbose "branch: $env:branch"
write-verbose "dockerpath: $dockerpath"
write-verbose "dockercontext: $dockercontext"
write-verbose "buildconfiguration: $buildconfiguration"
write-verbose "local: $local"
write-verbose "OctopusEndpoint: $OctopusEndpoint"
write-verbose "nugetfeed: $nugetfeed"
write-verbose "OctopusVersion: $OctopusVersion"
write-verbose "ngversion=$env:ngversion"
write-verbose "npmversion=$env:npmversion"
write-verbose "nginxversion=$env:nginxversion"
write-verbose "image:$image"
write-verbose "containerregistry=$acr"
write-verbose "env:sonarhost=$($env:sonarhost)"
Write-Verbose "env:analysisArgs: $($env:analysisArgs)"

$dockerfile = get-childitem -Path "$dockercontext/deploy" -Filter $dockerpath -Recurse

#Default docker host
$env:docker_host = $null

$dockerfile = $dockerfile.name
$HostOS = $dockerfile.split(".").split()[-1]
write-output "HostOS is $HostOS"

$suffix = "-$HostOS"
$latest = "latest${suffix}"
$v2 = "${v}${suffix}"
$env:imageversion = $v2

#Docker build and tag
write-output "Build Docker Host: $env:docker_host"
write-output "Dockerfile used: $dockerfile"
$sonarArgs = "--build-arg `"branch=$branch`" --build-arg `"imageversion=$v2`" --build-arg `"sonarhost=$($env:SonarHost)`" --build-arg `"sonartoken=$($env:SonarToken)`" --build-arg `"sonarkey=$($env:sonarkey)`" --build-arg `"sonarscannerversion=$($env:sonarscannerversion)`" --build-arg `"analysisArgs=$($env:analysisArgs)`""
$dockerbuildargs = "build --rm --pull $sonarArgs --build-arg `"nginxversion=$env:nginxversion`" --build-arg `"npmversion=$env:npmversion`" --build-arg `"ngversion=$env:ngversion`" -t ${acr}/${image}:${v2} -f deploy/docker/$dockerfile $dockercontext "
Invoke-Exe -cmd docker -args $dockerbuildargs

#Docker push images to repo
if ($local -eq "true") {
  write-output "This is a local build and will not need to push."
}
else {
  write-output "pushing ${acr}/${image}:${v2}"
  $dockerpushargs = "push ${acr}/${image}:${v2}"
  Invoke-Exe -cmd docker -args $dockerpushargs

  write-output "cleaning up ${acr}/${image}:${v2}"
  $dockerrmiargs = "rmi ${acr}/${image}:${v2}"
  Invoke-Exe -cmd docker -args $dockerrmiargs
}

#List images for the current tag
write-output "Docker Just successfully built - ${acr}/${image}:${v2}"
write-output "`tPlease run with any additional flags to test locally:`n`n docker run -d ${acr}/${image}:${v2}"
write-output "`t --------------- `t Docker run reference if needed:`n https://docs.docker.com/engine/reference/run/`n"

#Only run on teamcity , not locally
if ($local -eq "false") {
  #Create zip for octopus
  Compress-Archive -Force -Path $PSScriptRoot\version.ps1 -CompressionLevel Fastest -DestinationPath $PSScriptRoot\$image.$v.zip
  Compress-Archive -Path $PSScriptRoot\..\kubernetes\* -Update -DestinationPath $PSScriptRoot\$image.$v.zip
  Rename-Item $PSScriptRoot\..\..\src\config.example.json config.json
  Compress-Archive -Path $PSScriptRoot\..\..\src\config.json -Update -DestinationPath $PSScriptRoot\$image.$v.zip
  Write-Host "##teamcity[setParameter name='env.PackageName' value='$image']"
  Write-Output "=== Created zip package $image.$v.zip in $PSScriptRoot ==="
}
#End Script
write-output "End of Build"
