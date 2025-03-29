Get-ChildItem -Path diffs -Filter *.diff | ForEach-Object {
  Write-Host "Applying: $($_.Name)"
  git apply $_.FullName
  if ($?) {
      Remove-Item $_.FullName -Force
      Write-Host "Deleted: $($_.Name)"
  } else {
      Write-Host "Failed to apply: $($_.Name)" -ForegroundColor Red
  }
}
