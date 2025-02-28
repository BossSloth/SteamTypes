# PowerShell script to check any interface against its implementation
# Usage: .\check-interface.ps1 -InterfaceFile "path/to/file.ts" -InterfaceName "InterfaceName" -InterfaceDefinition "interface definition"

param (
    [Parameter(Mandatory=$true)]
    [string]$InterfaceFile,
    
    [Parameter(Mandatory=$true)]
    [string]$InterfaceName,
    
    [Parameter(Mandatory=$true)]
    [string]$InterfaceDefinition
)

# Create a temporary file for the interface definition
$tempFile = [System.IO.Path]::GetTempFileName() + ".ts"
$InterfaceDefinition | Out-File -FilePath $tempFile -Encoding utf8

Write-Host "Saved interface definition to temporary file: $tempFile"
Write-Host "Running interface comparison..."

# Change to the scripts directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Run the comparison script
bun interface-checker.ts $InterfaceFile $InterfaceName $tempFile

# Clean up the temporary file
Remove-Item $tempFile -Force
