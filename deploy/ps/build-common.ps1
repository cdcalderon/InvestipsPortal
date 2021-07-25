[cmdletBinding()]
Param()

Function check-result {
  if ($LastExitCode -ne 0) { Invoke-BuildError "ERROR: Exiting with error code $LastExitCode"	}
  return $true
}

Function Invoke-BuildError {
  Param(
    [parameter(Mandatory = $true)][string] $text
  )
  if ($env:TEAMCITY_VERSION) {
    Write-Error "Build Error: $text"
    Write-Error "##teamcity[buildStatus status='ERROR']"
    [System.Environment]::Exit(1)
  }
  else {
    Write-Error $text
    exit
  }
}

Function Invoke-Exe {
  Param(
    [parameter(Mandatory = $true)][string] $cmd,
    [parameter(Mandatory = $true)][string] $args
  )
  Write-Host "Executing: `"$cmd`" --% $args"
  Invoke-Expression "& `"$cmd`" --% $args"

  $result = check-result
  if (!$result -and $local -ne "true") {
    throw "ERROR executing EXE"
    exit 1
  }
}

Function Copy-BuildArtifacts {
  param(
    [Parameter(Mandatory = $true)][string]$container,
    [Parameter(Mandatory = $true)][string]$artifactsPath
  )
  # extract any artifacts dropped in $artifactsPath from the container
  $location = (Get-Location).Path

  Write-Output "copying $artifactsPath from $container to $location"
  Invoke-Exe -cmd docker -args "cp ${container}:$artifactsPath $location"
}

Function Get-PullRequest {
  param(
    [Parameter(Mandatory = $false)]
    [string]$repositorySlug = "investips.investips-portal.web",
    [string]$branch
  )

  Write-Verbose "BitbucketCloudUsername: $($env:BitbucketCloudUsername)"
  $pair = "$($env:BitbucketCloudUsername):$($env:BitbucketCloudPassword)"
  $encodedCredentials = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($Pair))
  $headers = @{ Authorization = "Basic $encodedCredentials" }

  # endpoint information at
  # https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/pullrequests

  $pullRequests = Invoke-RestMethod -method GET https://bitbucket.org/api/2.0/repositories/investips/$repositorySlug/pullrequests -Headers $headers
  Write-Verbose "$($pullRequests | ConvertTo-Json -depth 5)"

  $openPullRequest = $pullRequests.values | Where-Object { $_.source.branch.name -eq $branch }

  $returnObject = @{
    Id     = 0;
    Target = "";
  }

  if ($openPullRequest) {
    write-host "found pull request with id: $($openPullRequest.Id)"
    write-host "pull request id $($openPullRequest.Id) has target destination $($openPullRequest.destination.branch.name)"
    $returnObject.Id = $openPullRequest.Id
    $returnObject.Target = $openPullRequest.destination.branch.name
  }
  else {
    Write-Host "did not find an open pull request for branch $branch in repo $repositorySlug"
  }

  return $returnObject
}
