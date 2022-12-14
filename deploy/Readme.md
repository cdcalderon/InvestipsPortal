# Docker CI/CD + Local Development

## Scripts for Use

---

### PS Scripts (Used by CI and local development)

-   set-params.ps1

    -   #### Comes in 2 Flavors, one for Web projects and one for DotnetCore Projects
        -   DotNetCore (Set-Params.ps1 )
            -   Accepted Params - (.Net Projects) [Listed are Defaults]
                -   branch = "local"
                -   buildCounter = "0"
                -   msbuildconfig = "Debug"
            -   New-BuildJson
                -   Generates Build Metadata to be used by dotnetcli
                -   leverages version.json to be used by Docker and DLL
            -   Set-DockerTag
                -   Leverages Buildjson, BuildNumber, and Branch
                -   Assigns and sets parameters to be used by teamcity based on branch
                    -   msbuildconfig
                    -   dockertagprefix
                    -   buildsuffix
                    -   nugetfeed
                    -   nugetapitoken
                    -   OctopusChannel
                -   copies build.json into solution to be leverage in docker container for build
        -   Angular App (Set-Params.ps1 )
            -   Accepted Params - (Web Projects) [Listed are Defaults]
                -   projname = "investips.partnerportal.web" (Default to your working Project)
                -   buildcounter = "0"
                -   branch = "local"
            -   Assigns and sets parameters to be used by teamcity based on branch
                -   OctopusChannel
                -   dockertagprefix
                -   buildsuffix

-   build-push.ps1
    -   #### (Will have specified changes based on App type for passing in Build Parameters from Version.ps1)
    -   Accepted Params
        -   branch (used to parse out Jira ID for Tagging)
        -   dockerpath = "Dockerfile.\*" (Defaulted to Parse for All Dockerfiles to loop over to build)
        -   dockercontext (Used to Set context to pass into docker at build time)
        -   linuxdocker (Used to pass in a Linux Host desired for building on)
        -   buildconfiguration = "Debug" (Defaulted for MS Build Type but updated via Set-Params.ps1)
        -   windowsdocker (Used to pass in a windows host desired for building on)
        -   local = "true" (defaulted to true to work for local runs)
        -   OctopusEndpoint (Used to target octopus server for uploading deploy artifact to)
        -   OctopusApiKey (Api Key used to Upload to)
        -   nugetfeed = "http://oa-utility.investips.local:81/nuget/develop/" (Nuget feed for uploading and restoring from)
        -   OctopusVersion (Sets version with a more octopus deploy friendly version number)
    -   If local defaults to local version, and nulifies the destination docker hosts in favor of local daemon
    -   Script checks contents of `Docker`directorylooking for likes structured with `Docker.OperatingSystem` i.e. `Docker.Alpine`andthen the script determines which OS to build the container on. If there are multiple dockerfiles the script will foreach over them and run through all of them.
    -   script runs a build and passes arguments for arguments defined in docker file, for things such as `nginxversion`,`npmversion`,`ngversion`,`dotnetframework`, and `dotnet sdk`
    -   upon successful build the script will push the image to a container registry and remove the layers used to create it to save room on the local machine (Unless running a local build).
    -   additionally the deploy artifacts will be generated as a product of this script.
        -   a zip containing:
            -   Loadbalancer .toml file
            -   version.ps1 for default version values
            -   deploy.ps1 for deployment instructions for Octopus Deploy
            -   docker-compose for docker run instructions
-   version.ps1 [**Please keep track of this file and feel free to update when needed!! Also allows for easy testing of new NG/NPM DotNetSDK/DotNetFramework**]
    -   #### Comes in 2 Flavors, one for Web projects and one for DotnetCore Projects
    -   #### (Angular) Version.ps1
        -   version (Used to default generate local version for container)
        -   ngversion (Managed by **DEVELOPERS**) Passes in Desired NG version for container to build with
        -   npmversion (Managed by **DEVELOPERS**) Passes in Desired NPM version for container to build, test and restore with
        -   nginxversion (Managed by **ALL**)
    -   #### (DotNet) Version.ps1
        -   version (Used to default generate local version for container)
        -   dotnetsdk (Managed by **DEVELOPERS**) Passes in Desired Dotnet version for container to build with
        -   dotnetframework (Managed by **DEVELOPERS**) Passes in Desired Dotnet Framework version for container to deploy with
    -   Values shared by both
        -   imagename (Defaults the docker image name)
        -   acr (Azure container registry address)
        -   linuxdocker (Defaults to target linux build box)
        -   windowsdocker (Defaults to target windows build box)
        -   $v is leveraged by other scripts as a default value for some string concatenation

### Docker (Used for Build Environment and Deploy artifact)

-   Dockerfile.${YourHostOS} - ### DotNetCore Container - Arguments - dotnetsdk - Used to pass in variables to source docker images for dotnetcoresdk - dotnetframework - Used to pass in variables to source docker images for dotnetframework - buildconfiguration - used to define build config based on branch - nugetfeed - used to define nuget feed used for restore based on branch - Copy in SRC directory from working dir - run nuget restore - run dotnet build with appropriate args and runtime based on running OS - run unit tests based on data in the Build Container layer - run integration tests based on data in the Build Container Layer - Run a dotnet publish - Copy contents from Publish to the new Deploy artifact layer and configure for self hosting - in Self hosting layer we call the startup.sh to transform configs, and run the dotnet app - ### Angular Container - Arguments - npmversion - Used to pass in variables setting desired npm version - ngversion - Used to pass in variables setting desired angular cli version - nginxversion - used to define desired nginxversion
    ch - Copy in APP directory from working dir and set as container working DIR - run npm install to desired npm version - run npm install for desired ng cli - run npm ci - Copy Build layer to run Lint against - Copy Build Layer to unit test against - Copy Build layer to ng build - Copy built code to nginx and Set Startup.sh for config.json transform - Set `ConfigPath` for Startup.sh to know where config file is

### SH script (Used by container to transform config files)

-   startup.sh
    -   Script defaults to a `ConfigPath` value set in dockerfile
    -   nginx or dotnetcore are kicked off to start the application and are set to output to stdout for dockerlogs
